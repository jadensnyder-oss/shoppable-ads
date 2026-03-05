import * as cheerio from "cheerio";
import { type AnyNode, Element as DomElement } from "domhandler";

const HEADER_SELECTORS = [
  "header",
  "nav",
  "[role='banner']",
  "[role='navigation']",
  "#header",
  ".header",
  ".navbar",
  ".nav-bar",
  ".nav-wrapper",
  ".navigation",
  ".site-header",
  ".top-bar",
  ".top-nav",
  ".top-section",
  ".main-header",
  ".page-header",
  ".global-header",
  ".masthead",
  ".site-nav",
  ".main-nav",
  ".primary-nav",
  ".header-wrapper",
  ".header-container",
  ".header-content",
  "[data-testid*='header']",
  "[data-testid*='nav']",
  "[class*='Header']",
  "[class*='NavBar']",
  "[class*='Navbar']",
  "[id*='header']",
  "[id*='Header']",
  "[id*='nav']",
  "[id*='Nav']",
];

const FOOTER_SELECTORS = [
  "footer",
  "[role='contentinfo']",
  "#footer",
  ".footer",
  ".site-footer",
  ".main-footer",
  ".page-footer",
  ".global-footer",
];

const ROKT_ATTR_PATTERNS = ["rokt", "Rokt", "ROKT"];

const ROKT_SELECTORS = [
  ...ROKT_ATTR_PATTERNS.flatMap((p) => [
    `[id*='${p}']`,
    `[class*='${p}']`,
    `[name*='${p}']`,
    `iframe[src*='${p}']`,
    `script[src*='${p}']`,
  ]),
  "[data-core-type]",
  "[data-rokt]",
  "[data-rokt-widget]",
  "[data-rokt-placement]",
];

export function cleanHtml(html: string): string {
  const $ = cheerio.load(html);

  for (const sel of HEADER_SELECTORS) {
    $(sel).remove();
  }

  for (const sel of FOOTER_SELECTORS) {
    $(sel).remove();
  }

  for (const sel of ROKT_SELECTORS) {
    $(sel).remove();
  }

  $("*").each((_i, el) => {
    if (el instanceof DomElement) {
      const tag = el.tagName.toLowerCase();
      if (tag.startsWith("rokt-")) {
        $(el).remove();
        return;
      }
      const allAttrs = el.attribs || {};
      const attrString = Object.keys(allAttrs).join(" ") + " " + Object.values(allAttrs).join(" ");
      if (/rokt/i.test(attrString)) {
        $(el).remove();
      }
    }
  });

  // Remove tracking pixels: 1x1 images and hidden iframes
  $("img").each((_i, el) => {
    const $el = $(el);
    const w = $el.attr("width");
    const h = $el.attr("height");
    const style = $el.attr("style") || "";
    if (
      (w === "1" && h === "1") ||
      style.includes("display:none") ||
      style.includes("display: none")
    ) {
      $el.remove();
    }
  });

  $("iframe").each((_i, el) => {
    const $el = $(el);
    const style = $el.attr("style") || "";
    const w = $el.attr("width");
    const h = $el.attr("height");
    if (
      style.includes("display:none") ||
      style.includes("display: none") ||
      style.includes("visibility:hidden") ||
      style.includes("visibility: hidden") ||
      (w === "0" && h === "0")
    ) {
      $el.remove();
    }
  });

  return $.html();
}

export interface DetectedSection {
  selector: string;
  tag: string;
  preview: string;
  category: "header" | "footer" | "rokt" | "ad" | "other";
}

function buildUniqueSelector($: cheerio.CheerioAPI, el: AnyNode): string {
  const $el = $(el);
  const id = $el.attr("id");
  if (id) return `#${id}`;

  const tag = el instanceof DomElement ? el.tagName.toLowerCase() : "div";
  const cls = ($el.attr("class") || "").trim().split(/\s+/).filter(Boolean).slice(0, 2).join(".");
  if (cls) return `${tag}.${cls}`;

  return tag;
}

function getPreview($: cheerio.CheerioAPI, el: AnyNode): string {
  const text = $(el).text().replace(/\s+/g, " ").trim();
  return text.length > 80 ? text.slice(0, 77) + "..." : text || "(empty)";
}

export function analyzeHtml(html: string): DetectedSection[] {
  const $ = cheerio.load(html);
  const sections: DetectedSection[] = [];
  const seen = new Set<string>();

  function addIfPresent(selector: string, category: DetectedSection["category"]) {
    $(selector).each((_i, el) => {
      const unique = buildUniqueSelector($, el);
      if (seen.has(unique)) return;
      seen.add(unique);
      const tag = el instanceof DomElement ? el.tagName.toLowerCase() : "div";
      sections.push({
        selector: unique,
        tag,
        preview: getPreview($, el),
        category,
      });
    });
  }

  for (const sel of HEADER_SELECTORS) addIfPresent(sel, "header");
  for (const sel of FOOTER_SELECTORS) addIfPresent(sel, "footer");
  for (const sel of ROKT_SELECTORS) addIfPresent(sel, "rokt");

  $("*").each((_i, el) => {
    if (el instanceof DomElement) {
      const tag = el.tagName.toLowerCase();
      const allAttrs = el.attribs || {};
      const attrString = Object.keys(allAttrs).join(" ") + " " + Object.values(allAttrs).join(" ");
      const isRokt = tag.startsWith("rokt-") || /rokt/i.test(attrString);
      if (isRokt) {
        const unique = buildUniqueSelector($, el);
        if (!seen.has(unique)) {
          seen.add(unique);
          sections.push({
            selector: unique,
            tag,
            preview: getPreview($, el),
            category: "rokt",
          });
        }
      }
    }
  });

  return sections;
}

export function removeSelectors(html: string, selectors: string[]): string {
  const $ = cheerio.load(html);
  for (const sel of selectors) {
    try {
      $(sel).remove();
    } catch (err) {
      console.warn(`Skipping invalid selector "${sel}":`, (err as Error).message);
    }
  }
  return $.html();
}

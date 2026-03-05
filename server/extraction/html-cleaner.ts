import * as cheerio from "cheerio";

const HEADER_SELECTORS = [
  "header",
  "nav",
  "[role='banner']",
  "[role='navigation']",
  "#header",
  ".header",
  ".navbar",
  ".nav-bar",
  ".site-header",
  ".top-bar",
  ".top-nav",
  ".main-header",
  ".page-header",
  ".global-header",
  ".masthead",
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

const ROKT_SELECTORS = [
  "[id*='rokt']",
  "[class*='rokt']",
  "[name*='rokt']",
  "[data-core-type]",
  "rokt-standard-marketing-lstxcqvvds",
];

export function cleanHtml(html: string): string {
  const $ = cheerio.load(html, { decodeEntities: false });

  for (const sel of HEADER_SELECTORS) {
    $(sel).remove();
  }

  for (const sel of FOOTER_SELECTORS) {
    $(sel).remove();
  }

  for (const sel of ROKT_SELECTORS) {
    $(sel).remove();
  }

  // Remove any custom element whose tag starts with "rokt-"
  $("*").each((_i, el) => {
    if (el.type === "tag" && el.tagName && el.tagName.startsWith("rokt-")) {
      $(el).remove();
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

import { useState, useEffect } from "react";
import type { PartnerConfig } from "@shared/schema";
import { isColorDark } from "@/lib/utils";

interface HeaderProps {
  config: PartnerConfig;
}

export function PlacementHeader({ config }: HeaderProps) {
  const { partner, advertiser } = config;
  const bgColor = partner.headerBgColor || "#ffffff";
  const dark = isColorDark(bgColor);
  const logoHeight = partner.headerLogoHeight || "18px";
  const alignment = partner.headerAlignment || "center";
  const subtextColor = partner.headerSubtextColor || (dark ? "rgba(255,255,255,0.6)" : "#c4c4c4");
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const isSvg = partner.logo?.toLowerCase().endsWith(".svg");

  useEffect(() => {
    if (!partner.logo || !isSvg) {
      setSvgContent(null);
      return;
    }
    fetch(partner.logo)
      .then((res) => res.text())
      .then((text) => {
        if (text.includes("<svg")) setSvgContent(text);
        else setSvgContent(null);
      })
      .catch(() => setSvgContent(null));
  }, [partner.logo, isSvg]);

  return (
    <div
      className="flex flex-col gap-[4px] h-[56px] pt-[8px] pb-[4px] relative w-full"
      style={{
        backgroundColor: bgColor,
        alignItems: alignment === "left" ? "flex-start" : "center",
        justifyContent: "center",
        paddingLeft: alignment === "left" ? "16px" : undefined,
        paddingRight: alignment === "left" ? "16px" : undefined,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderBottom: dark ? "none" : "1px solid #c4c4c4" }}
      />

      <div className="flex flex-col gap-[4px]" style={{ alignItems: alignment === "left" ? "flex-start" : "center" }}>
        {partner.logo ? (
          isSvg && svgContent && partner.logoColor ? (
            <div
              className="w-[75%] flex [&_svg]:h-full [&_svg]:w-auto [&_svg]:object-contain"
              style={{
                color: partner.logoColor,
                height: logoHeight,
                justifyContent: alignment === "left" ? "flex-start" : "center",
                alignItems: "center",
              }}
              dangerouslySetInnerHTML={{
                __html: svgContent.replace(
                  /fill="[^"]*"/g,
                  'fill="currentColor"'
                ),
              }}
            />
          ) : (
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-[75%] object-contain shrink-0"
              style={{ height: logoHeight }}
            />
          )
        ) : (
          <span
            className="text-[18px] font-bold tracking-tight shrink-0"
            style={{
              color: dark ? "#ffffff" : partner.primaryColor,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {partner.name}
          </span>
        )}

        {advertiser.brandName && (
          <p
            className="font-normal leading-[16px] text-[12px] whitespace-nowrap shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: subtextColor,
            }}
          >
            In partnership with {advertiser.brandName}
          </p>
        )}
      </div>
    </div>
  );
}

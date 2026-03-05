import type { PartnerConfig } from "@shared/schema";
import { isColorDark } from "@/lib/utils";

interface HeaderProps {
  config: PartnerConfig;
}

export function PlacementHeader({ config }: HeaderProps) {
  const { partner, advertiser } = config;
  const bgColor = partner.headerBgColor || "#ffffff";
  const dark = isColorDark(bgColor);

  return (
    <div
      className="flex flex-col gap-[4px] h-[56px] items-center justify-center pb-px relative w-full"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderBottom: dark ? "none" : "1px solid #c4c4c4" }}
      />

      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-[19px] w-auto object-contain shrink-0"
        />
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
            color: dark ? "rgba(255,255,255,0.6)" : "#c4c4c4",
          }}
        >
          In partnership with {advertiser.brandName}
        </p>
      )}
    </div>
  );
}

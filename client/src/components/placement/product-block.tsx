import { useState, useEffect, useCallback } from "react";
import type { PartnerConfig } from "@shared/schema";

interface ProductBlockProps {
  config: PartnerConfig;
  onAddToOrder: () => void;
  onDecline: () => void;
}

function Countdown({
  seconds,
  primaryColor,
}: {
  seconds: number;
  primaryColor: string;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
    const timer = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="bg-[#fafafa] flex gap-[16px] items-start justify-center px-[16px] py-[14px] relative rounded-[8px] w-full">
      <div className="absolute border border-[#cacaca] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
      <div className="flex flex-1 gap-[4px] items-center justify-center text-center">
        <p className="text-[16px]" style={{ color: primaryColor }}>
          <span
            className="leading-[19px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            {"Before you go - here's an exclusive offer for you expiring in "}
          </span>
          <span
            className="leading-[19px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              color: primaryColor,
            }}
          >
            {display}
          </span>
          <span
            className="leading-[19px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            .
          </span>
        </p>
      </div>
    </div>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const displayImages = images.length > 0 ? images : [];

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, Math.max(0, displayImages.length - 1)));
  }, [displayImages.length]);

  const next = useCallback(() => {
    if (displayImages.length > 1) {
      setCurrent((prev) => (prev + 1) % displayImages.length);
    }
  }, [displayImages.length]);

  if (displayImages.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#cacaca] rounded-[16px]" />
    );
  }

  return (
    <div className="flex flex-col items-center gap-[16px]">
      <div
        className="w-full aspect-square rounded-[16px] overflow-hidden relative cursor-pointer"
        onClick={next}
      >
        <img
          src={displayImages[current]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-[7px] items-center">
          {displayImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? 8 : i === displayImages.length - 1 ? 5 : 8,
                height: i === current ? 8 : i === displayImages.length - 1 ? 5 : 8,
                backgroundColor: i === current ? "#303030" : "#CACACA",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductBlock({
  config,
  onAddToOrder,
  onDecline,
}: ProductBlockProps) {
  const { partner, advertiser } = config;
  const primaryColor = partner.primaryColor || "#1a1a1a";

  return (
    <div
      className="flex flex-col gap-[24px] items-start pb-[32px] pt-[24px] px-[16px] w-full"
      style={{
        backgroundColor: partner.backgroundColor || "#ffffff",
        fontFamily: `'${partner.fontFamily}', 'Inter', sans-serif`,
      }}
    >
      {/* Confirmation text + Countdown */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        <p className="font-semibold h-[24px] leading-[1.2] text-[20px] text-center w-full"
          style={{ fontFamily: "'Inter', sans-serif", color: "#1a1a1a" }}>
          {partner.confirmationText || "Your order was placed!"}
        </p>
        <Countdown
          seconds={advertiser.countdownSeconds}
          primaryColor={primaryColor}
        />
      </div>

      {/* Image carousel + Product details */}
      <div className="flex flex-col gap-[24px] items-start w-full">
        <ImageCarousel images={advertiser.productImages} />

        <div className="flex flex-col gap-[24px] items-start w-full">
          {/* Badges + Brand + Title */}
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="flex flex-col gap-[8px] items-start w-full">
              {advertiser.badges.length > 0 && (
                <div className="flex gap-[8px] items-center">
                  {advertiser.badges.map((badge) => (
                    <div
                      key={badge}
                      className="flex h-[22px] items-center justify-center px-[8px] py-[3px] rounded-[500px]"
                      style={{ backgroundColor: partner.secondaryColor || "#cacaca" }}
                    >
                      <span
                        className="text-[12px] font-semibold uppercase tracking-[0.48px] text-center whitespace-nowrap"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#242424",
                        }}
                      >
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {advertiser.brandName && (
                <p
                  className="text-[14px] leading-[19.25px] tracking-[0.064px]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: "#5f5f5f",
                  }}
                >
                  {advertiser.brandName}
                </p>
              )}

              {advertiser.productTitle && (
                <p
                  className="text-[20px] leading-[26px] w-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: "#242424",
                  }}
                >
                  {advertiser.productTitle}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-col items-start">
              <div className="flex gap-[8px] items-center">
                {advertiser.productSalePrice && (
                  <span
                    className="text-[24px] leading-[31.2px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      color: primaryColor,
                    }}
                  >
                    {advertiser.productSalePrice}
                  </span>
                )}
                {advertiser.productPrice &&
                  advertiser.productSalePrice &&
                  advertiser.productPrice !== advertiser.productSalePrice && (
                    <span
                      className="text-[24px] leading-[24px] line-through"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        color: "#cacaca",
                      }}
                    >
                      {advertiser.productPrice}
                    </span>
                  )}
                {advertiser.productDiscount && (
                  <div
                    className="flex h-[20px] items-center justify-center px-[8px] py-[3px] rounded-[500px]"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                    }}
                  >
                    <span
                      className="text-[12px] font-semibold uppercase leading-[18px]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: primaryColor,
                      }}
                    >
                      {advertiser.productDiscount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Description */}
          {advertiser.productDescription && (
            <div className="flex flex-col gap-[8px] items-start w-full">
              <p
                className="text-[14px] leading-[19.25px] tracking-[0.064px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: "#242424",
                }}
              >
                Product Details
              </p>
              <div
                className="text-[14px] leading-[20px] tracking-[0.064px] whitespace-pre-line"
                style={{
                  fontFamily: "'Helvetica', 'Inter', sans-serif",
                  fontWeight: 400,
                  color: "#5f5f5f",
                }}
              >
                {advertiser.productDescription}
              </div>
            </div>
          )}

          {/* Variant selector */}
          {advertiser.variants.length > 0 && (
            <div className="flex flex-col gap-[8px] items-start w-full">
              {advertiser.variants.map((variant) => (
                <div key={variant.label} className="w-full">
                  <div className="bg-white h-[44px] rounded-[8px] border border-[#cacaca] flex items-center justify-between px-[12px] w-full">
                    <div className="flex items-center gap-[6px] text-[14px]">
                      <span style={{ fontFamily: "'Inter', sans-serif", color: "#242424" }}>
                        {variant.label}:
                      </span>
                      <span className="font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: "#242424" }}>
                        {variant.options[0]}
                      </span>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 12 7" fill="none">
                      <path d="M0.833 0.833L5.833 5.833L10.833 0.833" stroke="black" strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shipping info */}
          {advertiser.soldBy && (
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="w-full h-0 border-t border-[#eaecf0]" />
              <div className="flex items-center w-full">
                <div className="flex flex-col gap-[3.75px] w-full">
                  <p className="text-[14px] leading-[19.25px] tracking-[0.064px]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: "#242424" }}>
                    Billing &amp; Shipping Details
                  </p>
                  <p className="text-[12px] leading-[16.5px] tracking-[0.064px]"
                    style={{ fontFamily: "'Helvetica', 'Inter', sans-serif", color: "#242424" }}>
                    This item is sold and shipped by{" "}
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                      {advertiser.soldBy}.
                    </span>{" "}
                    A separate charge will appear on your statement.
                  </p>
                </div>
              </div>
              <div className="w-full h-0 border-t border-[#eaecf0]" />
            </div>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-[8px] items-start w-full">
        <button
          onClick={onAddToOrder}
          className="h-[42px] rounded-[100px] w-full flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{
            backgroundColor: partner.buttonBgColor || "#1a1a1a",
            border: partner.buttonBorder || "none",
            borderRadius: partner.buttonBorderRadius || "100px",
          }}
        >
          <span
            className="text-[16px] font-semibold leading-[1.37] whitespace-pre"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: partner.buttonTextColor || "#ffffff",
            }}
          >
            {advertiser.ctaButtonText}
            {advertiser.productSalePrice
              ? `  |  ${advertiser.productSalePrice}`
              : ""}
          </span>
        </button>

        <button
          onClick={onDecline}
          className="h-[42px] rounded-[100px] w-full flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{
            backgroundColor: "transparent",
            border: "1px solid #0f0f0f",
            borderRadius: partner.buttonBorderRadius || "100px",
          }}
        >
          <span
            className="text-[16px] font-semibold leading-[22px]"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#000000",
            }}
          >
            Decline offer
          </span>
        </button>
      </div>
    </div>
  );
}

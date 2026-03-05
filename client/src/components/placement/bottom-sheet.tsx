import { AnimatePresence, motion } from "framer-motion";
import type { PartnerConfig } from "@shared/schema";

interface BottomSheetProps {
  config: PartnerConfig;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function BottomSheet({
  config,
  isOpen,
  onClose,
  onConfirm,
}: BottomSheetProps) {
  const { partner, advertiser } = config;
  const brandName = advertiser.brandName || "Brand";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-start overflow-hidden rounded-tl-[16px] rounded-tr-[16px] w-full max-w-[393px] mx-auto"
            style={{ backgroundColor: "#f6f6f6" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="h-[68px] w-full relative overflow-hidden rounded-tl-[8px] rounded-tr-[8px]">
              <div className="absolute left-[16px] top-[18px] flex flex-col items-start w-[101px]">
                <p
                  className="text-[18px] w-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    color: "#000000",
                  }}
                >
                  Checkout
                </p>
                <p
                  className="text-[12px] font-semibold w-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#b5b5b5",
                  }}
                >
                  {brandName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="absolute right-[16px] top-[17px] w-[40px] h-[40px] rounded-full bg-[#efefef] flex items-center justify-center cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="#b5b5b5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[16px] items-center w-full">
              {/* Payment Method */}
              <div className="flex flex-col items-start w-[361px] mx-auto">
                <div className="bg-white rounded-tl-[8px] rounded-tr-[8px] w-full relative">
                  <div className="flex flex-col items-start p-[16px]">
                    <p
                      className="text-[16px] leading-[22px] tracking-[0.064px]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      Payment Method
                    </p>
                  </div>
                  <div className="absolute inset-0 pointer-events-none border-b border-[#eaecf0] rounded-tl-[8px] rounded-tr-[8px]" />
                </div>
                <div className="bg-white h-[56px] rounded-bl-[8px] rounded-br-[8px] w-full flex items-center">
                  <div className="flex items-center justify-between p-[16px] w-full">
                    <p
                      className="text-[16px] tracking-[0.064px]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#000000",
                      }}
                    >
                      Visa ···· 1234
                    </p>
                    <p
                      className="text-[12px] font-medium uppercase underline"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#000000",
                      }}
                    >
                      EDIT
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex flex-col items-start w-[361px] mx-auto">
                <div className="bg-white rounded-tl-[8px] rounded-tr-[8px] w-full relative">
                  <div className="flex flex-col items-start p-[16px]">
                    <p
                      className="text-[16px] leading-[22px] tracking-[0.064px]"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        color: "#000000",
                      }}
                    >
                      Shipping Address
                    </p>
                  </div>
                  <div className="absolute inset-0 pointer-events-none border-b border-[#eaecf0] rounded-tl-[8px] rounded-tr-[8px]" />
                </div>
                <div className="bg-white rounded-bl-[8px] rounded-br-[8px] w-full flex items-center">
                  <div className="flex items-center justify-between p-[16px] w-full">
                    <div className="flex flex-col gap-[4px] items-start w-[278px]">
                      <p
                        className="text-[16px] tracking-[0.064px]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#000000",
                        }}
                      >
                        Kathleen Miller
                      </p>
                      <p
                        className="text-[14px]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#5f5f5f",
                        }}
                      >
                        1 West St, Apt 2223, New York, NY 10004
                      </p>
                    </div>
                    <p
                      className="text-[12px] font-medium uppercase underline"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#000000",
                      }}
                    >
                      EDIT
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping notice */}
              <div className="w-[361px] mx-auto">
                <p
                  className="text-[15px] leading-[1.3] tracking-[0.064px]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#000000",
                  }}
                >
                  Shipping details will be provided by {brandName} in a
                  separate confirmation email.
                </p>
              </div>

              {/* Footer */}
              <div className="flex flex-col items-start w-full">
                <div className="bg-white w-full relative">
                  <div className="absolute inset-0 pointer-events-none border-t border-[#eaecf0]" />
                  <div className="flex flex-col gap-[16px] items-center justify-end p-[16px]">
                    {/* Total */}
                    <div className="flex flex-col items-start w-[361px] mx-auto">
                      <div className="flex items-end justify-between w-full">
                        <div className="flex flex-col items-start">
                          <p
                            className="text-[14px] leading-[19.25px] tracking-[0.064px]"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: "#b5b5b5",
                            }}
                          >
                            Pay {brandName}
                          </p>
                          <p
                            className="text-[22px] font-medium leading-[28.64px]"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: "#000000",
                            }}
                          >
                            Total
                          </p>
                        </div>
                        <p
                          className="text-[22px] font-bold leading-[28px] text-right"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "#000000",
                          }}
                        >
                          {advertiser.productSalePrice || advertiser.productPrice || "$0.00"}
                        </p>
                      </div>
                    </div>

                    {/* Terms */}
                    <p
                      className="text-[11.4px] leading-[16px] w-full max-w-[361px] mx-auto"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "#000000",
                      }}
                    >
                      By clicking &quot;Confirm order,&quot; I agree to the brand&apos;s
                      Terms and acknowledge my information will be handled per
                      this Privacy Policy and this item is billed and shipped
                      separately.
                    </p>

                    {/* Confirm button */}
                    <button
                      onClick={onConfirm}
                      className="h-[46px] rounded-[8px] shadow-sm w-[361px] mx-auto flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: partner.buttonBgColor || "#000000",
                      }}
                    >
                      <span
                        className="text-[16px] font-semibold"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: partner.buttonTextColor || "#ffffff",
                        }}
                      >
                        Confirm order
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

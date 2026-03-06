import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Mail, Truck } from "lucide-react";
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
                  <div className="flex items-center gap-[8px] p-[16px]">
                    <CreditCard className="w-4 h-4 shrink-0" style={{ color: "#242424" }} />
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
                    <div className="flex items-center gap-[8px]">
                      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="20" rx="3" fill="#1A1F71"/>
                        <path d="M13.2 13.5L14.7 6.5H16.5L15 13.5H13.2Z" fill="white"/>
                        <path d="M21.3 6.7C20.9 6.5 20.3 6.4 19.5 6.4C17.7 6.4 16.4 7.3 16.4 8.6C16.4 9.6 17.3 10.1 18 10.4C18.7 10.7 18.9 10.9 18.9 11.2C18.9 11.6 18.4 11.8 17.9 11.8C17.2 11.8 16.8 11.7 16.2 11.4L16 11.3L15.7 13C16.2 13.2 17 13.4 17.9 13.4C19.8 13.4 21.1 12.5 21.1 11.1C21.1 10.3 20.6 9.7 19.5 9.2C18.9 8.9 18.5 8.7 18.5 8.4C18.5 8.1 18.9 7.8 19.6 7.8C20.2 7.8 20.7 7.9 21 8L21.2 8.1L21.3 6.7Z" fill="white"/>
                        <path d="M23.5 6.5H22.1C21.7 6.5 21.3 6.6 21.2 7.1L18.6 13.5H20.5L20.9 12.3H23.2L23.4 13.5H25L23.5 6.5ZM21.4 10.8L22.2 8.5L22.7 10.8H21.4Z" fill="white"/>
                        <path d="M12 6.5L10.2 11.2L10 10.1L9.3 7.2C9.2 6.7 8.8 6.5 8.3 6.5H5.5L5.5 6.7C6.4 6.9 7.2 7.3 7.8 7.7L9.5 13.5H11.4L14 6.5H12Z" fill="white"/>
                      </svg>
                      <p
                        className="text-[16px] tracking-[0.064px]"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: "#000000",
                        }}
                      >
                        Visa ···· 1234
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

              {/* Shipping Address */}
              <div className="flex flex-col items-start w-[361px] mx-auto">
                <div className="bg-white rounded-tl-[8px] rounded-tr-[8px] w-full relative">
                  <div className="flex items-center gap-[8px] p-[16px]">
                    <Truck className="w-4 h-4 shrink-0" style={{ color: "#242424" }} />
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
                    <div className="flex items-start gap-[8px] flex-1">
                      <Mail className="w-4 h-4 shrink-0 mt-[3px]" style={{ color: "#242424" }} />
                      <div className="flex flex-col gap-[4px] items-start flex-1">
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
                      By clicking &quot;Confirm order,&quot; I agree to the brand&apos;s{" "}
                      <span style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}>Terms</span>{" "}
                      and acknowledge my information will be handled per
                      this{" "}
                      <span style={{ color: "#2563eb", textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>{" "}
                      and this item is billed and shipped
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

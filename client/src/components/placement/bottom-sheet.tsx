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
  const br = partner.borderRadius || "8px";
  const btnBr = partner.buttonBorderRadius || "100px";

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
                <div className="bg-white w-full relative" style={{ borderTopLeftRadius: br, borderTopRightRadius: br }}>
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
                  <div className="absolute inset-0 pointer-events-none border-b border-[#eaecf0]" style={{ borderTopLeftRadius: br, borderTopRightRadius: br }} />
                </div>
                <div className="bg-white h-[56px] w-full flex items-center" style={{ borderBottomLeftRadius: br, borderBottomRightRadius: br }}>
                  <div className="flex items-center justify-between p-[16px] w-full">
                    <div className="flex items-center gap-[8px]">
                      <div className="flex items-center justify-center w-[36px] h-[24px] rounded-[4px] border border-[#e0e0e0]">
                      <svg width="27" height="8" viewBox="0 0 27 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.3 2.1H23C22.6 3.1 22.3 3.6 22 5.1H23.9C23.6 3.6 23.6 2.9 23.3 2.1ZM26.2 8H24.5C24.4 8 24.4 8 24.3 7.9L24.1 7L24 6.8H21.6C21.5 6.8 21.4 6.8 21.4 7L21.1 7.9C21.1 8 21 8 21 8H18.9L19.1 7.5L22 0.7C22 0.2 22.3 0 22.8 0H24.3C24.4 0 24.5 -1.93715e-07 24.5 0.2L25.9 6.7C26 7.1 26.1 7.4 26.1 7.8C26.2 7.9 26.2 7.9 26.2 8ZM12.8 7.7L13.2 5.9C13.3 5.9 13.4 6 13.4 6C14.1 6.3 14.8 6.5 15.5 6.4C15.7 6.4 16 6.3 16.2 6.2C16.7 6 16.7 5.5 16.3 5.1C16.1 4.9 15.8 4.8 15.5 4.6C15.1 4.4 14.7 4.2 14.4 3.9C13.2 2.9 13.6 1.5 14.3 0.8C14.9 0.4 15.2 0 16 0C17.2 0 18.5 -1.93715e-07 19.1 0.2H19.2C19.1 0.8 19 1.3 18.8 1.9C18.3 1.7 17.8 1.5 17.3 1.5C17 1.5 16.7 1.5 16.4 1.6C16.2 1.6 16.1 1.7 16 1.8C15.8 2 15.8 2.3 16 2.5L16.5 2.9C16.9 3.1 17.3 3.3 17.6 3.5C18.1 3.8 18.6 4.3 18.7 4.9C18.9 5.8 18.6 6.6 17.8 7.2C17.3 7.6 17.1 7.8 16.4 7.8C15 7.8 13.9 7.9 13 7.6C12.9 7.8 12.9 7.8 12.8 7.7ZM9.3 8C9.4 7.3 9.4 7.3 9.5 7C10 4.8 10.5 2.5 10.9 0.3C11 0.1 11 0 11.2 0H13C12.8 1.2 12.6 2.1 12.3 3.2C12 4.7 11.7 6.2 11.3 7.7C11.3 7.9 11.2 7.9 11 7.9M0 0.2C0 0.0999998 0.2 0 0.3 0H3.7C4.2 0 4.6 0.3 4.7 0.8L5.6 5.2C5.6 5.3 5.6 5.3 5.7 5.4C5.7 5.3 5.8 5.3 5.8 5.3L7.9 0.2C7.8 0.0999998 7.9 0 8 0H10.1C10.1 0.1 10.1 0.0999998 10 0.2L6.9 7.5C6.8 7.7 6.8 7.8 6.7 7.9C6.6 8 6.4 7.9 6.2 7.9H4.7C4.6 7.9 4.5 7.9 4.5 7.7L2.9 1.5C2.7 1.3 2.4 1 2 0.9C1.4 0.6 0.3 0.4 0.0999999 0.4L0 0.2Z" fill="#142688"/>
                      </svg>
                      </div>
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
                <div className="bg-white w-full relative" style={{ borderTopLeftRadius: br, borderTopRightRadius: br }}>
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
                  <div className="absolute inset-0 pointer-events-none border-b border-[#eaecf0]" style={{ borderTopLeftRadius: br, borderTopRightRadius: br }} />
                </div>
                <div className="bg-white w-full flex items-center" style={{ borderBottomLeftRadius: br, borderBottomRightRadius: br }}>
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
                      className="h-[46px] shadow-sm w-[361px] mx-auto flex items-center justify-center cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: partner.buttonBgColor || "#000000",
                        borderRadius: btnBr,
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

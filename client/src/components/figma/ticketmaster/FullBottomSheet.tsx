import svgPaths from "./svg-payment";

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start leading-[normal] left-[16px] not-italic top-[18px] w-[101px]">
      <p className="font-['Averta:Bold',sans-serif] relative shrink-0 text-[18px] text-black w-full">Checkout</p>
      <p className="font-['Averta:Regular',sans-serif] relative shrink-0 text-[#999] text-[12px] w-full">Dagne Dover</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[12px] top-[12px]">
      <div className="absolute flex items-center justify-center left-[12px] size-[15.924px] top-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-45">
          <div className="bg-[#7c7b81] border-[#7c7b81] border-[0.37px] border-solid h-[20.743px] rounded-[30px] w-[1.778px]" />
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[12.07px] size-[15.924px] top-[12px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-135">
          <div className="bg-[#7c7b81] border-[#7c7b81] border-[0.37px] border-solid h-[20.743px] rounded-[30px] w-[1.778px]" />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute right-[16px] size-[40px] top-[17px]">
      <div className="absolute left-0 size-[40px] top-0">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #EFEFEF)" id="Ellipse 1" r="20" />
        </svg>
      </div>
      <Group />
    </div>
  );
}

function MasterpassWhite() {
  return (
    <div className="absolute inset-[0_6.52%_0.55%_6.36%]" data-name="masterpass-white">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.877 23.1441">
        <g id="masterpass-white">
          <path clipRule="evenodd" d={svgPaths.p3b68bc80} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill-1" />
          <mask height="24" id="mask0_1_262" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
            <g id="mask-2">
              <path d={svgPaths.p2aeb4780} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_1_262)">
            <path clipRule="evenodd" d={svgPaths.p29661fc0} fill="var(--fill-0, #FF5F00)" fillRule="evenodd" id="Fill-3" />
            <path clipRule="evenodd" d={svgPaths.p31f19c00} fill="var(--fill-0, #EB001B)" fillRule="evenodd" id="Fill-5" />
            <path clipRule="evenodd" d={svgPaths.p1f5a0c00} fill="var(--fill-0, #F79E1B)" fillRule="evenodd" id="Fill-6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MasterpassFillCopy() {
  return (
    <div className="absolute contents inset-[0_6.52%_0.55%_6.36%]" data-name="masterpass-fill-copy">
      <MasterpassWhite />
    </div>
  );
}

function Mastercard1() {
  return (
    <div className="absolute contents inset-0" data-name="Mastercard">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 23.2727">
        <path clipRule="evenodd" d={svgPaths.p36a03000} fill="var(--fill-0, black)" fillRule="evenodd" id="mastercard-bg-copy" />
      </svg>
      <MasterpassFillCopy />
    </div>
  );
}

function Mastercard() {
  return (
    <div className="h-[23.273px] overflow-clip relative shrink-0 w-[32px]" data-name="Mastercard">
      <Mastercard1 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[278px]">
      <Mastercard />
      <p className="font-['Averta:Regular',sans-serif] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#242424] text-[0px] text-[16px] tracking-[0.064px] whitespace-nowrap">
        <span className="leading-[1.2]">Mastercard ···</span>
        <span className="leading-[1.2]">·</span>
        <span className="leading-[1.2]">{` 1234`}</span>
      </p>
    </div>
  );
}

function Profiles() {
  return (
    <div className="bg-white h-[56px] min-h-[56px] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Profiles">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between min-h-[inherit] p-[16px] relative size-full">
          <Frame6 />
          <div className="flex flex-col font-['Averta:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#024ddf] text-[12px] text-right uppercase whitespace-nowrap">
            <p className="decoration-solid leading-none underline">EDIT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomSheetContainers() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[361px]" data-name="bottom-sheet containers">
      <div className="bg-white relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="content-headers">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Payment bottomsheet + content">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="delivery-icons">
                <div className="absolute inset-[20.83%_8.33%]" data-name="Vector">
                  <div className="absolute inset-[-5.36%_-3.75%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 15.5">
                      <path d={svgPaths.peea8300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[39.58%_8.33%_60.42%_8.33%]" data-name="Vector">
                  <div className="absolute inset-[-1px_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 2">
                      <path d="M0 1H20" id="Vector" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[66.67%_58.33%_33.33%_20.83%]">
                  <div className="absolute inset-[-1.5px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.5">
                      <line id="Line 40" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" x1="0.75" x2="4.25" y1="0.75" y2="0.75" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col font-['Averta:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[0.064px] whitespace-nowrap">
                <p className="leading-[22px]">Payment Method</p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
      </div>
      <Profiles />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col font-['Averta:Regular',sans-serif] gap-[4px] items-start leading-[1.2] relative shrink-0 w-[278px]">
      <p className="relative shrink-0 text-[#242424] text-[16px] tracking-[0.064px] w-full">John Smith</p>
      <p className="relative shrink-0 text-[#5f5f5f] text-[14px] w-full">1 West St, Apt 2223, New York, NY 10004</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 w-[236px]">
      <p className="font-['Averta:Regular',sans-serif] leading-[19.25px] relative shrink-0 text-[#999] text-[14px] tracking-[0.064px] whitespace-nowrap">Pay Dagne Dover</p>
      <p className="font-['Averta:Bold',sans-serif] leading-[28.64px] min-w-full relative shrink-0 text-[22px] text-black w-[min-content]">Total</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="chevron-down">
          <path d={svgPaths.p1d3a3700} fill="var(--fill-0, #7C7B81)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <p className="font-['Averta:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[22px] text-black text-right whitespace-nowrap">$19.02</p>
      <ChevronDown />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <Frame4 />
      <Frame2 />
    </div>
  );
}

function TotalPrice() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start justify-end overflow-clip relative shrink-0 w-[361px]" data-name="Total Price">
      <Frame3 />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Averta:Bold',sans-serif] leading-none not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap">Confirm order</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white h-[304px] relative shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center p-[16px] relative size-full">
          <TotalPrice />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] min-w-full not-italic relative shrink-0 text-[#1a1a1a] text-[0px] text-[12px] tracking-[0.064px] w-[min-content]">
            <span className="font-['Averta:Regular',sans-serif] leading-[16.5px]">{`By clicking "Confirm order," I agree to the brand's `}</span>
            <span className="decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] text-[#024ddf] underline">Terms</span>
            <span className="font-['Averta:Regular',sans-serif] leading-[16.5px]">{` and acknowledge my information will be handled per this `}</span>
            <span className="decoration-solid font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] text-[#024ddf] underline">Privacy Policy</span>
            <span className="font-['Averta:Regular',sans-serif] leading-[16.5px]">{` and this item is billed and shipped separately to my Ticketmaster order.`}</span>
          </p>
          <button className="bg-[#01a469] cursor-pointer h-[46px] relative rounded-[4px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] shrink-0 w-full" data-name="Button/Primary-Add to order">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center p-[12px] relative size-full">
                <TextPadding />
              </div>
            </div>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function PaymentDisclaimerBase() {
  return (
    <div className="content-stretch flex flex-col h-[304px] items-start relative shrink-0 w-full" data-name="Payment-Disclaimer-Base">
      <Frame1 />
    </div>
  );
}

function PaymentContentContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[564px] items-center relative shrink-0 w-full" data-name="payment-content-container">
      <BottomSheetContainers />
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-[361px]" data-name="bottom-sheet containers">
        <div className="bg-white relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="content-headers">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Payment bottomsheet + content">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="delivery-icons">
                  <div className="absolute inset-[12.5%]" data-name="Vector">
                    <div className="absolute inset-[-4.17%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
                        <path d={svgPaths.p28fd8500} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[37.55%_12.72%_62.45%_12.72%]" data-name="Vector">
                    <div className="absolute inset-[-0.75px_-4.19%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.393 1.5">
                        <path d="M0.75 0.75H18.643" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[33.33%_41.67%_45.83%_41.67%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 5">
                      <path d={svgPaths.pec6580} fill="var(--fill-0, black)" id="Vector" />
                    </svg>
                  </div>
                  <div className="absolute inset-[12.5%_41.67%_62.5%_41.67%]" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 6">
                      <path d={svgPaths.p321dbf00} fill="var(--fill-0, black)" id="Vector" />
                    </svg>
                  </div>
                  <div className="absolute bottom-1/4 left-[54.17%] right-1/4 top-3/4">
                    <div className="absolute inset-[-1.5px_0_0_0]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.5">
                        <line id="Line 40" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.5" x1="0.75" x2="4.25" y1="0.75" y2="0.75" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col font-['Averta:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[0.064px] whitespace-nowrap">
                  <p className="leading-[22px]">Shipping Address</p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
        </div>
        <div className="bg-white relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full" data-name="Profiles">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between not-italic p-[16px] relative w-full">
              <Frame7 />
              <div className="flex flex-col font-['Averta:Bold',sans-serif] justify-center leading-[0] relative shrink-0 text-[#024ddf] text-[12px] text-right uppercase whitespace-nowrap">
                <p className="decoration-solid leading-none underline">EDIT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-[361px]" data-name="Shipment-details-info">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="delivery-icons">
          <div className="absolute bottom-1/4 left-[8.33%] right-[41.67%] top-[16.67%]" data-name="Vector">
            <div className="absolute inset-[-5.36%_-6.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 15.5">
                <path d={svgPaths.p287f6400} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-3/4" data-name="Vector">
            <div className="absolute inset-[-0.75px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 1.5">
                <path d="M6 0.75H0" id="Vector" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-1/4 left-[58.33%] right-[8.33%] top-[33.33%]" data-name="Vector">
            <div className="absolute inset-[-7.5%_-9.38%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.5 11.5">
                <path d={svgPaths.p35131900} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[66.67%_20.83%_16.67%_62.5%]" data-name="Vector">
            <div className="absolute inset-[-18.75%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5 5.5">
                <path d={svgPaths.p9526000} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[66.67%_62.5%_16.67%_20.83%]" data-name="Vector">
            <div className="absolute inset-[-18.75%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.5 5.5">
                <path d={svgPaths.p9526000} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-['Averta_PE:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[15px] tracking-[0.064px] w-[325px]">
          <p className="leading-[1.3]">Shipping details will be provided by Dagne Dover in a separate confirmation email.</p>
        </div>
      </div>
      <PaymentDisclaimerBase />
    </div>
  );
}

export default function FullBottomSheet() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start overflow-clip relative rounded-tl-[16px] rounded-tr-[16px] shadow-[0px_-2px_12px_0px_rgba(18,18,18,0.25)] size-full" data-name="Full-Bottom sheet">
      <div className="h-[68px] overflow-clip relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Header">
        <div className="absolute h-[68px] left-0 top-0 w-[393px]" />
        <Frame5 />
        <Frame />
      </div>
      <PaymentContentContainer />
    </div>
  );
}
import svgPaths from "./svg-confirmation";
const imgCardsNoElevation43Image = "/images/ticketmaster/concert-placeholder.png";
const imgCardsNoElevation43Image1 = "/images/ticketmaster/concert-placeholder.png";
const imgCardsNoElevation43Image2 = "/images/ticketmaster/concert-placeholder.png";
import { imgFillWhite, imgGroup } from "./svg-confirmation-data";

function Group14() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute h-[56px] left-0 top-0 w-[375px]" data-name="NA/Mobile Header">
        <div className="absolute inset-[32.14%_14.93%_32.14%_79.73%]" data-name="Site-Nav/MyAccount">
          <div className="absolute inset-[6.25%]" data-name="Combined Shape">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
              <path d={svgPaths.p1e505900} fill="var(--fill-0, white)" id="Combined Shape" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[32.14%_5.33%_32.14%_89.33%]" data-name="Site-Nav/Hamburger">
          <div className="absolute inset-[18.75%_12.5%]" data-name="Combined Shape">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12.5">
              <path d={svgPaths.p3ebd8b80} fill="var(--fill-0, white)" id="Combined Shape" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[28.57%_61.33%_28.57%_4.27%]" data-name="Ticketmaster">
          <div className="absolute inset-[8.33%_0.78%_16.67%_0]" data-name="ticketmaster">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 18">
              <path clipRule="evenodd" d={svgPaths.p15e15700} fill="var(--fill-0, white)" fillRule="evenodd" id="ticketmaster" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute h-[249px] left-0 top-0 w-[359px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 359 249">
          <path d={svgPaths.pb939e00} fill="url(#paint0_linear_1_2065)" id="Rectangle 7" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_2065" x1="28.7669" x2="236.652" y1="2.00759e-05" y2="64.3392">
              <stop stopColor="white" stopOpacity="0.04" />
              <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.06" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute flex h-[249px] items-center justify-center left-[16px] top-0 w-[359px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[249px] relative w-[359px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 359 249">
              <path d={svgPaths.pb939e00} fill="url(#paint0_linear_1_1909)" id="Rectangle 8" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1909" x1="28.7669" x2="236.652" y1="2.00759e-05" y2="64.3392">
                  <stop stopColor="white" stopOpacity="0.04" />
                  <stop offset="1" stopColor="white" stopOpacity="0.04" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Averta:Semibold',sans-serif] h-[60px] justify-center leading-[1.16] left-[187.5px] not-italic text-[24px] text-center text-white top-[102px] w-[375px]">
        <p className="mb-0">You Got ‘Em</p>
        <p>Let the Anticipation Begin.</p>
      </div>
    </div>
  );
}

function TopHeader() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Top Header">
      <div aria-hidden="true" className="absolute border-[#024ddf] border-solid border-t-8 inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-center mb-[-6px] pr-[16px] relative shrink-0 z-[2]" data-name="Title">
      <p className="font-['Averta:Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[24px] text-white tracking-[1.2px] uppercase whitespace-nowrap">you’re in!</p>
    </div>
  );
}

function Underline() {
  return (
    <div className="bg-[#024ddf] mb-[-6px] relative shrink-0 w-full z-[1]" data-name="Underline">
      <div className="content-stretch flex flex-col items-start pl-[16px] w-full" />
    </div>
  );
}

function HeaderContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[18px] items-start justify-center pb-[48px] pt-[32px] px-[16px] relative w-full">
          <div className="content-stretch flex flex-col isolate items-start pb-[6px] relative shrink-0" data-name="Title Underline">
            <Title />
            <Underline />
          </div>
          <p className="font-['Averta:Regular',sans-serif] leading-[22px] max-w-[650px] min-w-full not-italic relative shrink-0 text-[16px] text-white tracking-[0.32px] w-[min-content]">{`Get ready for an amazing time ahead. Here's what you ordered...`}</p>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#121212] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <TopHeader />
      <HeaderContent />
    </div>
  );
}

function CheckoutHeader() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-0 top-0 w-[393px]" data-name="Checkout Header">
      <p className="absolute font-['Averta:Semibold',sans-serif] inset-[29.75%_16.53%_33.89%_39.47%] leading-[1.37] not-italic text-[16px] text-white">Time Remaining 04:17</p>
      <div className="absolute h-[24px] right-[349.4px] top-0 w-[25.6px]" data-name="Feedback/Question-Outline">
        <div className="absolute inset-[4.17%]" data-name="Combined Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.4668 22">
            <path d={svgPaths.p397d5600} fill="var(--fill-0, white)" id="Combined Shape" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[32px] left-0 top-[10px] w-[34.133px]" data-name="T">
        <div className="absolute inset-[8.33%_27.08%]" data-name="ticketmaster">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6444 26.6667">
            <path clipRule="evenodd" d={svgPaths.p18e3f500} fill="var(--fill-0, white)" fillRule="evenodd" id="ticketmaster" />
          </svg>
        </div>
      </div>
      <Header />
    </div>
  );
}

function FillWhite() {
  return (
    <div className="absolute inset-[-91.66%_-20.74%_-91.67%_-27.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[37px_24px] mask-size-[134.813px_18px]" data-name="Fill/White" style={{ maskImage: `url('${imgFillWhite}')` }}>
      <div className="absolute bg-white inset-0" data-name="Box" />
    </div>
  );
}

function LogoTicketmaster() {
  return (
    <div className="h-[24px] relative shrink-0 w-[135px]" data-name="Logo/ticketmaster">
      <div className="absolute inset-[8.34%_0.14%_16.67%_0]" data-name="ticketmaster">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134.813 17.9993">
          <path clipRule="evenodd" d={svgPaths.p3dea6f00} fill="var(--fill-0, white)" fillRule="evenodd" id="ticketmaster" />
        </svg>
      </div>
      <FillWhite />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="relative shrink-0 size-[20px]" data-name="Site-Nav/MyAccount">
        <div className="absolute inset-[6.25%]" data-name="Combined Shape">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 17.5">
            <path d={svgPaths.p1e505900} fill="var(--fill-0, white)" id="Combined Shape" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[188px] items-center left-[16px] top-[16px]">
      <LogoTicketmaster />
      <Frame1 />
    </div>
  );
}

function NaMobileHeader() {
  return (
    <div className="absolute content-stretch flex gap-[10px] h-[56px] items-start left-0 p-[10px] top-[8px]" data-name="NA/Mobile Header">
      <Frame2 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[186px] relative shrink-0 w-full" data-name="image">
      <div className="absolute inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="Cards/No Elevation/4:3 Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]">
          <div className="absolute bg-white inset-0 rounded-tl-[4px] rounded-tr-[4px]" />
          <img alt="" className="absolute max-w-none object-cover rounded-tl-[4px] rounded-tr-[4px] size-full" src={imgCardsNoElevation43Image} />
        </div>
      </div>
      <div className="absolute inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="Cards/No Elevation/4:3 Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]">
          <div className="absolute bg-white inset-0 rounded-tl-[4px] rounded-tr-[4px]" />
          <div className="absolute inset-0 overflow-hidden rounded-tl-[4px] rounded-tr-[4px]">
            <img alt="" className="absolute h-[106.16%] left-0 max-w-none top-[-3.08%] w-[102.62%]" src={imgCardsNoElevation43Image1} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-tl-[4px] rounded-tr-[4px]" data-name="Cards/No Elevation/4:3 Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]">
          <div className="absolute bg-white inset-0 rounded-tl-[4px] rounded-tr-[4px]" />
          <div className="absolute inset-0 overflow-hidden rounded-tl-[4px] rounded-tr-[4px]">
            <img alt="" className="absolute h-[122.94%] left-0 max-w-none top-[-0.87%] w-full" src={imgCardsNoElevation43Image2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-col h-[47px] items-start relative shrink-0 w-[311px]" data-name="header">
      <div className="flex flex-col font-['Averta:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[18px] tracking-[0.36px] uppercase w-full">
        <p className="leading-[22px]">SHAWN MENDES - WONDER THE WORLD TOUR</p>
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="location">
      <p className="font-['Averta:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#646464] text-[14px] tracking-[0.28px] whitespace-nowrap">Sec 116, Row C, Seats 20 - 21</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="NA/Icon/24/Calendar">
        <div className="absolute inset-[16.67%_18.75%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16">
            <path clipRule="evenodd" d={svgPaths.p3dd36680} fill="var(--fill-0, #646464)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Averta:Regular',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#646464] text-[14px] tracking-[0.28px] whitespace-nowrap">Thu • Jul 2, 2026 • 7:00 PM</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="NA/Icon/24/Pin">
        <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 20">
            <path d={svgPaths.p11d0f440} fill="var(--fill-0, #646464)" id="Union" />
          </svg>
        </div>
      </div>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Averta:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#024ddf] text-[14px] tracking-[0.28px] underline whitespace-nowrap">The Forum - Inglewood, CA</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function LocationTime() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="location + time">
      <div aria-hidden="true" className="absolute border-[#ebebeb] border-b border-solid inset-0 pointer-events-none" />
      <Frame5 />
    </div>
  );
}

function OrderNumberDelivery() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative shrink-0" data-name="order number + delivery">
      <p className="font-['Averta:Semibold',sans-serif] leading-[22px] relative shrink-0 text-[#121212] text-[16px] tracking-[0.32px] w-[311px]">Tickets</p>
      <p className="font-['Averta:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#646464] text-[14px] tracking-[0.28px] w-[311px]">Order # 1234567890</p>
      <p className="font-['Averta:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#646464] text-[14px] tracking-[0.28px] w-[311px]">Delivery: Mobile Entry</p>
    </div>
  );
}

function EventInformation() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0" data-name="event information">
      <Header1 />
      <Location />
      <LocationTime />
      <OrderNumberDelivery />
      <div className="bg-[#024ddf] min-w-[100px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] px-[16px] py-[10px] relative w-full">
            <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[0.32px] whitespace-nowrap">
              <p className="leading-[24px]">Manage My Tickets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkout20EventCard() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[501px] items-start relative shadow-[0px_3px_12px_0px_rgba(18,18,18,0.18)] shrink-0 w-[343px]" data-name="Checkout 2.0/Event Card">
      <Image />
      <EventInformation />
    </div>
  );
}

function MasterpassWhite() {
  return (
    <div className="absolute inset-[0_6.52%_0.55%_6.36%]" data-name="masterpass-white">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.3308 31.8232">
        <g id="masterpass-white">
          <path clipRule="evenodd" d={svgPaths.p2f24d300} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill-1" />
          <mask height="32" id="mask0_1_2057" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="39" x="0" y="0">
            <g id="mask-2">
              <path d={svgPaths.p137a7080} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_1_2057)">
            <path clipRule="evenodd" d={svgPaths.p23fda940} fill="var(--fill-0, #FF5F00)" fillRule="evenodd" id="Fill-3" />
            <path clipRule="evenodd" d={svgPaths.p2c674c80} fill="var(--fill-0, #EB001B)" fillRule="evenodd" id="Fill-5" />
            <path clipRule="evenodd" d={svgPaths.p26a2e300} fill="var(--fill-0, #F79E1B)" fillRule="evenodd" id="Fill-6" />
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
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 32">
        <path clipRule="evenodd" d={svgPaths.p18f51200} fill="var(--fill-0, black)" fillRule="evenodd" id="mastercard-bg-copy" />
      </svg>
      <MasterpassFillCopy />
    </div>
  );
}

function Mastercard() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-[44px]" data-name="Mastercard">
      <Mastercard1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Mastercard />
      <p className="font-['Averta:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#121212] text-[16px] tracking-[0.32px] whitespace-nowrap">Mastercard - 1234</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Title">
      <div className="capitalize flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[18px] tracking-[0.36px] whitespace-nowrap">
        <p className="leading-[26px]">Tickets</p>
      </div>
    </div>
  );
}

function BreakdownTextTooltip() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Breakdown Text + Tooltip">
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[16px] tracking-[0.32px] whitespace-nowrap">
        <p className="leading-[22px]">Standard Ticket: $105.00 x 2</p>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Title">
      <div className="capitalize flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[18px] tracking-[0.36px] whitespace-nowrap">
        <p className="leading-[26px]">Fees</p>
      </div>
    </div>
  );
}

function BreakdownTextTooltip1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Breakdown Text + Tooltip">
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[16px] tracking-[0.32px] whitespace-nowrap">
        <p className="leading-[22px]">Service Fee: $5.00 x 2</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="QuestionAlt">
        <div className="absolute inset-[4.17%]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p10d44a00} fill="var(--fill-0, #121212)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BreakdownTextTooltip2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Breakdown Text + Tooltip">
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[16px] tracking-[0.32px] whitespace-nowrap">
        <p className="leading-[24px]">Order Processing Fee</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="QuestionAlt">
        <div className="absolute inset-[4.17%]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p10d44a00} fill="var(--fill-0, #121212)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Title">
      <div className="capitalize flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[18px] tracking-[0.36px] whitespace-nowrap">
        <p className="leading-[26px]">Payment</p>
      </div>
    </div>
  );
}

function BreakdownTextTooltip3() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0" data-name="Breakdown Text + Tooltip">
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#646464] text-[16px] tracking-[0.32px] whitespace-nowrap">
        <p className="leading-[22px]">John Smith - Visa 1234</p>
      </div>
    </div>
  );
}

function MasterpassWhite1() {
  return (
    <div className="absolute inset-[0_6.52%_0.55%_6.36%]" data-name="masterpass-white">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.877 23.1441">
        <g id="masterpass-white">
          <path clipRule="evenodd" d={svgPaths.p3b68bc80} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill-1" />
          <mask height="24" id="mask0_1_1942" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="28" x="0" y="0">
            <g id="mask-2">
              <path d={svgPaths.p2aeb4780} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_1_1942)">
            <path clipRule="evenodd" d={svgPaths.p29661fc0} fill="var(--fill-0, #FF5F00)" fillRule="evenodd" id="Fill-3" />
            <path clipRule="evenodd" d={svgPaths.p31f19c00} fill="var(--fill-0, #EB001B)" fillRule="evenodd" id="Fill-5" />
            <path clipRule="evenodd" d={svgPaths.p1f5a0c00} fill="var(--fill-0, #F79E1B)" fillRule="evenodd" id="Fill-6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MasterpassFillCopy1() {
  return (
    <div className="absolute contents inset-[0_6.52%_0.55%_6.36%]" data-name="masterpass-fill-copy">
      <MasterpassWhite1 />
    </div>
  );
}

function Mastercard3() {
  return (
    <div className="absolute contents inset-0" data-name="Mastercard">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 23.2727">
        <path clipRule="evenodd" d={svgPaths.p36a03000} fill="var(--fill-0, black)" fillRule="evenodd" id="mastercard-bg-copy" />
      </svg>
      <MasterpassFillCopy1 />
    </div>
  );
}

function Mastercard2() {
  return (
    <div className="h-[23.273px] overflow-clip relative shrink-0 w-[32px]" data-name="Mastercard">
      <Mastercard3 />
    </div>
  );
}

function BreakdownItem() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Breakdown Item">
      <div className="flex flex-row items-center self-stretch">
        <BreakdownTextTooltip3 />
      </div>
      <Mastercard2 />
    </div>
  );
}

function BreakdownSection() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Breakdown Section">
      <Title3 />
      <BreakdownItem />
    </div>
  );
}

function BreakdownTextTooltip4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Breakdown Text + Tooltip">
      <div className="capitalize flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[18px] tracking-[0.36px] whitespace-nowrap">
        <p className="leading-[26px]">Total</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[295px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Breakdown Section">
        <div className="content-stretch flex gap-[64px] items-center relative shrink-0 w-full" data-name="Breakdown Item">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <BreakdownTextTooltip4 />
          </div>
          <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[16px] text-right tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[22px]">$224.55</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col h-px items-start relative shrink-0 w-full" data-name="Divider">
        <div className="bg-[#ebebeb] h-px shrink-0 w-full" data-name="Divider" />
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[0_20.48%_6.85%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.9153 47.5069">
        <g id="Group">
          <path d={svgPaths.pd79df00} fill="var(--fill-0, #F2BD2A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[-49.5%_4.46%_2.5%_-12.17%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[7.179px_25.245px] mask-size-[46.915px_47.507px] opacity-20" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63.548 74.9707">
        <g id="Group" opacity="0.2">
          <path clipRule="evenodd" d="M0 0H63.548V74.9707H0V0Z" fill="url(#paint0_linear_1_1906)" fillRule="evenodd" id="Vector" opacity="0.2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1906" x1="30.252" x2="30.252" y1="44.3002" y2="74.9707">
            <stop stopOpacity="0" />
            <stop offset="1" stopOpacity="0.32" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[-49.5%_4.46%_2.5%_-12.17%]" data-name="Group">
      <Group8 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[0_20.48%_6.85%_0]" data-name="Group">
      <Group7 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[0_20.48%_6.85%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.9153 47.5069">
        <g id="Group">
          <mask height="48" id="mask0_1_1901" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="47" x="0" y="0">
            <g id="eptork58qe">
              <path d={svgPaths.pd79df00} fill="var(--fill-0, white)" id="Vector" />
            </g>
          </mask>
          <g mask="url(#mask0_1_1901)">
            <path clipRule="evenodd" d={svgPaths.pf05a900} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" opacity="0.32" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[0_20.48%_6.85%_0]" data-name="Group">
      <Group5 />
      <Group6 />
      <Group9 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[36.53%_-0.4%_-0.46%_44.18%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.1744 32.6044">
        <g id="Group">
          <path d={svgPaths.p366ac0} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p10779100} fill="var(--fill-0, #96C0EE)" id="Vector_2" />
          <path d={svgPaths.p6205d00} fill="var(--fill-0, #65A5EA)" id="Vector_3" />
          <path d={svgPaths.p103f2d00} fill="var(--fill-0, white)" id="Vector_4" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[36.53%_-0.4%_-0.46%_44.18%]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0_-0.4%_-0.46%_0]" data-name="Group">
      <Group4 />
      <Group10 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[0_-0.4%_-0.46%_0]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[-924.66%_-592.77%_-1397.26%_-1042.17%]" data-name="Group">
      <div className="absolute inset-[-924.66%_-592.77%_-1397.26%_-1042.17%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1023.61 1235.18">
          <path clipRule="evenodd" d="M0 0H1023.61V1235.18H0V0Z" fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[-551.37%_-365.66%_-37.67%_-28.31%]" data-name="Vector">
        <div className="absolute inset-[-0.14%_-0.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 292.446 352.411">
            <path clipRule="evenodd" d={svgPaths.p29374600} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" stroke="var(--stroke-0, #EBEBEB)" />
          </svg>
        </div>
      </div>
      <Group2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[-924.66%_-592.77%_-1397.26%_-1042.17%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute inset-[10.34%_10.53%_1.72%_11.84%] overflow-clip" data-name="image">
      <Group />
    </div>
  );
}

function TicketInsurance() {
  return (
    <div className="h-[58px] overflow-clip relative shrink-0 w-[76px]" data-name="ticket-insurance 2">
      <Image1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px not-italic relative text-[#121212] text-[16px] tracking-[0.32px]">
      <p className="font-['Averta:Semibold',sans-serif] leading-[22px] relative shrink-0 w-full">The Perfect Ticket Protection</p>
      <p className="font-['Averta:Regular',sans-serif] leading-[0] relative shrink-0 text-[0px] w-full">
        <span className="leading-[22px]">{`Life happens. Get Ticket Insurance and get peace of mind. `}</span>
        <span className="[text-decoration-skip-ink:none] decoration-solid leading-[22px] text-[#024ddf] underline">Learn More</span>
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[295px]">
      <TicketInsurance />
      <Frame7 />
    </div>
  );
}

function TotalBreakdown() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start px-[24px] py-[32px] relative shadow-[0px_3px_12px_0px_rgba(18,18,18,0.18)] shrink-0 w-[343px]" data-name="Total Breakdown">
      <Frame9 />
      <div className="content-stretch flex flex-col h-px items-start relative shrink-0 w-full" data-name="Divider">
        <div className="bg-[#ebebeb] h-px shrink-0 w-full" data-name="Divider" />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Breakdown Section">
        <Title1 />
        <div className="content-stretch flex gap-4 items-center relative shrink-0 w-full" data-name="Breakdown Item">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <BreakdownTextTooltip />
          </div>
          <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[16px] text-right tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[22px]">$210.00</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Breakdown Section">
        <Title2 />
        <div className="content-stretch flex gap-4 items-center relative shrink-0 w-full" data-name="Breakdown Item">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <BreakdownTextTooltip1 />
          </div>
          <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[16px] text-right tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[22px]">$10.00</p>
          </div>
        </div>
        <div className="content-stretch flex gap-4 items-center relative shrink-0 w-full" data-name="Breakdown Item">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <BreakdownTextTooltip2 />
          </div>
          <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#121212] text-[16px] text-right tracking-[0.32px] whitespace-nowrap">
            <p className="leading-[24px]">$4.55</p>
          </div>
        </div>
      </div>
      <BreakdownSection />
      <div className="content-stretch flex flex-col h-px items-start relative shrink-0 w-full" data-name="Divider">
        <div className="bg-[#ebebeb] h-px shrink-0 w-full" data-name="Divider" />
      </div>
      <Frame10 />
      <Frame8 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[24px] top-[201px]">
      <Checkout20EventCard />
      <TotalBreakdown />
      <p className="font-['Averta:Regular',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#121212] text-[16px] text-center tracking-[0.32px] w-[min-content]">Order details emailed to jane@email.com</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute h-[293.648px] left-[107.84px] top-[48.48px] w-[175.171px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 175.171 293.648">
        <g id="Group 6924">
          <g id="Help">
            <path d={svgPaths.p3a5f7500} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p36af2e00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pd74a600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p28597e80} fill="var(--fill-0, #EBEBEB)" />
          </g>
          <g id="Help/FAQ Sell Tickets Where Are My Tickets? My Account Contact Us Accessible Tickets Gift Cards">
            <path d={svgPaths.p3b5e0f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p28755f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p8b97f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2fdc8580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1413e000} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd2ad500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3e690780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p8c9ca00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29363d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2902780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p8b0e980} fill="var(--fill-0, white)" />
            <path d={svgPaths.pc032300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2ca24500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p219d0e80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p23921880} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1fbf7b92} fill="var(--fill-0, white)" />
            <path d={svgPaths.p31717000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3768dd00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a561100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p163e3f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3fdf8800} fill="var(--fill-0, white)" />
            <path d={svgPaths.pee66d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p361a1a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd0d4640} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26921680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3e524f80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2f754b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd1c300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p363300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3bc6b400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3fcc7d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1887ec00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2e0d9f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p11e54430} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2f90d700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p33fd64f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p22430890} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2118000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p8278800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p16979180} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3021f600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p366d8800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2e8dbf40} fill="var(--fill-0, white)" />
            <path d={svgPaths.p25d47400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p234bfc00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1fc8780} fill="var(--fill-0, white)" />
            <path d={svgPaths.pb9477f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.paff4680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p560580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2812e300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p16245800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p4c9e200} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1031a080} fill="var(--fill-0, white)" />
            <path d={svgPaths.p16ac9b80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3d0fe80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p372a23c0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1ac96ec0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p17a7800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2602f080} fill="var(--fill-0, white)" />
            <path d={svgPaths.p25c0c100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3a1775c0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p338b7800} fill="var(--fill-0, white)" />
            <path d={svgPaths.pc8a1580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p5b493f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p31ebcb00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pcbb9000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1229d080} fill="var(--fill-0, white)" />
            <path d={svgPaths.pfdb3300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2b2e8400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p9ef3680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19f79d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3342f180} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1a1d700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p30516a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p13698b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pf21a100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3e4fee00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2fd10300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2c758470} fill="var(--fill-0, white)" />
            <path d={svgPaths.pea50100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p303730c0} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute h-[133.744px] left-[127.55px] top-[388.38px] w-[134.58px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134.58 133.744">
        <g id="Group 6927">
          <g id="Corporate">
            <path d={svgPaths.p15844500} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p89bce30} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2356ed40} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p31920c80} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p268e7900} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p6524600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2bf44c00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p29c7e600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p5a69580} fill="var(--fill-0, #EBEBEB)" />
          </g>
          <g id="Who We Are Across The Globe Careers">
            <path d={svgPaths.p3fa45100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29e8bd80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p32993280} fill="var(--fill-0, white)" />
            <path d={svgPaths.pbc17600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p30504500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p14507ac0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p37b4f780} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd012980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p27ac0c00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p10a54580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1c5ff780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p17933a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p20da36f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1de61d80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p9ac3700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1d05500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1219c900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p38745000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p23d49b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3424bf80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1f66a480} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1d186700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a430400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p212cc5c0} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd6b7280} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3eaf5900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3581bb00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1d5292c0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3a489000} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute h-[277.5px] left-0 top-[906.5px] w-[390px]">
      <div className="absolute inset-[-0.36%_-0.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 392 279.5">
          <g id="Group 6919">
            <path d={svgPaths.p14b34200} id="Rectangle 6280" stroke="var(--stroke-0, #646464)" />
            <g id="Purchase | PolicyPrivacy | PolicyModern | Slavery Statement (PDF) | Gender Pay Gap Report | Cookies | Manage my cookies">
              <path d={svgPaths.p328f6e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p7d03900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p814ed00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p9cfe040} fill="var(--fill-0, white)" />
              <path d={svgPaths.p518c300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2aa1ef20} fill="var(--fill-0, white)" />
              <path d={svgPaths.p229a2a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1a70da00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1db0c600} fill="var(--fill-0, white)" />
              <path d={svgPaths.p159ac880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3efc080} fill="var(--fill-0, white)" />
              <path d={svgPaths.p272f9f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p11ba780} fill="var(--fill-0, white)" />
              <path d={svgPaths.p7e9ea80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p25505800} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2cec6300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3f62b70} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3a9a6f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2a354000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p35948780} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1cf0d000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2a298530} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1a258a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p418fd80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p211ee6f0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3767b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15537300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p17bf3580} fill="var(--fill-0, white)" />
              <path d={svgPaths.p232ab280} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2d088500} fill="var(--fill-0, white)" />
              <path d={svgPaths.pffa7700} fill="var(--fill-0, white)" />
              <path d={svgPaths.p150bb700} fill="var(--fill-0, white)" />
              <path d={svgPaths.p36443600} fill="var(--fill-0, white)" />
              <path d={svgPaths.p4ff3c00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pc761900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3171280} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1a2e0f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pe121f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2327cd00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p34c5e500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p17ea2b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p4a2da80} fill="var(--fill-0, white)" />
              <path d={svgPaths.pedc200} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1b787d00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1a842f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p116a5300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3fef1bf0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3c3ca100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p35ca200} fill="var(--fill-0, white)" />
              <path d={svgPaths.p26b33c00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2efefdc0} fill="var(--fill-0, white)" />
              <path d={svgPaths.pcac3400} fill="var(--fill-0, white)" />
              <path d={svgPaths.p15660400} fill="var(--fill-0, white)" />
              <path d={svgPaths.pdb50a80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2c4a6a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.pe6d9b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p19aeb900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p23ad0900} fill="var(--fill-0, white)" />
              <path d={svgPaths.pa3c3380} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3717f500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2c63d180} fill="var(--fill-0, white)" />
              <path d={svgPaths.p26c04700} fill="var(--fill-0, white)" />
              <path d={svgPaths.p836ae00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p97f900} fill="var(--fill-0, white)" />
              <path d={svgPaths.p260e2de0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p7d7a870} fill="var(--fill-0, white)" />
              <path d={svgPaths.p39ab6900} fill="var(--fill-0, white)" />
              <path d={svgPaths.pae0e380} fill="var(--fill-0, white)" />
              <path d={svgPaths.p7f5d100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1bac4e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2eafa040} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3dafb780} fill="var(--fill-0, white)" />
              <path d={svgPaths.p17ccc880} fill="var(--fill-0, white)" />
              <path d={svgPaths.p39340e00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p29c0dc80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3b005970} fill="var(--fill-0, white)" />
              <path d={svgPaths.p3df7a200} fill="var(--fill-0, white)" />
              <path d={svgPaths.p13350b00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1605b840} fill="var(--fill-0, white)" />
              <path d={svgPaths.p118c380} fill="var(--fill-0, white)" />
              <path d={svgPaths.p129b4300} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1f7cd00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p26a25d80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p162fa500} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2c5ecd00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p619bb00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p12f822f0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2f6c71f0} fill="var(--fill-0, white)" />
              <path d={svgPaths.p19e15000} fill="var(--fill-0, white)" />
              <path d={svgPaths.p216f9100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1cf27100} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2ca92a00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p190c6a80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p29399f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2637ee80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p349bb800} fill="var(--fill-0, white)" />
              <path d={svgPaths.p2891aa00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1c4de200} fill="var(--fill-0, white)" />
              <path d={svgPaths.p17d8f480} fill="var(--fill-0, white)" />
              <path d={svgPaths.p10dd9400} fill="var(--fill-0, white)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[0.16%_0.03%_0.31%_0.73%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126.043 39.813">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p1ef46300} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p1cb93280} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.pe2e3800} fill="var(--fill-0, white)" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p24617000} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.pd4b7000} fill="var(--fill-0, white)" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p32f8c880} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_5" />
          <path d={svgPaths.p1b505080} fill="var(--fill-0, white)" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p396c4500} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_7" />
          <path d={svgPaths.pe53ef00} fill="var(--fill-0, white)" id="Vector_8" />
          <path clipRule="evenodd" d={svgPaths.p91a8b80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_9" />
          <path d={svgPaths.p37e4b880} fill="var(--fill-0, white)" id="Vector_10" />
          <path clipRule="evenodd" d={svgPaths.p17efca80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_11" />
          <path d={svgPaths.p1621100} fill="var(--fill-0, white)" id="Vector_12" />
          <path clipRule="evenodd" d={svgPaths.p220a670} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_13" />
          <path d={svgPaths.p31277880} fill="var(--fill-0, white)" id="Vector_14" />
          <path clipRule="evenodd" d={svgPaths.p27346800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_15" />
          <path clipRule="evenodd" d={svgPaths.pe44a380} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_16" />
          <path d={svgPaths.p22f4bb80} fill="var(--fill-0, white)" id="Vector_17" />
          <path clipRule="evenodd" d={svgPaths.p2b0ae00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_18" />
          <path d={svgPaths.pe7d43c0} fill="var(--fill-0, black)" id="Vector_19" />
          <path clipRule="evenodd" d={svgPaths.p35e92100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_20" />
          <path clipRule="evenodd" d={svgPaths.p2f3d5200} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_21" />
          <path d={svgPaths.p3944e00} fill="var(--fill-0, black)" id="Vector_22" />
          <path clipRule="evenodd" d={svgPaths.p1c0a340} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_23" />
          <path d={svgPaths.p1e99500} fill="var(--fill-0, black)" id="Vector_24" />
          <path clipRule="evenodd" d={svgPaths.p2bf71000} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_25" />
          <path clipRule="evenodd" d={svgPaths.p3c19e9f0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_26" />
        </g>
      </svg>
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute h-[40px] left-[calc(100%-146px)] overflow-clip top-[921px] w-[127px]" data-name="image (3) 1">
      <Group12 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-0 top-[906.5px]">
      <Group16 />
      <div className="absolute h-[13.16px] left-[24.63px] top-[1109.7px] w-[300.026px]" data-name="© 1999-2022 Ticketmaster. All rights reserved.">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300.026 13.16">
          <g id="Â© 1999-2022 Ticketmaster. All rights reserved.">
            <path d={svgPaths.p22de2600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p33b3dd80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p11288800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a887780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1742b900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p7aa0880} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3346b500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19647080} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3bf9e1f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2e179af0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p501e240} fill="var(--fill-0, white)" />
            <path d={svgPaths.p321ce000} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3c388c00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2ee18180} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1258e600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p15480d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p4a8cd80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2cf9a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p504be00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26ec8400} fill="var(--fill-0, white)" />
            <path d={svgPaths.p28bb5b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p325d9300} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3b00fc00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19a1f880} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1ccf3200} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1fc35a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p4211600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19bf4580} fill="var(--fill-0, white)" />
            <path d={svgPaths.pc93a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pcb91b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1a833a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.pbd26280} fill="var(--fill-0, white)" />
            <path d={svgPaths.p212e5e00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1ca8a580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p138ec600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p5d89200} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2c053b00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3dc2a9f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p26367780} fill="var(--fill-0, white)" />
            <path d={svgPaths.p15577e00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p248ed900} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
      <Image4 />
      <div className="absolute h-[31px] left-[24px] top-[930px] w-[160px]" data-name="Ticketmaster">
        <div className="absolute inset-[8.33%_0.78%_16.67%_0]" data-name="ticketmaster">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 158.76 23.25">
            <path clipRule="evenodd" d={svgPaths.p4046e00} fill="var(--fill-0, white)" fillRule="evenodd" id="ticketmaster" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[25.7px] left-[calc(50%-44.49px)] top-1/2 w-[23.071px]" data-name="Logo">
      <div className="absolute inset-[-1.47%_0_-1.47%_-2.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.571 26.4546">
          <g id="Logo">
            <path clipRule="evenodd" d={svgPaths.p26897c00} fill="var(--fill-0, white)" fillRule="evenodd" id="Blue" stroke="var(--stroke-0, black)" />
            <g id="Yellow">
              <mask height="10" id="mask0_1_1806" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="11" x="13" y="8">
                <g id="mask 2">
                  <path d={svgPaths.p36c25b00} fill="var(--fill-0, white)" id="Vector" />
                </g>
              </mask>
              <g mask="url(#mask0_1_1806)">
                <path clipRule="evenodd" d={svgPaths.p36c25b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 7" stroke="var(--stroke-0, black)" />
              </g>
            </g>
            <g id="Red">
              <mask height="14" id="mask1_1_1806" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="0" y="13">
                <g id="mask 5">
                  <path d={svgPaths.p14528800} fill="var(--fill-0, white)" id="Vector_2" />
                </g>
              </mask>
              <g mask="url(#mask1_1_1806)">
                <path clipRule="evenodd" d={svgPaths.p14528800} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 10" stroke="var(--stroke-0, black)" />
              </g>
            </g>
            <g id="Green">
              <mask height="14" id="mask2_1_1806" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="0" y="0">
                <g id="mask 8">
                  <path d={svgPaths.p39cc6700} fill="var(--fill-0, white)" id="Vector_3" />
                </g>
              </mask>
              <g mask="url(#mask2_1_1806)">
                <path clipRule="evenodd" d={svgPaths.p39cc6700} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 13" stroke="var(--stroke-0, black)" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Texto() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.515px] left-[calc(50%+15.39px)] top-[calc(50%+1.27px)] w-[84.776px]" data-name="Texto">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84.776 27.5153">
        <g id="Texto">
          <path clipRule="evenodd" d={svgPaths.p2627ec00} fill="var(--fill-0, #FFFFFE)" fillRule="evenodd" id="Google Play" />
          <g id="get it on">
            <path d={svgPaths.p217ca600} fill="var(--fill-0, white)" />
            <path d={svgPaths.p37ada800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2d6b4a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2c0a0380} fill="var(--fill-0, white)" />
            <path d={svgPaths.pd8a3a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2d5944b0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3de71700} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[21.776px] left-[calc(50%-45.17px)] top-[calc(50%-0.11px)] w-[17.717px]" data-name="Logo">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7166 21.776">
        <g id="Logo">
          <path clipRule="evenodd" d={svgPaths.p350ab490} fill="var(--fill-0, white)" fillRule="evenodd" id="Path" />
          <path clipRule="evenodd" d={svgPaths.p3b6de232} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[26.046px] left-[calc(50%+12.53px)] top-[calc(50%+1.1px)] w-[75.061px]" data-name="Text">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.0606 26.0462">
        <g id="Text">
          <g id="Download on the">
            <path d={svgPaths.p2a54a5f0} fill="var(--fill-0, white)" />
            <path d={svgPaths.p271d1a80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p20adbe80} fill="var(--fill-0, white)" />
            <path d={svgPaths.p29ad0100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p399c9d00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2315ac00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p14159c00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3ddca700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2bcf7a00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p8682580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2228b800} fill="var(--fill-0, white)" />
            <path d={svgPaths.p222f9500} fill="var(--fill-0, white)" />
            <path d={svgPaths.p24998880} fill="var(--fill-0, white)" />
          </g>
          <path d={svgPaths.pc0fa480} fill="var(--fill-0, white)" id="App Store" />
        </g>
      </svg>
    </div>
  );
}

function Page() {
  return (
    <div className="absolute contents inset-0" data-name="Page-1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="iconmonstr-instagram-11">
          <path d={svgPaths.p5da6800} fill="var(--fill-0, #EEEFF3)" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Instagram() {
  return (
    <div className="absolute left-[48px] overflow-clip size-[32px] top-[604px]" data-name="instagram 1">
      <Page />
    </div>
  );
}

function IconmonstrTwitter() {
  return (
    <div className="absolute left-[104px] size-[32px] top-[604px]" data-name="iconmonstr-twitter-1 (1)">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_1791)" id="iconmonstr-twitter-1 (1)">
          <path d={svgPaths.p16bf3800} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1791">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconmonstrYoutube() {
  return (
    <div className="absolute left-[160px] size-[32px] top-[604px]" data-name="iconmonstr-youtube-6">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_2330)" id="iconmonstr-youtube-6">
          <path d={svgPaths.p36bc99f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_2330">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function IconmonstrFacebook() {
  return (
    <div className="absolute left-[calc(100%-174px)] size-[32px] top-[604px]" data-name="iconmonstr-facebook-6">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_1788)" id="iconmonstr-facebook-6">
          <path d={svgPaths.p1f1e8680} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1788">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute left-[calc(100%-118px)] size-[32px] top-[604px]" data-name="image (4) 2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_1785)" id="image (4) 2">
          <path clipRule="evenodd" d={svgPaths.p39abe940} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1785">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.615px]" data-name="image (2)">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.6154 16">
        <g id="image (2)">
          <path d={svgPaths.p7ce4200} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[6.25%_0.67%_4.96%_0.59%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 90.5739 14.2054">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p2259f380} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[91.733px]" data-name="image (1)">
      <Group13 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[0.23%_0.17%_0.63%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 81.1607 15.8624">
        <g id="Group">
          <path d={svgPaths.p14e5a280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Image6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-[81.297px]" data-name="image 59">
      <Group15 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-start left-[48px] top-[850px]">
      <Image2 />
      <Image3 />
      <Image6 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[48px] top-[568.38px]">
      <div className="absolute h-[8.712px] left-[126.32px] top-[688.38px] w-[138.594px]" data-name="Download our apps">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 138.594 8.712">
          <g id="Download our apps">
            <path d={svgPaths.p180be600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p14cd1c00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p24b97300} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p108852f0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p24822400} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1f618800} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pf340910} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p20496680} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pb79c600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p34558590} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p130be100} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1b026c80} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p83d0a00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p28418900} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p34b3b9c0} fill="var(--fill-0, #EBEBEB)" />
          </g>
        </svg>
      </div>
      <div className="absolute h-[8.712px] left-[150.09px] top-[568.38px] w-[92.503px]" data-name="Lets connect">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92.5029 8.712">
          <g id="Lets connect">
            <path d={svgPaths.p1a045d00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1f464fc0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p167ebf00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p70cbe00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pbeb2500} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2964d6c0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p370648b0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2940b000} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1000f480} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2f70600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pc8d10a0} fill="var(--fill-0, #EBEBEB)" />
          </g>
        </svg>
      </div>
      <div className="absolute h-[8.712px] left-[149.09px] top-[814.38px] w-[92.503px]" data-name="Lets connect">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 92.5029 8.712">
          <g id="Lets connect">
            <path d={svgPaths.p1a045d00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1f464fc0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p167ebf00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p70cbe00} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pbeb2500} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2964d6c0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p370648b0} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2940b000} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p1000f480} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.p2f70600} fill="var(--fill-0, #EBEBEB)" />
            <path d={svgPaths.pc8d10a0} fill="var(--fill-0, #EBEBEB)" />
          </g>
        </svg>
      </div>
      <div className="absolute bg-black border border-[#a6a6a6] border-solid h-[40px] left-[192px] overflow-clip rounded-[6px] top-[724px] w-[130px]" data-name="Google">
        <Logo />
        <Texto />
      </div>
      <div className="absolute bg-black border border-[#a6a6a6] border-solid h-[40px] left-[48px] overflow-clip rounded-[6px] top-[724px] w-[130px]" data-name="Apple">
        <Logo1 />
        <Text />
      </div>
      <Instagram />
      <IconmonstrTwitter />
      <IconmonstrYoutube />
      <IconmonstrFacebook />
      <Image5 />
      <Frame />
    </div>
  );
}

function NaConfirmationMobile() {
  return (
    <div className="bg-white h-[2494px] overflow-clip relative shrink-0 w-[393px]" data-name="NA Confirmation - Mobile">
      <Group14 />
      <CheckoutHeader />
      <NaMobileHeader />
      <Frame6 />
      <div className="absolute bg-[#121212] h-[1184px] left-0 overflow-clip top-[1401px] w-[393px]">
        <Group19 />
        <Group20 />
        <Group17 />
        <Group18 />
      </div>
    </div>
  );
}

export default function TicketmasterConfirmation() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Ticketmaster - Confirmation">
      <NaConfirmationMobile />
    </div>
  );
}
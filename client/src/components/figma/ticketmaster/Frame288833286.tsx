import svgPaths from "./svg-placement";
const imgImage = "/images/ticketmaster/dagne-dover-2.png";
import { imgFillWhite } from "./svg-placement-data";

function TopHeader() {
  return (
    <div className="-translate-x-1/2 absolute bg-black content-stretch flex gap-[8px] h-[79px] items-center left-1/2 pb-[16px] pl-[32px] pt-[24px] top-0 w-[393px]" data-name="Top Header">
      <div aria-hidden="true" className="absolute border-[#024ddf] border-solid border-t-8 inset-0 pointer-events-none" />
    </div>
  );
}

function FillWhite() {
  return (
    <div className="absolute inset-[-91.66%_-20.74%_-91.67%_-27.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[40.453px_26.239px] mask-size-[147.39px_19.678px]" data-name="Fill/White" style={{ maskImage: `url('${imgFillWhite}')` }}>
      <div className="absolute bg-white inset-0" data-name="Box" />
    </div>
  );
}

function LogoTicketmaster() {
  return (
    <div className="h-[26.239px] mb-[-4px] relative shrink-0 w-[147.593px]" data-name="Logo/ticketmaster">
      <div className="absolute inset-[8.33%_0.14%_16.67%_0]" data-name="ticketmaster">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147.39 19.6782">
          <path clipRule="evenodd" d={svgPaths.p122d9700} fill="var(--fill-0, white)" fillRule="evenodd" id="ticketmaster" />
        </svg>
      </div>
      <FillWhite />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col h-[59px] items-center justify-center pb-[4px] relative shrink-0 w-[217px]">
      <LogoTicketmaster />
      <p className="font-['Averta:Regular',sans-serif] leading-[21px] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">In partnership with Dagne Dover</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center px-[16px] py-[10px] relative w-full">
          <TopHeader />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="check">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
          <div className="absolute inset-[-10.23%_-7.03%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1667 8.83333">
              <path d={svgPaths.p1f4b7f10} id="Icon" stroke="var(--stroke-0, #024DDF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#024ddf] text-[12px] text-center whitespace-nowrap">Order Confirmed</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame10 />
      <div className="h-0 relative shrink-0 w-[20px]">
        <div className="absolute inset-[-0.5px_-2.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 1">
            <path d="M0.5 0.5H20.5" id="Line 1" stroke="var(--stroke-0, #024DDF)" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#024ddf] text-[12px] whitespace-nowrap">Special Offer</p>
      <div className="h-0 relative shrink-0 w-[20px]">
        <div className="absolute inset-[-0.5px_-2.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 1">
            <path d="M0.5 0.5H20.5" id="Line 2" stroke="var(--stroke-0, #CFCFCF)" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#a1a5a4] text-[12px] whitespace-nowrap">Order Summary</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-center not-italic relative shrink-0 text-center">
      <p className="font-['Averta_PE:Semibold',sans-serif] leading-[30px] relative shrink-0 text-[#1a1a1a] text-[20px] whitespace-nowrap">Travis, Your Order is Confirmed!</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#696863] text-[14px] w-[281px]">Before you go, check out this special offer just for you!</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative rounded-[4px] shrink-0 w-[361px]">
      <Frame8 />
      <div className="h-0 relative shrink-0 w-[360px]">
        <div className="absolute inset-[-0.5px_-0.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 1">
            <path d="M0.5 0.5H360.5" id="Line 1" stroke="var(--stroke-0, #CFCFCF)" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <Frame12 />
    </div>
  );
}

function PaginationDots() {
  return (
    <div className="col-1 h-[8px] ml-[170.5px] mt-[341px] relative row-1 w-[20px]" data-name="pagination dots">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
        <g id="pagination dots">
          <circle cx="4" cy="4" fill="var(--fill-0, #303030)" id="Ellipse 12" r="4" />
          <circle cx="17.5" cy="4" fill="var(--fill-0, #CACACA)" id="Ellipse 13" r="2.5" />
        </g>
      </svg>
    </div>
  );
}

function PrimaryImg() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="primary-img">
      <div className="bg-[rgba(255,255,255,0)] col-1 ml-0 mt-0 overflow-clip relative row-1 size-[361px]" data-name=".Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[120.05%] left-0 max-w-none top-[-19.94%] w-full" src={imgImage} />
        </div>
      </div>
      <PaginationDots />
    </div>
  );
}

function BrandProductTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="brand + product title">
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center relative shrink-0 text-[#5f5f5f] text-[14px] tracking-[0.064px] whitespace-nowrap">
        <p className="leading-[19.25px]">Dagne Dover</p>
      </div>
      <div className="flex flex-col font-['Averta:Semibold',sans-serif] justify-center min-w-full relative shrink-0 text-[#242424] text-[20px] w-[min-content]">
        <p className="leading-[26px]">Micah neoprene Crossbody</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <p className="font-['Averta:Semibold',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#078a09] text-[24px] whitespace-nowrap">$14.40</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Averta:Regular',sans-serif] leading-[36px] line-through not-italic relative shrink-0 text-[#646464] text-[24px] whitespace-nowrap">$18.00</p>
      <div className="bg-[#078a09] content-stretch flex h-[22px] items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name=".Badge">
        <div className="flex flex-col font-['Helvetica:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-center text-white tracking-[0.48px] uppercase whitespace-nowrap">
          <p className="font-['Averta:Semibold',sans-serif] text-[12px]">
            <span className="leading-[normal]">S</span>
            <span className="leading-[normal]">ave</span>
            <span className="leading-[normal]">{` 20% + FREE SHIPPING`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Cost1() {
  return (
    <div className="content-stretch flex flex-col h-[29px] items-start justify-center relative shrink-0" data-name=".Cost">
      <Frame1 />
    </div>
  );
}

function Cost() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name=".Cost">
      <Cost1 />
    </div>
  );
}

function ProductDetials() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-[361px]" data-name="product detials">
      <BrandProductTitle />
      <Cost />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col font-['Averta:Regular',sans-serif] gap-[8px] items-start not-italic relative shrink-0 text-[14px] tracking-[0.064px] w-full">
      <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[#242424] w-full">
        <p className="leading-[19.25px]">Product Details</p>
      </div>
      <div className="flex flex-col justify-center leading-[20px] relative shrink-0 text-[#646464] w-full">
        <p className="mb-0">Why you'll love it</p>
        <p className="mb-0">• Versatile day and night bag</p>
        <p>
          • Keep your phone, sunnies + more safe
          <br aria-hidden="true" />
          • Lightweight for daily adventures
        </p>
      </div>
    </div>
  );
}

function HeadingAndPrice() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Heading and price">
      <ProductDetials />
      <Frame4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-center leading-[1.3] not-italic relative shrink-0 text-[#242424] text-[14px] text-center whitespace-nowrap" data-name="Container">
      <p className="font-['Averta:Regular',sans-serif] relative shrink-0">Select color:</p>
      <p className="font-['Suisse_Intl:SemiBold',sans-serif] relative shrink-0">Storm</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[44px] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Frame6 />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="chevron-down">
            <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
              <div className="absolute inset-[-16.67%_-8.33%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 6.66667">
                  <path d={svgPaths.p1b1fa300} id="Icon" stroke="var(--stroke-0, #1A202C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSelect() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name=".Color Select">
      <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="error-state">
        <Button />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <ColorSelect />
    </div>
  );
}

function OfferDetails() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Offer Details">
      <HeadingAndPrice />
      <Frame3 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[3px] top-[5px]">
      <div className="absolute border border-black border-solid h-[13px] left-[3px] top-[5px] w-[18px]" />
      <div className="absolute bg-black h-[2px] left-[4px] top-[8px] w-[16px]" />
      <div className="absolute bg-black h-px left-[6px] top-[14px] w-[5px]" />
    </div>
  );
}

function CreditCard() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Credit Card">
      <Group />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[1.07px] relative shrink-0" data-name="Container">
      <CreditCard />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="flex-[1_0_0] h-[57px] leading-[0] min-h-px min-w-px not-italic relative text-black tracking-[0.064px]" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Averta_PE:Semibold',sans-serif] justify-center left-0 text-[14px] top-[10px] whitespace-nowrap">
        <p className="leading-[19.25px]">{`Billing & Shipping Details`}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Averta_PE:Regular',sans-serif] justify-center left-0 text-[0px] top-[40.5px] w-[333px]">
        <p className="text-[12px]">
          <span className="leading-[16.5px]">{`This item is sold and shipped by `}</span>
          <span className="font-['Averta_PE:Semibold',sans-serif] leading-[16.5px] not-italic tracking-[0.064px]">Dagne Dover</span>
          <span className="font-['Averta_PE:Regular',sans-serif] leading-[16.5px] not-italic tracking-[0.064px]">.</span>
          <span className="leading-[16.5px]">{` A separate charge will appear on your statement.`}</span>
        </p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Paragraph1 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative">
      <Frame13 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <Container5 />
      <Frame14 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
    </div>
  );
}

function Shipping() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name=".Shipping">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 1">
            <line id="Line 38" stroke="var(--stroke-0, #EAECF0)" x2="361" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Container3 />
    </div>
  );
}

function Template() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Template">
      <OfferDetails />
      <Shipping />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 361 1">
            <line id="Line 39" stroke="var(--stroke-0, #EAECF0)" x2="361" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <Template />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Averta_PE:Semibold',sans-serif] leading-[1.37] not-italic relative shrink-0 text-[16px] text-white whitespace-pre">{`Checkout  |  $24.00`}</p>
    </div>
  );
}

function TextPadding1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="font-['Averta:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#024ddf] text-[16px] whitespace-nowrap">Decline offer</p>
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Buttons/Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[18px] py-[12px] relative w-full">
          <TextPadding1 />
        </div>
      </div>
    </div>
  );
}

function Dismiss() {
  return (
    <div className="content-stretch flex flex-col h-[42px] items-center justify-center pb-[11px] px-[18px] pt-[10.5px] relative rounded-[4px] shrink-0 w-[361px]" data-name="Dismiss">
      <div aria-hidden="true" className="absolute border border-[#024ddf] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ButtonsButton />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <div className="bg-[#024ddf] content-stretch flex h-[42px] items-center justify-center overflow-clip px-[126.41px] py-[10px] relative rounded-[4px] shrink-0 w-[361px]" data-name="Add to Order Button">
        <TextPadding />
      </div>
      <Dismiss />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Averta_PE:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[12px] text-black text-center tracking-[0.064px] w-[min-content]">
        <p className="leading-[normal]">Don't worry, your card won't be charged yet.</p>
      </div>
      <Frame15 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[24px] px-[16px] relative shrink-0 w-[393px]" data-name="Container">
      <div className="content-stretch flex flex-col items-center overflow-clip relative shadow-[0px_3px_12px_0px_rgba(18,18,18,0.18)] shrink-0" data-name="Image placeholder">
        <PrimaryImg />
      </div>
      <Content />
      <Frame2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Frame9 />
      <Container />
    </div>
  );
}

export default function Frame11() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start relative size-full">
      <Frame />
      <Frame7 />
    </div>
  );
}

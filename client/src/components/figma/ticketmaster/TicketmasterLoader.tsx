import svgPaths from "./svg-loader";
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

function Frame2() {
  return (
    <div className="content-stretch flex flex-col h-[59px] items-center justify-center pb-[4px] relative shrink-0 w-[217px]">
      <LogoTicketmaster />
      <p className="font-['Averta:Regular',sans-serif] leading-[21px] min-w-full not-italic relative shrink-0 text-[12px] text-center text-white w-[min-content]">In partnership with Dagne Dover</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center px-[16px] py-[10px] relative shrink-0 w-[393px]">
      <TopHeader />
      <Frame2 />
    </div>
  );
}

function TopBar() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Top bar">
      <Frame />
    </div>
  );
}

function SuccessCheckSvg94Px() {
  return (
    <div className="relative shrink-0 size-[94px]" data-name="success-check-svg94px">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 94">
        <g id="success-check-svg94px">
          <g id="Ellipse 7" />
          <path d={svgPaths.p13e53780} fill="var(--fill-0, #024DDF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Averta:Semibold',sans-serif] leading-[26px] min-w-full relative shrink-0 text-[#242424] text-[20px] w-[min-content]">Thanks for your purchase!</p>
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#242424] text-[16px] w-[307px]">
        <p className="leading-[20.8px]">You'll receive an email confirmation from Dagne Dover shortly.</p>
      </div>
      <div className="flex flex-col font-['Averta:Regular',sans-serif] justify-center leading-[0] relative shrink-0 text-[#646464] text-[14px] w-[307px]">
        <p className="leading-[20.8px]">Redirecting you in 10...</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-[343px]">
      <SuccessCheckSvg94Px />
      <Frame1 />
    </div>
  );
}

export default function TicketmasterLoader() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[160px] items-center relative size-full" data-name="Ticketmaster - Shoppable Ad 3">
      <TopBar />
      <Frame3 />
    </div>
  );
}

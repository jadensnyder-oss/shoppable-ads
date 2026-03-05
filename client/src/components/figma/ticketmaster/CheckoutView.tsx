import { useCallback, type MouseEvent } from "react";
import TicketmasterCheckout from "./TicketmasterCheckout";

interface CheckoutViewProps {
  onPlaceOrder: () => void;
}

export default function CheckoutView({ onPlaceOrder }: CheckoutViewProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== e.currentTarget) {
        if (
          target.getAttribute("data-name") === "Button" &&
          target.classList.contains("bg-[#01a469]")
        ) {
          e.preventDefault();
          onPlaceOrder();
          return;
        }
        target = target.parentElement;
      }
    },
    [onPlaceOrder],
  );

  return (
    <div onClick={handleClick} className="checkout-view w-[393px] overflow-auto">
      <style>{`
        [data-name="Button"].bg-\\[\\#01a469\\] {
          cursor: pointer;
        }
        [data-name="Button"].bg-\\[\\#01a469\\]:hover {
          opacity: 0.9;
        }
      `}</style>
      <TicketmasterCheckout />
    </div>
  );
}

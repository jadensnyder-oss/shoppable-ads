import { useCallback, type MouseEvent } from "react";
import Frame11 from "./Frame288833286";

interface InterstitialViewProps {
  onCheckout: () => void;
  onDecline: () => void;
}

export default function InterstitialView({ onCheckout, onDecline }: InterstitialViewProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== e.currentTarget) {
        const name = target.getAttribute("data-name");
        if (name === "Add to Order Button") {
          e.preventDefault();
          onCheckout();
          return;
        }
        if (name === "Dismiss") {
          e.preventDefault();
          onDecline();
          return;
        }
        target = target.parentElement;
      }
    },
    [onCheckout, onDecline],
  );

  return (
    <div onClick={handleClick} className="interstitial-view w-[393px] overflow-auto">
      <style>{`
        [data-name="Add to Order Button"],
        [data-name="Dismiss"] {
          cursor: pointer;
        }
        [data-name="Add to Order Button"]:hover {
          opacity: 0.9;
        }
        [data-name="Dismiss"]:hover {
          opacity: 0.85;
        }
      `}</style>
      <Frame11 />
    </div>
  );
}

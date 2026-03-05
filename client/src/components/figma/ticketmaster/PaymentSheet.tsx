import { useCallback, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullBottomSheet from "./FullBottomSheet";

interface PaymentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PaymentSheet({ isOpen, onClose, onConfirm }: PaymentSheetProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== e.currentTarget) {
        const name = target.getAttribute("data-name");
        if (name === "Button/Primary-Add to order") {
          e.preventDefault();
          onConfirm();
          return;
        }
        target = target.parentElement;
      }
    },
    [onConfirm],
  );

  const handleCloseClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== e.currentTarget) {
        if (target.tagName === "circle" || target.closest("[data-name='Header'] > div:last-child")) {
          break;
        }
        target = target.parentElement;
      }
    },
    [],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-1/2 z-50 w-[393px]"
            style={{ x: "-50%" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={handleClick}
          >
            <style>{`
              [data-name="Button/Primary-Add to order"] {
                cursor: pointer;
              }
              [data-name="Button/Primary-Add to order"]:hover {
                opacity: 0.9;
              }
            `}</style>
            <div className="relative h-[640px]">
              <div
                className="absolute right-[16px] top-[17px] size-[40px] z-10 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
              />
              <FullBottomSheet />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

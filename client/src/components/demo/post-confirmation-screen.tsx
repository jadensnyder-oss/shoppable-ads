import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface PostConfirmationScreenProps {
  primaryColor?: string;
  partnerName: string;
  advertiserName?: string | null;
  addedToOrder?: boolean;
  loadingDuration?: number;
  countdownFrom?: number;
  onComplete: () => void;
}

export function PostConfirmationScreen({
  primaryColor = "#1a1a1a",
  partnerName,
  advertiserName,
  addedToOrder = false,
  loadingDuration = 3000,
  countdownFrom = 5,
  onComplete,
}: PostConfirmationScreenProps) {
  const [phase, setPhase] = useState<"loading" | "success">("loading");
  const [showCopy, setShowCopy] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(countdownFrom);

  const emailSource = useMemo(() => {
    if (addedToOrder && advertiserName) {
      return advertiserName;
    }

    return partnerName;
  }, [addedToOrder, advertiserName, partnerName]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhase("success");
    }, loadingDuration);

    return () => window.clearTimeout(timer);
  }, [loadingDuration]);

  useEffect(() => {
    if (phase !== "success") {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowCopy(true);
      setSecondsRemaining(countdownFrom);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [countdownFrom, phase]);

  useEffect(() => {
    if (!showCopy) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    const timer = window.setTimeout(() => {
      onComplete();
    }, countdownFrom * 1000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [countdownFrom, onComplete, showCopy]);

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-full max-w-[320px] flex-col items-center gap-10 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <motion.div
                key="spinner"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="h-20 w-20 rounded-full border-[6px] border-[#d8deea]"
                  style={{ borderTopColor: primaryColor }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="check"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ backgroundColor: primaryColor }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.25 }}
                  >
                    <Check className="h-10 w-10 text-white" strokeWidth={3} />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showCopy && (
            <motion.div
              className="flex w-full flex-col items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <h2
                className="text-[20px] leading-[1.3] text-[#242424]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Thank you for your purchase
              </h2>
              <p
                className="text-[16px] leading-[1.45] text-[#242424]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {`You'll receive a confirmation email from ${emailSource} shortly.`}
              </p>
              <p
                className="text-[14px] leading-[1.45] text-[#646464]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {`Redirecting you in ${secondsRemaining}...`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

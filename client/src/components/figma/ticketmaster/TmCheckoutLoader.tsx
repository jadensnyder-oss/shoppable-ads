import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TmCheckoutLoaderProps {
  onComplete: () => void;
  spinnerDuration?: number;
  successDuration?: number;
}

const TM_BLUE = "#024ddf";

function AnimatedSpinner() {
  return (
    <motion.svg
      width="92"
      height="92"
      viewBox="0 0 92 92"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46 4C22.804 4 4 22.804 4 46C4 69.196 22.804 88 46 88C47.1046 88 48 88.8954 48 90C48 91.1046 47.1046 92 46 92C20.5949 92 0 71.4051 0 46C0 20.5949 20.5949 0 46 0C52.7007 0 59.0719 1.43399 64.819 4.01373C65.8267 4.46607 66.2769 5.64966 65.8246 6.65737C65.3723 7.66507 64.1887 8.11528 63.181 7.66295C57.9389 5.3099 52.1251 4 46 4Z"
        fill="#904EBA"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.8272 16.1867C35.2763 17.1958 34.8224 18.378 33.8133 18.8272C23.3138 23.5007 16 34.023 16 46.2491C16 62.8177 29.4315 76.2491 46 76.2491C55.473 76.2491 63.9198 71.8607 69.421 64.9982C70.1119 64.1364 71.3706 63.9978 72.2324 64.6886C73.0943 65.3795 73.2329 66.6382 72.542 67.5001C66.3142 75.2689 56.738 80.2491 46 80.2491C27.2223 80.2491 12 65.0268 12 46.2491C12 32.3863 20.2964 20.4655 32.1867 15.1728C33.1958 14.7237 34.378 15.1776 34.8272 16.1867Z"
        fill="#14A1A3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.9293 27.1261C53.412 26.1325 54.6087 25.7184 55.6022 26.201C62.937 29.7643 68 37.289 68 46C68 58.1503 58.1503 68 46 68C44.8954 68 44 67.1046 44 66C44 64.8954 44.8954 64 46 64C55.9411 64 64 55.9411 64 46C64 38.8782 59.8642 32.7186 53.8543 29.799C52.8608 29.3163 52.4466 28.1196 52.9293 27.1261Z"
        fill={TM_BLUE}
      />
    </motion.svg>
  );
}

function TicketCheckIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {/* Rotated ticket body */}
      <g transform="translate(60,52) rotate(45)">
        <path
          d="M-28,-28 L28,-28 L28,-8 C22,-8 18,-4 18,2 C18,8 22,12 28,12 L28,28 L-28,28 L-28,12 C-22,12 -18,8 -18,2 C-18,-4 -22,-8 -28,-8 Z"
          fill={TM_BLUE}
        />
        {/* Ticket detail lines */}
        <line x1="-12" y1="-12" x2="12" y2="-12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="-8" y1="-4" x2="8" y2="-4" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="-12" y1="4" x2="12" y2="4" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      </g>
      {/* Check badge circle */}
      <circle cx="76" cy="76" r="18" fill="#1a1a1a" />
      <path
        d="M68 76L74 82L85 71"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default function TmCheckoutLoader({
  onComplete,
  spinnerDuration = 2500,
  successDuration = 2000,
}: TmCheckoutLoaderProps) {
  const [phase, setPhase] = useState<"spinner" | "success">("spinner");

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase("success"), spinnerDuration);
    return () => window.clearTimeout(timer);
  }, [spinnerDuration]);

  useEffect(() => {
    if (phase !== "success") return;
    const timer = window.setTimeout(onComplete, successDuration);
    return () => window.clearTimeout(timer);
  }, [phase, successDuration, onComplete]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <div
        className="flex w-full max-w-[340px] flex-col items-center text-center"
        style={{ marginTop: "32vh" }}
      >
        <div className="relative flex h-[120px] w-[120px] items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "spinner" ? (
              <motion.div
                key="spinner"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <AnimatedSpinner />
              </motion.div>
            ) : (
              <motion.div
                key="ticket"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <TicketCheckIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {phase === "success" && (
            <motion.div
              className="flex w-full flex-col items-center gap-2 mt-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <h2
                className="text-[20px] leading-[1.3] text-[#1a1a1a]"
                style={{ fontFamily: "'Averta', 'Inter', sans-serif", fontWeight: 700 }}
              >
                Success! Your tickets are confirmed.
              </h2>
              <p
                className="text-[16px] leading-[1.45] text-[#696863]"
                style={{ fontFamily: "'Averta', 'Inter', sans-serif" }}
              >
                Wrapping up your confirmation and a quick bonus...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TmCheckoutLoaderProps {
  onComplete: () => void;
  spinnerDuration?: number;
  successDuration?: number;
}

const TM_BLUE = "#024ddf";

export function AnimatedSpinner() {
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
    <svg width="92" height="92" viewBox="0 0 92 92" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.5949 56.3482L56.3463 37.5986L59.7301 40.9823L40.9786 59.7319L37.5949 56.3482ZM32.2699 51.0214L51.0195 32.2699L54.4033 35.6537L35.6537 54.4051L32.2699 51.0214ZM51.0195 25.1638L25.162 51.0214L40.9805 66.838L45.7534 62.065C46.4729 58.0281 48.4104 54.2929 51.3599 51.347C54.3039 48.4086 58.0336 46.4747 62.0632 45.7553L66.838 40.9823L51.0195 25.1638ZM62.0687 68.1076L70.4775 57.9306L74.4059 61.1818L62.7974 75.2284L56.4328 70.1114L59.6252 66.1425L62.0687 68.1076ZM53.5256 53.5348C46.8777 60.1827 46.8924 71.0553 53.5366 77.6977C60.1754 84.3382 71.0626 84.3401 77.7014 77.6977C84.3382 71.0608 84.3474 60.1588 77.6977 53.5293C71.0516 46.8906 60.1606 46.8777 53.5256 53.5348ZM53.912 0L0 53.9138L16.1147 70.0267L17.9179 68.2235C19.5298 66.6135 22.1646 66.6117 23.7765 68.2217C25.3883 69.8335 25.3883 72.4702 23.7765 74.0821L21.9733 75.8853L38.0862 92L50.795 79.2893C48.1013 76.3692 46.3404 72.7573 45.7056 68.8786L40.9805 73.6037L18.3945 51.0214L51.0177 18.3982L73.6037 40.9805L68.8786 45.7074C72.7573 46.3422 76.371 48.1013 79.2893 50.7987L92 38.088L75.8853 21.9751L74.0821 23.7783C72.4721 25.3902 69.8354 25.3902 68.2217 23.7783C66.6098 22.1665 66.6098 19.5298 68.2217 17.9198L70.0249 16.1166L53.912 0Z"
        fill="#024DDF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.0222 68.1076L70.431 57.9306L74.3594 61.1818L62.7508 75.2284L56.3862 70.1114L59.5786 66.1425L62.0222 68.1076ZM53.479 53.5348C46.8311 60.1827 46.8458 71.0553 53.4901 77.6977C60.1288 84.3382 71.0161 84.3401 77.6548 77.6977C84.2917 71.0608 84.3009 60.1588 77.6511 53.5293C71.005 46.8906 60.1141 46.8777 53.479 53.5348Z"
        fill="#121212"
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
                Preparing a special offer for you...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

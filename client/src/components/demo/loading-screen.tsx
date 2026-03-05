import { useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
  primaryColor?: string;
  duration?: number;
  onComplete: () => void;
}

export function LoadingScreen({
  message = "Processing...",
  primaryColor = "#1a1a1a",
  duration = 1800,
  onComplete,
}: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-6"
      style={{ backgroundColor: "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent"
          style={{ borderColor: `${primaryColor}30`, borderTopColor: primaryColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p
        className="text-[16px] text-center max-w-[280px] leading-[1.4]"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          color: "#242424",
        }}
      >
        {message}
      </p>
    </motion.div>
  );
}

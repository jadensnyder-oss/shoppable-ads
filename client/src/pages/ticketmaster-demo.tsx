import { useState, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/demo/loading-screen";
import InterstitialView from "@/components/figma/ticketmaster/InterstitialView";
import PaymentSheet from "@/components/figma/ticketmaster/PaymentSheet";
import TicketmasterConfirmation from "@/components/figma/ticketmaster/TicketmasterConfirmation";
import TicketmasterLoader from "@/components/figma/ticketmaster/TicketmasterLoader";
import "@/components/figma/ticketmaster/fonts.css";

type DemoStep =
  | "confirmation"
  | "loading"
  | "interstitial"
  | "confirmLoading"
  | "finalConfirmation";

const dissolve = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const funPopIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
};

const TM_BLUE = "#024ddf";

function ConfirmLoadingStep({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="confirmLoading"
      className="absolute inset-0"
      {...dissolve}
    >
      <TicketmasterLoader />
    </motion.div>
  );
}

export default function TicketmasterDemo() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState<DemoStep>("confirmation");
  const [addedToOrder, setAddedToOrder] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const resetDemo = useCallback(() => {
    setCurrentStep("confirmation");
    setAddedToOrder(false);
    setShowBottomSheet(false);
  }, []);

  const handleContinueFromConfirmation = useCallback(() => {
    setCurrentStep("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setCurrentStep("interstitial");
  }, []);

  const handleCheckout = useCallback(() => {
    setShowBottomSheet(true);
  }, []);

  const handleConfirmOrder = useCallback(() => {
    setShowBottomSheet(false);
    setAddedToOrder(true);
    setCurrentStep("confirmLoading");
  }, []);

  const handleDecline = useCallback(() => {
    setAddedToOrder(false);
    setCurrentStep("finalConfirmation");
  }, []);

  const handleConfirmLoadingComplete = useCallback(() => {
    setCurrentStep("finalConfirmation");
  }, []);

  const stepLabel = (() => {
    switch (currentStep) {
      case "confirmation": return "Order Confirmation";
      case "loading": return "Loading...";
      case "interstitial": return "Special Offer";
      case "confirmLoading": return "Processing...";
      case "finalConfirmation": return "Order Summary";
    }
  })();

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center">
      <div className="w-full max-w-[800px] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={resetDemo}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset Demo
          </Button>
        </div>
        <div className="text-white/50 text-xs">
          Ticketmaster • {stepLabel}
        </div>
      </div>

      <div
        className="w-full max-w-[393px] bg-white relative overflow-hidden"
        style={{
          minHeight: "calc(100vh - 52px)",
          maxHeight: "calc(100vh - 52px)",
        }}
      >
        <AnimatePresence mode="wait">
          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              className="absolute inset-0 overflow-auto"
              {...dissolve}
            >
              <TicketmasterConfirmation />
              <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/0">
                <button
                  onClick={handleContinueFromConfirmation}
                  className="w-full py-3 rounded-[4px] text-white font-semibold text-[16px] tracking-[0.32px]"
                  style={{
                    backgroundColor: TM_BLUE,
                    fontFamily: "'Averta:Semibold', sans-serif",
                  }}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === "loading" && (
            <motion.div
              key="loading"
              className="absolute inset-0"
              {...funPopIn}
            >
              <LoadingScreen
                message="Processing your order..."
                primaryColor={TM_BLUE}
                onComplete={handleLoadingComplete}
              />
            </motion.div>
          )}

          {currentStep === "interstitial" && (
            <motion.div
              key="interstitial"
              className="absolute inset-0 overflow-auto"
              {...dissolve}
            >
              <InterstitialView
                onCheckout={handleCheckout}
                onDecline={handleDecline}
              />
            </motion.div>
          )}

          {currentStep === "confirmLoading" && (
            <ConfirmLoadingStep
              onComplete={handleConfirmLoadingComplete}
            />
          )}

          {currentStep === "finalConfirmation" && (
            <motion.div
              key="finalConfirmation"
              className="absolute inset-0 overflow-auto"
              {...dissolve}
            >
              <TicketmasterConfirmation />
              {addedToOrder && (
                <div className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/0">
                  <div
                    className="w-full py-3 px-4 rounded-[4px] text-center text-white font-semibold text-[14px]"
                    style={{
                      backgroundColor: "#01a469",
                      fontFamily: "'Averta:Semibold', sans-serif",
                    }}
                  >
                    Dagne Dover Micah Crossbody added to your order
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep === "interstitial" && (
          <PaymentSheet
            isOpen={showBottomSheet}
            onClose={() => setShowBottomSheet(false)}
            onConfirm={handleConfirmOrder}
          />
        )}
      </div>
    </div>
  );
}

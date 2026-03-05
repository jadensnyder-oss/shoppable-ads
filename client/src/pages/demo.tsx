import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlacementHeader } from "@/components/placement/header";
import { ProductBlock } from "@/components/placement/product-block";
import { BottomSheet } from "@/components/placement/bottom-sheet";
import { PartnerFrame } from "@/components/demo/partner-frame";
import { LoadingScreen } from "@/components/demo/loading-screen";
import type { PartnerConfig } from "@shared/schema";
import { apiFetch } from "@/lib/utils";

type DemoStep =
  | "checkout"
  | "loading"
  | "interstitial"
  | "confirmLoading"
  | "confirmation";

const stepTransition = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3 },
};

export default function Demo() {
  const searchString = useSearch();
  const [, navigate] = useLocation();

  const partnerId = useMemo(() => {
    const params = new URLSearchParams(searchString);
    return params.get("partner") || "";
  }, [searchString]);

  const { data: config, isLoading } = useQuery<PartnerConfig>({
    queryKey: ["partner", partnerId],
    queryFn: () => apiFetch(`/api/partners/${partnerId}`),
    enabled: !!partnerId,
  });

  const [currentStep, setCurrentStep] = useState<DemoStep>("checkout");
  const [addedToOrder, setAddedToOrder] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const resetDemo = useCallback(() => {
    setCurrentStep("checkout");
    setAddedToOrder(false);
    setShowBottomSheet(false);
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setCurrentStep("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setCurrentStep("interstitial");
  }, []);

  const handleAddToOrder = useCallback(() => {
    setShowBottomSheet(true);
  }, []);

  const handleConfirmOrder = useCallback(() => {
    setShowBottomSheet(false);
    setAddedToOrder(true);
    setCurrentStep("confirmLoading");
  }, []);

  const handleDecline = useCallback(() => {
    setAddedToOrder(false);
    setCurrentStep("confirmLoading");
  }, []);

  const handleConfirmLoadingComplete = useCallback(() => {
    setCurrentStep("confirmation");
  }, []);

  const handleIframeMessage = useCallback(
    (action: string) => {
      switch (action) {
        case "PLACE_ORDER":
          handlePlaceOrder();
          break;
        case "RESTART_DEMO":
          resetDemo();
          break;
        case "CANCEL_ORDER":
          handleDecline();
          break;
      }
    },
    [handlePlaceOrder, resetDemo, handleDecline]
  );

  if (!partnerId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">No partner selected</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Go back to the home page and select a partner.
          </p>
          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center">
      {/* Desktop nav — outside mobile viewport */}
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
          {config.partner.name}
          {" • "}
          {currentStep === "checkout" && "Checkout"}
          {currentStep === "loading" && "Loading..."}
          {currentStep === "interstitial" && "Shoppable Ad"}
          {currentStep === "confirmLoading" && "Processing..."}
          {currentStep === "confirmation" && "Confirmation"}
        </div>
      </div>

      {/* Mobile viewport container */}
      <div
        className="w-full max-w-[393px] bg-white relative overflow-hidden"
        style={{
          minHeight: "calc(100vh - 52px)",
          maxHeight: "calc(100vh - 52px)",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Checkout */}
          {currentStep === "checkout" && (
            <motion.div
              key="checkout"
              className="absolute inset-0 overflow-auto"
              {...stepTransition}
            >
              {config.partner.checkoutHtml ? (
                <PartnerFrame
                  html={config.partner.checkoutHtml}
                  config={config}
                  pageType="checkout"
                  onMessage={handleIframeMessage}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    No checkout HTML uploaded for {config.partner.name}.
                  </p>
                  <Button onClick={handlePlaceOrder}>
                    Simulate Place Order
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Loading */}
          {currentStep === "loading" && (
            <motion.div
              key="loading"
              className="absolute inset-0"
              {...stepTransition}
            >
              <LoadingScreen
                message="Processing your order..."
                primaryColor={config.partner.primaryColor}
                onComplete={handleLoadingComplete}
              />
            </motion.div>
          )}

          {/* Step 3: Shoppable Ad Interstitial */}
          {currentStep === "interstitial" && (
            <motion.div
              key="interstitial"
              className="absolute inset-0 overflow-auto"
              {...stepTransition}
            >
              <PlacementHeader config={config} />
              <ProductBlock
                config={config}
                onAddToOrder={handleAddToOrder}
                onDecline={handleDecline}
              />
            </motion.div>
          )}

          {/* Step 4: Confirm Loading */}
          {currentStep === "confirmLoading" && (
            <motion.div
              key="confirmLoading"
              className="absolute inset-0"
              {...stepTransition}
            >
              <LoadingScreen
                message={
                  addedToOrder
                    ? "Thank you for your added purchase — taking you to your confirmation page"
                    : "Taking you to your confirmation page..."
                }
                primaryColor={config.partner.primaryColor}
                duration={2200}
                onComplete={handleConfirmLoadingComplete}
              />
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              className="absolute inset-0 overflow-auto"
              {...stepTransition}
            >
              {config.partner.confirmationHtml ? (
                <PartnerFrame
                  html={config.partner.confirmationHtml}
                  config={config}
                  pageType="confirmation"
                  onMessage={handleIframeMessage}
                  addedToOrder={addedToOrder}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold mb-1">
                    Order Confirmed
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    No confirmation HTML uploaded for{" "}
                    {config.partner.name}.
                  </p>
                  {addedToOrder && (
                    <p className="text-sm text-green-600 font-medium">
                      + {config.advertiser.productTitle} added to order
                    </p>
                  )}
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={resetDemo}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restart Demo
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Sheet Overlay */}
        {currentStep === "interstitial" && (
          <BottomSheet
            config={config}
            isOpen={showBottomSheet}
            onClose={() => setShowBottomSheet(false)}
            onConfirm={handleConfirmOrder}
          />
        )}
      </div>
    </div>
  );
}

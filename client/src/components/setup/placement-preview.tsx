import type { PartnerConfig } from "@shared/schema";
import { PlacementHeader } from "@/components/placement/header";
import { ProductBlock } from "@/components/placement/product-block";

interface PlacementPreviewProps {
  config: PartnerConfig;
}

export function PlacementPreview({ config }: PlacementPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Placement Preview</h3>
        <span className="text-xs text-muted-foreground">393px mobile viewport</span>
      </div>

      <div
        className="mx-auto rounded-xl overflow-hidden shadow-lg border"
        style={{ width: 393, maxWidth: "100%" }}
      >
        <PlacementHeader config={config} />
        <ProductBlock
          config={config}
          onAddToOrder={() => {}}
          onDecline={() => {}}
        />
      </div>
    </div>
  );
}

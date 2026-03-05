import { useRef, useEffect, useCallback } from "react";
import type { PartnerConfig } from "@shared/schema";

interface PartnerFrameProps {
  html: string;
  config: PartnerConfig;
  pageType: "checkout" | "confirmation";
  onMessage?: (action: string) => void;
  addedToOrder?: boolean;
}

function buildIframeHtml(
  html: string,
  pageType: "checkout" | "confirmation"
): string {
  const responsiveCSS = `
    <style>
      html, body {
        max-width: 100% !important;
        overflow-x: hidden !important;
        -webkit-text-size-adjust: 100% !important;
      }
      img { max-width: 100% !important; height: auto !important; }
      * { box-sizing: border-box !important; }
    </style>
  `;

  const viewportFix = `
    <script>
      (function() {
        var meta = document.querySelector('meta[name="viewport"]');
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1';
          document.head.appendChild(meta);
        }
      })();
    </script>
  `;

  const triggerTexts =
    pageType === "checkout"
      ? ["place order", "submit order", "complete purchase", "pay now", "check out"]
      : ["continue shopping", "restart", "back to home", "shop more"];

  const messageAction =
    pageType === "checkout" ? "PLACE_ORDER" : "RESTART_DEMO";

  const clickScript = `
    <script>
      (function() {
        var triggerTexts = ${JSON.stringify(triggerTexts)};
        var action = "${messageAction}";

        document.addEventListener('click', function(e) {
          var el = e.target;
          while (el && el !== document.body) {
            var roktAction = el.getAttribute('data-rokt-action');
            if (roktAction) {
              e.preventDefault();
              var msg = roktAction === 'place-order' ? 'PLACE_ORDER'
                      : roktAction === 'restart' ? 'RESTART_DEMO'
                      : roktAction === 'cancel' ? 'CANCEL_ORDER'
                      : action;
              window.parent.postMessage({ type: msg }, '*');
              return;
            }

            var text = (el.textContent || '').trim().toLowerCase();
            for (var i = 0; i < triggerTexts.length; i++) {
              if (text.includes(triggerTexts[i])) {
                e.preventDefault();
                window.parent.postMessage({ type: action }, '*');
                return;
              }
            }

            if (el.tagName === 'BUTTON' || el.tagName === 'A' ||
                (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button'))) {
              e.preventDefault();
              window.parent.postMessage({ type: action }, '*');
              return;
            }

            el = el.parentElement;
          }
        }, true);

        window.addEventListener('message', function(e) {
          if (e.data && e.data.type === 'ORDER_DETAILS') {
            console.log('Received order details:', e.data);
          }
        });
      })();
    </script>
  `;

  let processed = html;
  if (processed.includes("</head>")) {
    processed = processed.replace("</head>", responsiveCSS + viewportFix + "</head>");
  } else {
    processed = responsiveCSS + viewportFix + processed;
  }

  if (processed.includes("</body>")) {
    processed = processed.replace("</body>", clickScript + "</body>");
  } else {
    processed += clickScript;
  }

  return processed;
}

export function PartnerFrame({
  html,
  config,
  pageType,
  onMessage,
  addedToOrder,
}: PartnerFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (
        event.source !== iframeRef.current?.contentWindow ||
        !event.data?.type
      )
        return;
      onMessage?.(event.data.type);
    },
    [onMessage]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (pageType === "confirmation" && iframeRef.current?.contentWindow) {
      const details = {
        type: "ORDER_DETAILS",
        addedToOrder: !!addedToOrder,
        productName: config.advertiser.productTitle,
        priceSale: config.advertiser.productSalePrice,
      };
      const send = () =>
        iframeRef.current?.contentWindow?.postMessage(details, "*");
      send();
      setTimeout(send, 300);
      setTimeout(send, 800);
    }
  }, [pageType, addedToOrder, config]);

  const srcDoc = buildIframeHtml(html, pageType);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
      title={`${config.partner.name} ${pageType}`}
    />
  );
}

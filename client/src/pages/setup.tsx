import { useState, useEffect, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, Upload, X, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HtmlUpload } from "@/components/setup/html-upload";
import { AssetUpload } from "@/components/setup/asset-upload";
import { StyleDiagnosis } from "@/components/setup/style-diagnosis";
import { ContentEntry } from "@/components/setup/content-entry";
import { PlacementPreview } from "@/components/setup/placement-preview";
import { FontPicker } from "@/components/setup/font-picker";
import { HtmlElementEditor } from "@/components/setup/html-element-editor";
import type {
  PartnerConfig,
  ExtractedStyles,
  ExtractionFlag,
  ExtractionResult,
} from "@shared/schema";
import { apiFetch } from "@/lib/utils";
import { toast } from "sonner";

type SetupStep = "upload" | "diagnosis" | "content" | "preview" | "save";
const STEPS: SetupStep[] = ["upload", "diagnosis", "content", "preview", "save"];
const STEP_LABELS: Record<SetupStep, string> = {
  upload: "Upload HTML",
  diagnosis: "Style Diagnosis",
  content: "Placement Content",
  preview: "Preview",
  save: "Save",
};

interface FormState {
  partnerId: string;
  name: string;
  logo: string;
  checkoutHtml: string;
  confirmationHtml: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontFamilyFallback: string;
  borderRadius: string;
  boxShadow: string;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonBorderRadius: string;
  buttonBorder: string;
  headerBgColor: string;
  headerBgImage: string;
  confirmationText: string;
  advertiserBrand: string;
  productTitle: string;
  productImage: string;
  productImages: string[];
  productPrice: string;
  productSalePrice: string;
  productDiscount: string;
  productDescription: string;
  ctaButtonText: string;
  countdownSeconds: number;
  badges: string[];
  variants: { label: string; options: string[] }[];
  soldBy: string;
  customFonts: { name: string; url: string }[];
  logoColor: string;
}

const defaultForm: FormState = {
  partnerId: "",
  name: "",
  logo: "",
  checkoutHtml: "",
  confirmationHtml: "",
  primaryColor: "#1a1a1a",
  secondaryColor: "#f6f6f6",
  backgroundColor: "#ffffff",
  fontFamily: "Inter",
  fontFamilyFallback: "",
  borderRadius: "8px",
  boxShadow: "",
  buttonBgColor: "#1a1a1a",
  buttonTextColor: "#ffffff",
  buttonBorderRadius: "100px",
  buttonBorder: "none",
  headerBgColor: "#ffffff",
  headerBgImage: "",
  confirmationText: "Your order was placed!",
  advertiserBrand: "",
  productTitle: "",
  productImage: "",
  productImages: [],
  productPrice: "",
  productSalePrice: "",
  productDiscount: "",
  productDescription: "",
  ctaButtonText: "Add to order",
  countdownSeconds: 300,
  badges: [],
  variants: [],
  soldBy: "",
  customFonts: [],
  logoColor: "#1a1a1a",
};

function formToConfig(form: FormState): PartnerConfig {
  return {
    partner: {
      id: form.partnerId,
      name: form.name,
      logo: form.logo || null,
      primaryColor: form.primaryColor,
      secondaryColor: form.secondaryColor,
      backgroundColor: form.backgroundColor,
      fontFamily: form.fontFamily,
      fontFamilyFallback: form.fontFamilyFallback || null,
      borderRadius: form.borderRadius,
      boxShadow: form.boxShadow || null,
      buttonBgColor: form.buttonBgColor,
      buttonTextColor: form.buttonTextColor,
      buttonBorderRadius: form.buttonBorderRadius,
      buttonBorder: form.buttonBorder,
      headerBgColor: form.headerBgColor,
      headerBgImage: form.headerBgImage || null,
      checkoutHtml: form.checkoutHtml || null,
      confirmationHtml: form.confirmationHtml || null,
      confirmationText: form.confirmationText,
      customFonts: form.customFonts,
    },
    advertiser: {
      brandName: form.advertiserBrand || null,
      brandLogo: null,
      productTitle: form.productTitle || null,
      productImage: form.productImage || null,
      productImages: form.productImages,
      productPrice: form.productPrice || null,
      productSalePrice: form.productSalePrice || null,
      productDiscount: form.productDiscount || null,
      productDescription: form.productDescription || null,
      ctaButtonText: form.ctaButtonText,
      countdownSeconds: form.countdownSeconds,
      badges: form.badges,
      variants: form.variants,
      soldBy: form.soldBy || null,
    },
  };
}

export default function Setup() {
  const params = useParams<{ partnerId?: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const isEditing = !!params.partnerId;

  const [step, setStep] = useState<SetupStep>("upload");
  const [form, setForm] = useState<FormState>(defaultForm);
  const [extractedStyles, setExtractedStyles] = useState<ExtractedStyles>({});
  const [extractionFlags, setExtractionFlags] = useState<ExtractionFlag[]>([]);

  const { data: existingPartner } = useQuery<PartnerConfig>({
    queryKey: ["partner", params.partnerId],
    queryFn: () => apiFetch(`/api/partners/${params.partnerId}`),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingPartner) {
      const p = existingPartner.partner;
      const a = existingPartner.advertiser;
      setForm({
        partnerId: p.id,
        name: p.name,
        logo: p.logo || "",
        checkoutHtml: p.checkoutHtml || "",
        confirmationHtml: p.confirmationHtml || "",
        primaryColor: p.primaryColor,
        secondaryColor: p.secondaryColor,
        backgroundColor: p.backgroundColor,
        fontFamily: p.fontFamily,
        fontFamilyFallback: p.fontFamilyFallback || "",
        borderRadius: p.borderRadius,
        boxShadow: p.boxShadow || "",
        buttonBgColor: p.buttonBgColor,
        buttonTextColor: p.buttonTextColor,
        buttonBorderRadius: p.buttonBorderRadius,
        buttonBorder: p.buttonBorder,
        headerBgColor: p.headerBgColor,
        headerBgImage: p.headerBgImage || "",
        confirmationText: p.confirmationText,
        customFonts: p.customFonts || [],
        advertiserBrand: a.brandName || "",
        productTitle: a.productTitle || "",
        productImage: a.productImage || "",
        productImages: a.productImages,
        productPrice: a.productPrice || "",
        productSalePrice: a.productSalePrice || "",
        productDiscount: a.productDiscount || "",
        productDescription: a.productDescription || "",
        ctaButtonText: a.ctaButtonText,
        countdownSeconds: a.countdownSeconds,
        badges: a.badges,
        variants: a.variants,
        soldBy: a.soldBy || "",
      });
    }
  }, [existingPartner]);

  const saveMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const body = {
        partnerId: data.partnerId,
        name: data.name,
        logo: data.logo || null,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        backgroundColor: data.backgroundColor,
        fontFamily: data.fontFamily,
        fontFamilyFallback: data.fontFamilyFallback || null,
        borderRadius: data.borderRadius,
        boxShadow: data.boxShadow || null,
        buttonBgColor: data.buttonBgColor,
        buttonTextColor: data.buttonTextColor,
        buttonBorderRadius: data.buttonBorderRadius,
        buttonBorder: data.buttonBorder,
        headerBgColor: data.headerBgColor,
        headerBgImage: data.headerBgImage || null,
        checkoutHtml: data.checkoutHtml || null,
        confirmationHtml: data.confirmationHtml || null,
        confirmationText: data.confirmationText,
        advertiserBrand: data.advertiserBrand || null,
        productTitle: data.productTitle || null,
        productImage: data.productImage || null,
        productImages: data.productImages,
        productPrice: data.productPrice || null,
        productSalePrice: data.productSalePrice || null,
        productDiscount: data.productDiscount || null,
        productDescription: data.productDescription || null,
        ctaButtonText: data.ctaButtonText,
        countdownSeconds: data.countdownSeconds,
        badges: data.badges,
        variants: data.variants,
        soldBy: data.soldBy || null,
        customFonts: data.customFonts,
      };

      if (isEditing) {
        return apiFetch(`/api/partners/${data.partnerId}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      }
      return apiFetch("/api/partners", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success(isEditing ? "Partner updated" : "Partner created");
      navigate("/");
    },
    onError: (err) => toast.error(err.message || "Save failed"),
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (!form.logo || !form.logo.endsWith(".svg")) {
      setSvgContent(null);
      return;
    }
    fetch(form.logo)
      .then((res) => res.text())
      .then((text) => {
        if (text.includes("<svg")) setSvgContent(text);
        else setSvgContent(null);
      })
      .catch(() => setSvgContent(null));
  }, [form.logo]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/partners/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((prev) => ({ ...prev, logo: data.url }));
      toast.success("Logo uploaded");
    } catch {
      toast.error("Logo upload failed");
    } finally {
      setLogoUploading(false);
    }
  };

  const stepIndex = STEPS.indexOf(step);

  const previewConfig = useMemo(() => formToConfig(form), [form]);

  const handleCheckoutUpload = (html: string, extraction: ExtractionResult) => {
    setForm((prev) => ({ ...prev, checkoutHtml: html }));
    if (extraction.styles && Object.keys(extraction.styles).length > 0) {
      setExtractedStyles(extraction.styles);
      setExtractionFlags(extraction.flags);
    }
  };

  const handleConfirmationUpload = (html: string, extraction: ExtractionResult) => {
    setForm((prev) => ({ ...prev, confirmationHtml: html }));
    if (
      extraction.styles &&
      Object.keys(extraction.styles).length > 0 &&
      Object.keys(extractedStyles).length === 0
    ) {
      setExtractedStyles(extraction.styles);
      setExtractionFlags(extraction.flags);
    }
  };

  const handleApplyStyles = (overrides: Record<string, string>) => {
    const s = extractedStyles;
    setForm((prev) => ({
      ...prev,
      primaryColor: overrides.primaryColor || s.primaryColor?.value || prev.primaryColor,
      secondaryColor: overrides.secondaryColor || s.secondaryColor?.value || prev.secondaryColor,
      backgroundColor: overrides.backgroundColor || s.backgroundColor?.value || prev.backgroundColor,
      fontFamily: overrides.fontFamily || s.fontFamily?.value || prev.fontFamily,
      fontFamilyFallback: s.fontFamily?.substitute || prev.fontFamilyFallback,
      borderRadius: overrides.borderRadius || s.borderRadius?.value || prev.borderRadius,
      boxShadow: s.boxShadow?.value || prev.boxShadow,
      buttonBgColor: overrides.buttonBgColor || s.buttonStyles?.bgColor || prev.buttonBgColor,
      buttonTextColor: overrides.buttonTextColor || s.buttonStyles?.textColor || prev.buttonTextColor,
      buttonBorderRadius: overrides.buttonBorderRadius || s.buttonStyles?.borderRadius || prev.buttonBorderRadius,
      buttonBorder: s.buttonStyles?.border || prev.buttonBorder,
    }));
    setStep("content");
  };

  const nextStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <h2 className="text-sm font-semibold">
              {isEditing ? `Edit ${form.name}` : "New Partner Setup"}
            </h2>
          </div>

          <div className="flex items-center" role="tablist" aria-label="Setup steps">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <button
                  role="tab"
                  aria-selected={s === step}
                  aria-label={`Step ${i + 1}: ${STEP_LABELS[s]}`}
                  onClick={() => setStep(s)}
                  className={`cursor-pointer transition-colors text-xs whitespace-nowrap ${
                    s === step
                      ? "text-foreground font-medium"
                      : i < stepIndex
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {STEP_LABELS[s]}
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 h-0.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: i < stepIndex ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {step === "upload" && (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-1">Upload Partner Pages</h2>
            </div>

            {/* Partner info + Logo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-3">
                <Label className="text-xs self-start">Logo (SVG preferred)</Label>
                {form.logo ? (
                  <div className="relative w-full h-[140px] rounded-xl border bg-white flex items-center justify-center overflow-hidden">
                    {svgContent ? (
                      <div
                        className="w-full h-full p-3 flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
                        style={{ color: form.logoColor }}
                        dangerouslySetInnerHTML={{
                          __html: svgContent.replace(
                            /fill="[^"]*"/g,
                            'fill="currentColor"'
                          ),
                        }}
                      />
                    ) : (
                      <img
                        src={form.logo}
                        alt="Partner logo"
                        className="max-w-full max-h-full object-contain p-3"
                      />
                    )}
                    <button
                      onClick={() => {
                        setForm((prev) => ({ ...prev, logo: "" }));
                        setSvgContent(null);
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => logoInputRef.current?.click()}
                    disabled={logoUploading}
                    className="w-full h-[140px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    {logoUploading ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span className="text-xs mt-1">Upload</span>
                      </>
                    )}
                  </button>
                )}
                {svgContent && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Logo Color</Label>
                    <input
                      type="color"
                      value={form.logoColor}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, logoColor: e.target.value }))
                      }
                      className="w-7 h-7 rounded border cursor-pointer"
                    />
                  </div>
                )}
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>

              {!isEditing ? (
                <div className="flex flex-col gap-1.5 justify-center">
                  <Label>Partner Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        name,
                        partnerId: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                      }));
                    }}
                    placeholder="e.g. Ticketmaster"
                  />
                </div>
              ) : (
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">
                    Editing <strong>{form.name}</strong>
                  </p>
                </div>
              )}
            </div>

            <HtmlUpload
              label="Checkout Page"
              description="The page shown right before the user hits 'Place Order'"
              onUpload={handleCheckoutUpload}
              currentHtml={form.checkoutHtml || null}
            />
            {form.checkoutHtml && (
              <HtmlElementEditor
                html={form.checkoutHtml}
                onHtmlChange={(html) => setForm((prev) => ({ ...prev, checkoutHtml: html }))}
                label="Checkout"
              />
            )}

            <HtmlUpload
              label="Confirmation Page"
              description="The page shown after the ad placement (order confirmation)"
              onUpload={handleConfirmationUpload}
              currentHtml={form.confirmationHtml || null}
            />
            {form.confirmationHtml && (
              <HtmlElementEditor
                html={form.confirmationHtml}
                onHtmlChange={(html) => setForm((prev) => ({ ...prev, confirmationHtml: html }))}
                label="Confirmation"
              />
            )}

            <AssetUpload />
          </div>
        )}

        {step === "diagnosis" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Style Diagnosis</h2>
              <p className="text-sm text-muted-foreground">
                Review the styles extracted from the uploaded HTML. Override any values that
                don&apos;t look right.
              </p>
            </div>

            {Object.keys(extractedStyles).length > 0 ? (
              <StyleDiagnosis
                styles={extractedStyles}
                flags={extractionFlags}
                onApply={handleApplyStyles}
                onDismissFlag={(i) => {
                  setExtractionFlags((prev) => prev.filter((_, idx) => idx !== i));
                }}
                customFonts={form.customFonts.map((f) => f.name)}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground mb-4">
                  No styles extracted yet. Upload an HTML file first, or
                  configure styles manually.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Primary Color</Label>
                    <input
                      type="color"
                      value={form.primaryColor}
                      onChange={(e) => setForm((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-full h-10 rounded border cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Button Color</Label>
                    <input
                      type="color"
                      value={form.buttonBgColor}
                      onChange={(e) => setForm((prev) => ({ ...prev, buttonBgColor: e.target.value }))}
                      className="w-full h-10 rounded border cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Font</Label>
                    <FontPicker
                      value={form.fontFamily}
                      onChange={(v) => setForm((prev) => ({ ...prev, fontFamily: v }))}
                      customFonts={form.customFonts.map((f) => f.name)}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Custom Fonts
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Upload custom font files (.woff2, .ttf, .otf) for brands that use licensed fonts
                not available on Google Fonts.
              </p>
              {form.customFonts.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.customFonts.map((f, i) => (
                    <div
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-1.5 px-2 py-1 bg-muted rounded text-xs"
                    >
                      <span className="font-medium">{f.name}</span>
                      <button
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            customFonts: prev.customFonts.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors cursor-pointer w-fit">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload font file</span>
                <input
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const fontName = prompt("Font family name:", file.name.replace(/\.[^.]+$/, ""));
                    if (!fontName) return;
                    const fd = new FormData();
                    fd.append("font", file);
                    fd.append("fontFamily", fontName);
                    try {
                      const res = await fetch("/api/partners/upload-font", {
                        method: "POST",
                        body: fd,
                      });
                      if (!res.ok) throw new Error("Upload failed");
                      const data = await res.json();
                      setForm((prev) => ({
                        ...prev,
                        customFonts: [...prev.customFonts, { name: data.fontFamily, url: data.url }],
                      }));
                      toast.success(`Font "${data.fontFamily}" uploaded`);
                    } catch {
                      toast.error("Font upload failed");
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Demo Page Header</h3>
              <p className="text-xs text-muted-foreground mb-4">
                The original site header is stripped from uploaded HTML and replaced with a clean
                static header using your uploaded partner logo.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Header Background</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={form.headerBgColor}
                      onChange={(e) => setForm((prev) => ({ ...prev, headerBgColor: e.target.value }))}
                      className="w-10 h-10 rounded border cursor-pointer shrink-0"
                    />
                    <Input
                      value={form.headerBgColor}
                      onChange={(e) => setForm((prev) => ({ ...prev, headerBgColor: e.target.value }))}
                      className="text-xs font-mono"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Logo Preview</Label>
                  <div
                    className="h-10 rounded border flex items-center justify-center px-3"
                    style={{ backgroundColor: form.headerBgColor }}
                  >
                    {form.logo ? (
                      <img src={form.logo} alt="Logo" className="max-h-6 w-auto" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground">No logo uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === "content" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Placement Content</h2>
              <p className="text-sm text-muted-foreground">
                Enter the product content that will appear in the Shoppable Ad placement.
              </p>
            </div>
            <ContentEntry
              values={{
                advertiserBrand: form.advertiserBrand,
                productTitle: form.productTitle,
                productPrice: form.productPrice,
                productSalePrice: form.productSalePrice,
                productDiscount: form.productDiscount,
                productDescription: form.productDescription,
                productImage: form.productImage,
                productImages: form.productImages,
                ctaButtonText: form.ctaButtonText,
                countdownSeconds: form.countdownSeconds,
                badges: form.badges,
                soldBy: form.soldBy,
                variants: form.variants,
              }}
              onChange={(vals) =>
                setForm((prev) => ({
                  ...prev,
                  ...vals,
                }))
              }
            />
          </div>
        )}

        {step === "preview" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Preview</h2>
              <p className="text-sm text-muted-foreground">
                Review how the placement will look in the demo. Make any final adjustments.
              </p>
            </div>
            <PlacementPreview config={previewConfig} />
          </div>
        )}

        {step === "save" && (
          <div className="flex flex-col gap-6 items-center py-8">
            <div className="w-16 h-16 bg-[#C2007510] rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Ready to Save</h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Partner <strong>{form.name}</strong> is configured with{" "}
              {form.checkoutHtml ? "checkout" : "no checkout"} and{" "}
              {form.confirmationHtml ? "confirmation" : "no confirmation"} pages.
            </p>
            <Button
              size="lg"
              onClick={() => saveMutation.mutate(form)}
              disabled={saveMutation.isPending || !form.partnerId || !form.name}
            >
              {saveMutation.isPending
                ? "Saving..."
                : isEditing
                  ? "Update Partner"
                  : "Create Partner"}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={stepIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          {step !== "save" && (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

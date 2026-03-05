import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Plus, Play, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PartnerConfig } from "@shared/schema";
import { apiFetch } from "@/lib/utils";
import { toast } from "sonner";

export default function Home() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const { data: partners = [], isLoading } = useQuery<PartnerConfig[]>({
    queryKey: ["partners"],
    queryFn: () => apiFetch("/api/partners"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/partners/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Partner deleted");
    },
    onError: () => toast.error("Failed to delete partner"),
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Rokt Shoppable Ads
            </h1>
            <p className="text-sm text-muted-foreground">
              Sales demo platform
            </p>
          </div>
          <Button onClick={() => navigate("/setup")}>
            <Plus className="w-4 h-4 mr-2" />
            New Partner
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : partners.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold mb-1">No partners yet</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Add your first partner by uploading their checkout HTML from a
              SingleFile capture.
            </p>
            <Button onClick={() => navigate("/setup")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((config) => (
              <Card
                key={config.partner.id}
                className="group hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Color banner */}
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: config.partner.primaryColor,
                    }}
                  />

                  <div className="p-5">
                    {/* Logo + name */}
                    <div className="flex items-center gap-3 mb-4">
                      {config.partner.logo ? (
                        <img
                          src={config.partner.logo}
                          alt={config.partner.name}
                          className="h-8 w-auto object-contain"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            backgroundColor: config.partner.primaryColor,
                          }}
                        >
                          {config.partner.name[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm">
                          {config.partner.name}
                        </h3>
                        {config.advertiser.brandName && (
                          <p className="text-xs text-muted-foreground">
                            {config.advertiser.brandName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Style swatches */}
                    <div className="flex gap-1.5 mb-4">
                      {[
                        config.partner.primaryColor,
                        config.partner.secondaryColor,
                        config.partner.buttonBgColor,
                      ].map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                      <div className="flex items-center ml-1">
                        <span
                          className="text-xs text-muted-foreground"
                          style={{
                            fontFamily: `'${config.partner.fontFamily}', sans-serif`,
                          }}
                        >
                          {config.partner.fontFamily}
                        </span>
                      </div>
                    </div>

                    {/* Pages indicator */}
                    <div className="flex gap-2 mb-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          config.partner.checkoutHtml
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Checkout{" "}
                        {config.partner.checkoutHtml ? "✓" : "—"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          config.partner.confirmationHtml
                            ? "bg-green-100 text-green-700"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Confirmation{" "}
                        {config.partner.confirmationHtml ? "✓" : "—"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() =>
                          navigate(
                            `/demo?partner=${config.partner.id}`
                          )
                        }
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start Demo
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          navigate(`/setup/${config.partner.id}`)
                        }
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(
                              `Delete ${config.partner.name}?`
                            )
                          ) {
                            deleteMutation.mutate(config.partner.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new card */}
            <Card
              className="border-dashed hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center min-h-[240px]"
              onClick={() => navigate("/setup")}
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Plus className="w-8 h-8" />
                <span className="text-sm font-medium">Add Partner</span>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

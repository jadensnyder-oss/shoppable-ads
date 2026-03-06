import { useState } from "react";
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
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="group hover:shadow-md transition-shadow overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="h-2" style={{ backgroundColor: "#024ddf" }} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5"
                      style={{ backgroundColor: "#024ddf" }}
                    >
                      <img
                        src="/images/ticketmaster/ticketmaster.png"
                        alt="Ticketmaster"
                        className="w-full h-full object-contain brightness-0 invert"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Ticketmaster</h3>
                      <p className="text-xs text-muted-foreground">Dagne Dover</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      Figma Export
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Static Demo
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      style={{ backgroundColor: "#024ddf" }}
                      onClick={() => navigate("/demo/ticketmaster")}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {partners.map((config) => (
              <Card
                key={config.partner.id}
                className="group hover:shadow-md transition-shadow overflow-hidden"
              >
                <CardContent className="p-0">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: config.partner.primaryColor,
                    }}
                  />

                  <div className="p-5 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        navigate(`/setup/${config.partner.id}`)
                      }
                    >
                      <Settings className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center gap-3 mb-4">
                      {config.partner.logo ? (
                        <div className="w-10 h-10 rounded-lg border overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                          <img
                            src={config.partner.logo}
                            alt={config.partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0"
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
                      {confirmDelete === config.partner.id ? (
                        <div className="flex gap-1">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              deleteMutation.mutate(config.partner.id);
                              setConfirmDelete(null);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setConfirmDelete(config.partner.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

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

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BusinessCard } from "@/components/BusinessCard";
import { BusinessOpportunityForm } from "@/components/BusinessOpportunityForm";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BusinessOpportunity {
  id: string;
  title: string;
  company: string | null;
  description: string | null;
  location: string | null;
  sector: string | null;
  looking_for: string | null;
  email: string | null;
}

const sectors = ["Tous", "Tech", "Immobilier", "Conseil", "Commerce", "Finance", "Événementiel"];

const Reseau = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous");
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("business_opportunities")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOpportunities(data);
    }
    setLoading(false);
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (opportunity.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (opportunity.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (opportunity.looking_for?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesSector = selectedSector === "Tous" || opportunity.sector === selectedSector;

    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                Réseau Affaires
              </h1>
              <p className="text-lg text-muted-foreground">
                Connectez-vous avec les membres pour développer vos projets professionnels
              </p>
            </div>
            <BusinessOpportunityForm onSuccess={fetchOpportunities} />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une opportunité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-card border border-navy/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-navy/30 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 ${
                    selectedSector === sector
                      ? "bg-navy/10 text-navy border-navy/30"
                      : "border-navy/20 text-muted-foreground hover:text-navy hover:border-navy/50"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-navy" />
            </div>
          ) : filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <BusinessCard
                  key={opportunity.id}
                  title={opportunity.title}
                  company={opportunity.company || ""}
                  description={opportunity.description || ""}
                  author="Membre"
                  location={opportunity.location || ""}
                  sector={opportunity.sector || ""}
                  lookingFor={opportunity.looking_for || ""}
                  email={opportunity.email || undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Aucune opportunité ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reseau;
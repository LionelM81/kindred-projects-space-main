import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MemberCard } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Filter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Member {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  sector: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  bio: string | null;
  projects: string[] | null;
}

const sectors = [
  "Tous les secteurs",
  "Architecture",
  "Art & Culture",
  "Conseil en stratégie",
  "Droit des affaires",
  "Gestion de patrimoine",
  "Hôtellerie & Restauration",
  "Immobilier de prestige",
  "Luxe & Mode",
  "Médias & Communication",
  "Ressources humaines",
  "Santé & Bien-être",
  "Technologies & Innovation",
];

export default function Annuaire() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous les secteurs");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.company?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (member.sector?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesSector =
      selectedSector === "Tous les secteurs" || member.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/10 border border-navy/20 mb-6">
            <Users className="w-4 h-4 text-navy" />
            <span className="text-navy text-sm font-medium">
              {members.length} Membres
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Annuaire des{" "}
            <span className="text-gradient-navy">Membres</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les membres du Club 1938, leurs expertises et les projets
            qu'ils souhaitent partager avec la communauté.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 lg:px-8 pb-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un membre, une entreprise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-navy/10 focus:border-navy/30"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedSector === "Tous les secteurs" ? "navy" : "outline"}
                size="sm"
                onClick={() => setSelectedSector("Tous les secteurs")}
                className="whitespace-nowrap"
              >
                <Filter className="w-4 h-4 mr-2" />
                Tous
              </Button>
            </div>
          </div>

          {/* Sector Tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-6 max-w-4xl mx-auto">
            {sectors.slice(1).map((sector) => (
              <Button
                key={sector}
                variant={selectedSector === sector ? "navy" : "ghost"}
                size="sm"
                onClick={() => setSelectedSector(sector)}
                className="text-xs"
              >
                {sector}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-navy" />
            </div>
          ) : filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role || "Membre"}
                  company={member.company || ""}
                  sector={member.sector || ""}
                  location=""
                  email={member.email || undefined}
                  phone={member.phone || undefined}
                  transversalProjects={member.projects || []}
                  businessProjects={[]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Aucun membre ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
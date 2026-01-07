import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const sectors = ["Tech", "Immobilier", "Conseil", "Commerce", "Finance", "Événementiel"];
const locations = ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse", "Lille", "Strasbourg", "Autre"];

interface BusinessOpportunityFormProps {
  onSuccess?: () => void;
}

export const BusinessOpportunityForm = ({ onSuccess }: BusinessOpportunityFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    sector: "",
    location: "",
    lookingFor: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour publier une opportunité.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.from("business_opportunities").insert({
      title: formData.title,
      company: formData.company,
      description: formData.description,
      sector: formData.sector,
      location: formData.location,
      looking_for: formData.lookingFor,
      author_id: user.id,
      email: user.email,
    });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'opportunité. Veuillez réessayer.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Opportunité publiée !",
        description: "Votre opportunité business est maintenant visible par les membres.",
      });
      setFormData({ title: "", company: "", description: "", sector: "", location: "", lookingFor: "" });
      setOpen(false);
      onSuccess?.();
    }
    
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="navy" size="lg">
          <Plus className="w-5 h-5" />
          Publier une opportunité
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-navy/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-navy">Publier une opportunité</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Titre de l'opportunité *</Label>
            <Input
              id="title"
              placeholder="Ex: Développement E-commerce"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border-navy/20 focus:border-navy/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground">Nom de l'entreprise *</Label>
            <Input
              id="company"
              placeholder="Ex: TechVision SAS"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              className="border-navy/20 focus:border-navy/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre opportunité en quelques lignes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="border-navy/20 focus:border-navy/50 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector" className="text-foreground">Secteur *</Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value })}
                required
              >
                <SelectTrigger className="border-navy/20 focus:border-navy/50">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sec) => (
                    <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground">Localisation *</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
                required
              >
                <SelectTrigger className="border-navy/20 focus:border-navy/50">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lookingFor" className="text-foreground">Ce que vous recherchez *</Label>
            <Input
              id="lookingFor"
              placeholder="Ex: Partenaire technique, investisseur..."
              value={formData.lookingFor}
              onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
              required
              className="border-navy/20 focus:border-navy/50"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 border-navy/20" disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" variant="navy" className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier l'opportunité"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

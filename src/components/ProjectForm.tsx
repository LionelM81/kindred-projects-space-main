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

const categories = ["Loisirs", "Solidarité", "Sport", "Culture", "Gastronomie"];

interface ProjectFormProps {
  onSuccess?: () => void;
}

export const ProjectForm = ({ onSuccess }: ProjectFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour proposer un projet.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.from("projects").insert({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date || null,
      image_url: formData.image || null,
      author_id: user.id,
      author: user.email?.split("@")[0] || "Membre",
    });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet. Veuillez réessayer.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Projet proposé !",
        description: "Votre projet a été soumis pour validation par les administrateurs.",
      });
      setFormData({ title: "", description: "", category: "", date: "", image: "" });
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
          Proposer un projet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-navy/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-navy">Proposer un projet</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Titre du projet *</Label>
            <Input
              id="title"
              placeholder="Ex: Sortie Bateau Méditerranée"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="border-navy/20 focus:border-navy/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre projet en quelques lignes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="border-navy/20 focus:border-navy/50 resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="border-navy/20 focus:border-navy/50">
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date prévue</Label>
              <Input
                id="date"
                placeholder="Ex: Mars 2025"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-navy/20 focus:border-navy/50"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-foreground">URL de l'image (optionnel)</Label>
            <Input
              id="image"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="border-navy/20 focus:border-navy/50"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 border-navy/20" disabled={loading}>
              Annuler
            </Button>
            <Button type="submit" variant="navy" className="flex-1" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Soumettre le projet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

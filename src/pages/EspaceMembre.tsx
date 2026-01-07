import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar, 
  Users, 
  Briefcase, 
  FolderOpen,
  Settings,
  LogOut,
  Edit
} from "lucide-react";

// Données fictives pour la démo
const memberData = {
  name: "Jean-Pierre Laurent",
  email: "jp.laurent@example.com",
  phone: "+33 6 12 34 56 78",
  location: "Paris",
  company: "TechVision SAS",
  role: "Directeur Général",
  memberSince: "2019",
  sector: "Technologie",
  bio: "Entrepreneur passionné avec plus de 20 ans d'expérience dans le secteur technologique. Fondateur de TechVision SAS, spécialisée dans les solutions e-commerce B2B.",
};

const memberProjects = [
  {
    title: "Sortie Bateau Méditerranée",
    date: "Mars 2025",
    participants: 8,
    status: "En cours",
    category: "Loisirs",
  },
  {
    title: "Tournoi de Golf Annuel",
    date: "Avril 2025",
    participants: 16,
    status: "Validé",
    category: "Sport",
  },
];

const memberOpportunities = [
  {
    title: "Développement E-commerce",
    company: "TechVision SAS",
    sector: "Tech",
    responses: 5,
    status: "Active",
  },
  {
    title: "Partenariat Distribution",
    company: "TechVision SAS",
    sector: "Commerce",
    responses: 3,
    status: "Active",
  },
];

const memberStats = [
  { label: "Projets proposés", value: "4", icon: FolderOpen },
  { label: "Opportunités publiées", value: "2", icon: Briefcase },
  { label: "Participations", value: "12", icon: Users },
  { label: "Années membre", value: "5", icon: Calendar },
];

const EspaceMembre = () => {
  const { toast } = useToast();
  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile] = useState(memberData);
  const [editForm, setEditForm] = useState(memberData);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setEditOpen(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container px-6 lg:px-8">
          {/* Header avec profil */}
          <div className="bg-gradient-to-br from-navy via-navy-dark to-navy rounded-2xl p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-sky/20 border-4 border-sky/30 flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 md:w-16 md:h-16 text-sky" />
              </div>
              
              {/* Infos */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-serif text-white">
                    {profile.name}
                  </h1>
                  <Badge className="bg-sky/20 text-sky border-sky/30 w-fit">
                    Membre depuis {profile.memberSince}
                  </Badge>
                </div>
                
                <p className="text-sky/80 text-lg mb-6 max-w-2xl">
                  {profile.bio}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sky/70">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{profile.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white/10 border-sky/30 text-sky hover:bg-white/20"
                      onClick={() => setEditForm(profile)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px] bg-card border-navy/20">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-serif text-navy">Modifier mon profil</DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-5 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground">Nom complet *</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            required
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">Téléphone</Label>
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-foreground">Entreprise</Label>
                          <Input
                            id="company"
                            value={editForm.company}
                            onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role" className="text-foreground">Fonction</Label>
                          <Input
                            id="role"
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-foreground">Ville</Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sector" className="text-foreground">Secteur d'activité</Label>
                          <Input
                            id="sector"
                            value={editForm.sector}
                            onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                            className="border-navy/20 focus:border-navy/50"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-foreground">Biographie</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={4}
                          className="border-navy/20 focus:border-navy/50 resize-none"
                          placeholder="Présentez-vous en quelques lignes..."
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setEditOpen(false)} className="flex-1 border-navy/20">
                          Annuler
                        </Button>
                        <Button type="submit" variant="navy" className="flex-1">
                          Enregistrer
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon" className="bg-white/10 border-sky/30 text-sky hover:bg-white/20">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-red-400/30 text-red-400 hover:bg-red-400/20">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {memberStats.map((stat) => (
              <Card key={stat.label} className="bg-card border-navy/10">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-navy" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-navy">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="bg-navy/5 border border-navy/10 p-1">
              <TabsTrigger value="projects" className="data-[state=active]:bg-navy data-[state=active]:text-white">
                <FolderOpen className="w-4 h-4 mr-2" />
                Mes Projets
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="data-[state=active]:bg-navy data-[state=active]:text-white">
                <Briefcase className="w-4 h-4 mr-2" />
                Mes Opportunités
              </TabsTrigger>
              <TabsTrigger value="participations" className="data-[state=active]:bg-navy data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Participations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-navy">Projets que j'ai proposés</h2>
              </div>
              
              <div className="grid gap-4">
                {memberProjects.map((project, index) => (
                  <Card key={index} className="bg-card border-navy/10 hover:border-navy/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                            <Badge variant="outline" className="border-navy/20 text-navy">
                              {project.category}
                            </Badge>
                            <Badge className={project.status === "En cours" ? "bg-amber-500/20 text-amber-600" : "bg-green-500/20 text-green-600"}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {project.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {project.participants} participants
                            </span>
                          </div>
                        </div>
                        <Button variant="navy-outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-navy">Mes opportunités business</h2>
              </div>
              
              <div className="grid gap-4">
                {memberOpportunities.map((opp, index) => (
                  <Card key={index} className="bg-card border-navy/10 hover:border-navy/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{opp.title}</h3>
                            <Badge variant="outline" className="border-navy/20 text-navy">
                              {opp.sector}
                            </Badge>
                            <Badge className="bg-green-500/20 text-green-600">
                              {opp.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {opp.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {opp.responses} réponses
                            </span>
                          </div>
                        </div>
                        <Button variant="navy-outline" size="sm">
                          Gérer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="participations" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-navy">Projets auxquels je participe</h2>
              </div>
              
              <Card className="bg-card border-navy/10">
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-navy/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Retrouvez ici tous les projets auxquels vous participez
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EspaceMembre;

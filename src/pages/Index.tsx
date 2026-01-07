import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { BusinessCard } from "@/components/BusinessCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Lightbulb } from "lucide-react";
import heroImage from "@/assets/hero-club.jpg";
import logoClub from "@/assets/logo-club-1938.png";

const latestNews = [
  {
    title: "Soirée annuelle du Club 1938",
    excerpt: "Rejoignez-nous pour notre traditionnelle soirée de gala qui rassemble tous les membres du club dans un cadre exceptionnel.",
    date: "15 Janvier 2025",
    category: "Événement",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
  },
  {
    title: "Nouveau partenariat stratégique",
    excerpt: "Le Club 1938 annonce un partenariat exclusif avec un acteur majeur du secteur.",
    date: "10 Janvier 2025",
    category: "Annonce",
  },
  {
    title: "Bilan de l'année 2024",
    excerpt: "Retour sur une année riche en projets et en rencontres pour notre communauté.",
    date: "5 Janvier 2025",
    category: "Rétrospective",
  },
];

const featuredProjects = [
  {
    title: "Sortie Bateau Méditerranée",
    description: "Organisation d'une journée en mer pour les membres et leurs familles.",
    author: "Marc Dupont",
    participants: 8,
    date: "Mars 2025",
    category: "Loisirs",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&auto=format&fit=crop",
  },
  {
    title: "Parrainage Enfants Défavorisés",
    description: "Programme de parrainage pour accompagner des enfants dans leur parcours éducatif.",
    author: "Sophie Martin",
    participants: 12,
    date: "En cours",
    category: "Solidarité",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
  },
];

const businessOpportunities = [
  {
    title: "Développement E-commerce",
    company: "TechVision SAS",
    description: "Recherche partenaire technique pour développer une plateforme de vente en ligne B2B.",
    author: "Jean-Pierre Laurent",
    location: "Paris",
    sector: "Tech",
    lookingFor: "Développeur ou agence spécialisée e-commerce",
  },
];

const stats = [
  { icon: Users, value: "20", label: "Membres actifs" },
  { icon: Lightbulb, value: "15+", label: "Projets lancés" },
  { icon: Briefcase, value: "30+", label: "Collaborations" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Club 1938"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/80 to-navy" />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 px-6 lg:px-8 pt-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/10 border border-sky/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse-navy" />
              <span className="text-sm text-sky">Cercle privé depuis 1938</span>
            </div>
            
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/95 rounded-2xl px-8 py-6 shadow-2xl backdrop-blur-sm">
                <img 
                  src={logoClub} 
                  alt="Club 1938" 
                  className="h-32 md:h-40 lg:h-48 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-sky/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Un cercle d'excellence réunissant des visionnaires partageant des valeurs communes et une ambition collective.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="xl" className="bg-sky text-navy hover:bg-sky/90">
                Découvrir le Club
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-sky/50 text-sky hover:bg-sky/10">
                Espace Membre
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-navy-dark/50 backdrop-blur-sm border border-sky/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-sky mx-auto mb-3" />
                <p className="text-3xl font-serif text-primary-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-sky/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-sky/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-sky rounded-full" />
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-6 lg:px-8">
          <SectionHeader
            title="Actualités du Club"
            subtitle="Restez informé des dernières nouvelles et événements"
            linkTo="/actualites"
            linkText="Toutes les actualités"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Transversal Projects Section */}
      <section className="py-20 lg:py-32 bg-muted">
        <div className="container px-6 lg:px-8">
          <SectionHeader
            title="Projets Transversaux"
            subtitle="Des initiatives proposées par les membres, pour les membres"
            linkTo="/projets"
            linkText="Tous les projets"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Business Network Section */}
      <section className="py-20 lg:py-32">
        <div className="container px-6 lg:px-8">
          <SectionHeader
            title="Réseau Affaires"
            subtitle="Opportunités professionnelles entre membres"
            linkTo="/reseau"
            linkText="Voir le réseau"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {businessOpportunities.map((business, index) => (
              <BusinessCard key={index} {...business} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-navy">
        <div className="container px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
              Rejoignez l'excellence
            </h2>
            <p className="text-lg text-sky/80 mb-10">
              Le Club 1938 rassemble des personnalités d'exception. Faites partie de notre communauté exclusive.
            </p>
            <Button variant="default" size="xl" className="bg-sky text-navy hover:bg-sky/90">
              Accéder à l'Espace Membre
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

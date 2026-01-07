import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { SectionHeader } from "@/components/SectionHeader";

const allNews = [
  {
    title: "Soirée annuelle du Club 1938",
    excerpt: "Rejoignez-nous pour notre traditionnelle soirée de gala qui rassemble tous les membres du club dans un cadre exceptionnel. Une soirée mémorable en perspective.",
    date: "15 Janvier 2025",
    category: "Événement",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
  },
  {
    title: "Nouveau partenariat stratégique",
    excerpt: "Le Club 1938 annonce un partenariat exclusif avec un acteur majeur du secteur financier.",
    date: "10 Janvier 2025",
    category: "Annonce",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop",
  },
  {
    title: "Bilan de l'année 2024",
    excerpt: "Retour sur une année riche en projets et en rencontres pour notre communauté de membres.",
    date: "5 Janvier 2025",
    category: "Rétrospective",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
  },
  {
    title: "Conférence sur l'innovation",
    excerpt: "Un membre nous a partagé sa vision de l'innovation dans le secteur technologique lors de notre dernière réunion.",
    date: "20 Décembre 2024",
    category: "Conférence",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
  },
  {
    title: "Nouvelle adhésion",
    excerpt: "Nous avons le plaisir d'accueillir trois nouveaux membres au sein de notre cercle.",
    date: "15 Décembre 2024",
    category: "Membres",
  },
  {
    title: "Dîner de networking",
    excerpt: "Un dîner d'affaires réunissant les membres autour d'opportunités de collaboration.",
    date: "10 Décembre 2024",
    category: "Événement",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
  },
];

const Actualites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Actualités
            </h1>
            <p className="text-lg text-muted-foreground">
              Toutes les informations et événements du Club 1938
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNews.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Actualites;

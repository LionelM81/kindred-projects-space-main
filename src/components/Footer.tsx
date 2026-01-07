import { Link } from "react-router-dom";
import logoClub from "@/assets/logo-club-1938.png";

export function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-light/10">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={logoClub} 
              alt="Club 1938" 
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm text-sky/80">
            <Link to="/" className="hover:text-sky transition-colors">Accueil</Link>
            <Link to="/actualites" className="hover:text-sky transition-colors">Actualités</Link>
            <Link to="/projets" className="hover:text-sky transition-colors">Projets</Link>
            <Link to="/reseau" className="hover:text-sky transition-colors">Réseau</Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-sky/60">
            © 2024 Club 1938. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

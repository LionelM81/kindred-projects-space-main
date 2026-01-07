import { useState } from "react";
import { Briefcase, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBusinessDialog } from "@/components/ContactBusinessDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BusinessCardProps {
  title: string;
  company: string;
  description: string;
  author: string;
  location: string;
  sector: string;
  lookingFor: string;
  email?: string;
}

export function BusinessCard({ title, company, description, author, location, sector, lookingFor, email = "contact@example.com" }: BusinessCardProps) {
  const [contactOpen, setContactOpen] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=À propos de : ${title}`;
  };

  return (
    <>
      <article className="group bg-card rounded-xl p-6 border border-navy/10 hover:border-navy/30 transition-all duration-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-navy flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-foreground group-hover:text-navy transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy rounded-full">
            {sector}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="bg-muted rounded-lg p-4 mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Recherche</p>
          <p className="text-sm text-foreground">{lookingFor}</p>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-navy/10">
          <span className="text-sm text-muted-foreground">
            Par <span className="text-foreground">{author}</span>
          </span>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={handleEmailClick}>
                    <Mail className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Envoyer un email direct</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="navy" size="sm" onClick={() => setContactOpen(true)}>
              Contacter
            </Button>
          </div>
        </div>
      </article>

      <ContactBusinessDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        businessTitle={title}
        author={author}
      />
    </>
  );
}

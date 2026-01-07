import { Users, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  author: string;
  participants: number;
  date: string;
  category: string;
  image?: string;
}

export function ProjectCard({ title, description, author, participants, date, category, image }: ProjectCardProps) {
  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-navy/10 hover:border-navy/30 transition-all duration-500">
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-navy/10 text-navy rounded-full">
            {category}
          </span>
        </div>
        <h3 className="font-serif text-xl text-foreground group-hover:text-navy transition-colors duration-300 mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-navy/10">
          <span className="text-sm text-muted-foreground">
            Proposé par <span className="text-foreground">{author}</span>
          </span>
          <Button variant="navy-outline" size="sm">
            <Heart className="w-4 h-4" />
            Participer
          </Button>
        </div>
      </div>
    </article>
  );
}

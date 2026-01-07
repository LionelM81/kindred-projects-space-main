import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category?: string;
  featured?: boolean;
}

export function NewsCard({ title, excerpt, date, image, category, featured }: NewsCardProps) {
  return (
    <article
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-navy/10 hover:border-navy/30 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(213_79%_23%_/_0.1)]",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      {image && (
        <div className={cn("overflow-hidden", featured ? "h-64" : "h-48")}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className={cn("p-6", featured && "p-8")}>
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-navy/10 text-navy rounded-full mb-4">
            {category}
          </span>
        )}
        <h3
          className={cn(
            "font-serif text-foreground group-hover:text-navy transition-colors duration-300 mb-3",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <span className="flex items-center gap-1 text-sm text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Lire plus <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

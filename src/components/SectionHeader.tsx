import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkText?: string;
}

export function SectionHeader({ title, subtitle, linkTo, linkText }: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo}>
          <Button variant="navy-outline" size="sm">
            {linkText || "Voir tout"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}

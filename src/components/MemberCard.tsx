import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Briefcase, Lightbulb, MapPin, Phone, Mail } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  company: string;
  sector: string;
  location: string;
  avatar?: string;
  email?: string;
  phone?: string;
  transversalProjects?: string[];
  businessProjects?: string[];
}

export function MemberCard({
  name,
  role,
  company,
  sector,
  location,
  avatar,
  email,
  phone,
  transversalProjects = [],
  businessProjects = [],
}: MemberCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group bg-card border-navy/10 hover:border-navy/30 transition-all duration-500 hover:shadow-[0_8px_40px_hsl(213_79%_23%_/_0.1)] overflow-hidden">
      <CardContent className="p-6">
        {/* Header with Avatar */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-16 h-16 border-2 border-navy/20 group-hover:border-navy/40 transition-colors">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-gradient-navy text-primary-foreground font-serif text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-xl text-foreground group-hover:text-navy transition-colors truncate">
              {name}
            </h3>
            <p className="text-navy font-medium text-sm">{role}</p>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{company}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4 text-navy/60" />
            <span>{sector}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-navy/60" />
            <span>{location}</span>
          </div>
          {email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-navy/60" />
              <a href={`mailto:${email}`} className="hover:text-navy transition-colors truncate">
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-navy/60" />
              <a href={`tel:${phone}`} className="hover:text-navy transition-colors">
                {phone}
              </a>
            </div>
          )}
        </div>

        {/* Projets Transversaux */}
        {transversalProjects.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-navy" />
              <span className="text-xs font-medium text-foreground uppercase tracking-wider">
                Projets Transversaux
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {transversalProjects.map((project, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-navy/5 border-navy/20 text-navy hover:bg-navy/10 text-xs"
                >
                  {project}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projets Professionnels */}
        {businessProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-navy" />
              <span className="text-xs font-medium text-foreground uppercase tracking-wider">
                Recherche Pro
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {businessProjects.map((project, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-secondary/50 border-border text-muted-foreground hover:bg-secondary text-xs"
                >
                  {project}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

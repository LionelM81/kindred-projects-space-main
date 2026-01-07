-- Créer l'enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('admin', 'member');

-- Table des profils utilisateurs
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  role TEXT,
  sector TEXT,
  bio TEXT,
  linkedin TEXT,
  avatar_url TEXT,
  projects_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des rôles utilisateurs (séparée pour la sécurité)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  UNIQUE (user_id, role)
);

-- Table des membres (annuaire)
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  sector TEXT,
  email TEXT,
  phone TEXT,
  linkedin TEXT,
  avatar_url TEXT,
  bio TEXT,
  projects TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des projets
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  author TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  participants INTEGER DEFAULT 0,
  image_url TEXT,
  date DATE,
  status TEXT DEFAULT 'en cours',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des actualités
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table des opportunités business
CREATE TABLE public.business_opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  sector TEXT,
  location TEXT,
  looking_for TEXT,
  email TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_opportunities ENABLE ROW LEVEL SECURITY;

-- Fonction pour vérifier les rôles (évite la récursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Politiques RLS pour profiles
CREATE POLICY "Les profils sont visibles par tous les utilisateurs authentifiés"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent créer leur propre profil"
ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Politiques RLS pour user_roles
CREATE POLICY "Les admins peuvent voir tous les rôles"
ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Les admins peuvent gérer les rôles"
ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Politiques RLS pour members (lecture publique, écriture admin)
CREATE POLICY "Les membres sont visibles par tous"
ON public.members FOR SELECT USING (true);

CREATE POLICY "Les admins peuvent gérer les membres"
ON public.members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Politiques RLS pour projects
CREATE POLICY "Les projets publiés sont visibles par tous"
ON public.projects FOR SELECT USING (is_published = true);

CREATE POLICY "Les admins peuvent gérer tous les projets"
ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Les auteurs peuvent modifier leurs projets"
ON public.projects FOR UPDATE TO authenticated USING (auth.uid() = author_id);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des projets"
ON public.projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

-- Politiques RLS pour news
CREATE POLICY "Les actualités publiées sont visibles par tous"
ON public.news FOR SELECT USING (is_published = true);

CREATE POLICY "Les admins peuvent gérer les actualités"
ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Politiques RLS pour business_opportunities
CREATE POLICY "Les opportunités actives sont visibles par tous"
ON public.business_opportunities FOR SELECT USING (is_active = true);

CREATE POLICY "Les admins peuvent gérer les opportunités"
ON public.business_opportunities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Les auteurs peuvent modifier leurs opportunités"
ON public.business_opportunities FOR UPDATE TO authenticated USING (auth.uid() = author_id);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des opportunités"
ON public.business_opportunities FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

-- Trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  
  -- Attribuer le rôle membre par défaut
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_business_opportunities_updated_at BEFORE UPDATE ON public.business_opportunities
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
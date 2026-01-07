import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import logoClub from "@/assets/logo-club-1938.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Email ou mot de passe incorrect");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Connexion réussie");
        navigate("/");
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères");
        setLoading(false);
        return;
      }

      const { error } = await signUp(email, password, firstName, lastName);
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Cet email est déjà utilisé");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Compte créé avec succès");
        navigate("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-sky/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src={logoClub} 
              alt="Club 1938" 
              className="h-40 w-auto object-contain brightness-0 invert"
            />
          </div>
          
          {/* Tagline */}
          <div className="text-center max-w-md">
            <p className="text-xl text-sky/80 font-light leading-relaxed">
              Un cercle d'excellence où tradition et innovation se rencontrent
            </p>
          </div>
          
          {/* Features */}
          <div className="mt-16 space-y-6">
            <div className="flex items-center gap-4 text-sky/80">
              <div className="w-2 h-2 rounded-full bg-sky" />
              <span>Accès exclusif aux actualités du club</span>
            </div>
            <div className="flex items-center gap-4 text-sky/80">
              <div className="w-2 h-2 rounded-full bg-sky" />
              <span>Proposez vos projets transversaux</span>
            </div>
            <div className="flex items-center gap-4 text-sky/80">
              <div className="w-2 h-2 rounded-full bg-sky" />
              <span>Développez votre réseau professionnel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Back button */}
        <div className="p-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <img 
                src={logoClub} 
                alt="Club 1938" 
                className="h-24 w-auto object-contain mx-auto"
              />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-foreground mb-2">
                {isLogin ? "Bienvenue" : "Rejoignez-nous"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Connectez-vous à votre espace membre" 
                  : "Créez votre compte membre"}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">Prénom</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="Jean"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 bg-secondary border-navy/20 focus:border-navy"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-secondary border-navy/20 focus:border-navy"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary border-navy/20 focus:border-navy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                  {isLogin && (
                    <button 
                      type="button"
                      className="text-sm text-navy hover:text-navy-light transition-colors"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-secondary border-navy/20 focus:border-navy"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-secondary border-navy/20 focus:border-navy"
                    />
                  </div>
                </div>
              )}

              <Button variant="navy" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  isLogin ? "Se connecter" : "Créer mon compte"
                )}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Pas encore membre ?" : "Déjà membre ?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-navy hover:text-navy-light font-medium transition-colors"
                >
                  {isLogin ? "Demander un accès" : "Se connecter"}
                </button>
              </p>
            </div>

            {/* Footer note */}
            <p className="mt-8 text-center text-xs text-muted-foreground">
              L'accès au Club 1938 est réservé aux membres invités.
              <br />
              Contactez un membre pour obtenir une invitation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

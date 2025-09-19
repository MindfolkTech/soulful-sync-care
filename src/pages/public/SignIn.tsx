import { useState, useEffect } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLogin } from "@/components/auth/social-login";
import { ForgotPasswordDialog } from "@/components/auth/forgot-password-dialog";
import { AlertCircle } from "lucide-react";
import { useUserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  const { isSignedIn } = useAuth();
  const { signIn, setActive } = useSignIn();
  const { role } = useUserRole();
  const navigate = useNavigate();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      const redirectTo = searchParams.get("redirect") || getRoleBasedRedirect(role);
      navigate(redirectTo, { replace: true });
    }
  }, [isSignedIn, role, navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (!signIn) return;
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Navigation will be handled by the useEffect above
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Welcome back</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                Sign in to your MindFolk account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              <SocialLogin mode="signin" />
              
              <form onSubmit={handleSubmit} className="space-y-[--space-md]">
                {error && (
                  <div className="flex items-center space-x-[--space-xs] text-sm text-[hsl(var(--error-text))] bg-destructive/10 p-[--space-sm] rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-secondary">{error}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <ForgotPasswordDialog />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full min-h-touch-target" aria-label="Sign in to account" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="text-center space-y-[--space-xs]">
                <Link to="/sign-up" className="text-sm text-text-secondary hover:text-text-primary font-secondary">
                  Don't have an account? Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useAuth, useSignUp } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialLogin } from "@/components/auth/social-login";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useUserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";

export default function SignUp() {
  const { isSignedIn } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      const redirectTo = getRoleBasedRedirect(role);
      navigate(redirectTo, { replace: true });
    }
  }, [isSignedIn, role, navigate]);

  // Redirect to specific signup flows
  useEffect(() => {
    // Default redirect to client signup for simplicity
    navigate("/sign-up/client", { replace: true });
  }, [navigate]);

  // This component now just redirects - keeping minimal structure for compatibility

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Choose your path</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                How would you like to use MindFolk?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              <div className="space-y-4">
                <Link
                  to="/sign-up/client"
                  className="block p-6 border rounded-lg hover:border-[hsl(var(--primary))] hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-primary text-[hsl(var(--text-lg))] font-semibold">I'm seeking therapy</h3>
                      <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm mt-1">
                        Find and book sessions with licensed therapists
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/sign-up/therapist"
                  className="block p-6 border rounded-lg hover:border-[hsl(var(--primary))] hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-primary text-[hsl(var(--text-lg))] font-semibold">I'm a therapist</h3>
                      <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm mt-1">
                        Provide therapy services and manage your practice
                      </p>
                      <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs mt-1 italic">
                        Application required • Manual approval
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              
              <div className="text-center space-y-[--space-xs]">
                <Link to="/sign-in" className="text-sm text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] font-secondary">
                  Already have an account? Sign in
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

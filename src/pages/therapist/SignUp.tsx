import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { AlertCircle, Eye, EyeOff, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Stack } from "@/components/layout/layout-atoms";

export default function TherapistSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    notifyEmail: true,
    notifySMS: false,
    enable2FA: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    therapyData: true, // Required for service
    professionalData: true // Required for therapist verification
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    if (!consentPreferences.therapyData || !consentPreferences.professionalData) {
      setError("Professional data processing consent is required for therapist accounts");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Save consent preferences
      localStorage.setItem('user-consent-preferences', JSON.stringify({
        ...consentPreferences,
        timestamp: new Date().toISOString(),
        version: '2.0'
      }));
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/t/onboarding`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: 'therapist', // Mark this as a therapist sign-up
            notify_email: !!formData.notifyEmail,
            notify_sms: !!formData.notifySMS,
            mfa_enroll_on_first_login: !!formData.enable2FA,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect to onboarding for therapists
        // navigate("/t/onboarding");
        setSignupSuccess(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
        <Header />
        <main className="flex-grow">
          <Container className="py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-lg text-center">
              <div className="p-8 border rounded-lg shadow-lg bg-card text-card-foreground">
                <UserCheck className="w-16 h-16 mx-auto text-green-500" />
                <h1 className="text-3xl font-bold mt-4">Confirm your email</h1>
                <p className="text-muted-foreground mt-2">
                  We've sent a confirmation link to <strong>{formData.email}</strong>.
                  Please check your inbox (and spam folder!) to continue.
                </p>
                <Button onClick={() => navigate("/t/onboarding")} className="mt-6">
                  Go to Onboarding
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-[hsl(var(--on-primary))]" />
              </div>
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Join as a Therapist</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                Create your professional MindFolk account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              
              <form onSubmit={handleSubmit} className="space-y-[--space-md]">
                {error && (
                  <div className="flex items-center space-x-[--space-xs] text-sm text-[hsl(var(--error-text))] bg-destructive/10 p-[--space-sm] rounded-md">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-secondary">{error}</span>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="First name"
                      className="min-h-[--touch-target-min]"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      aria-describedby="firstName-required"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Last name"
                      className="min-h-[--touch-target-min]"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      aria-describedby="lastName-required"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Professional Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your professional email"
                    className="min-h-[--touch-target-min]"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    aria-describedby="email-required"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="min-h-[--touch-target-min] pr-12"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      aria-describedby="password-requirements"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent min-h-[--touch-target-min] min-w-[--touch-target-min]"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-text-muted" />
                      ) : (
                        <Eye className="h-4 w-4 text-text-muted" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-text-muted font-secondary">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Confirm your password"
                    className="min-h-[--touch-target-min]"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    aria-describedby="confirmPassword-match"
                  />
                </div>
                
              {/* Notifications & Security (pre-dashboard) */}
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))] text-sm">Notifications & Security</h4>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifyEmail" checked={formData.notifyEmail} onCheckedChange={(c) => handleInputChange("notifyEmail", String(c === true))} />
                  <label htmlFor="notifyEmail" className="text-sm font-secondary text-text-secondary">Email notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifySMS" checked={formData.notifySMS} onCheckedChange={(c) => handleInputChange("notifySMS", String(c === true))} />
                  <label htmlFor="notifySMS" className="text-sm font-secondary text-text-secondary">SMS notifications</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="enable2FA" checked={formData.enable2FA} onCheckedChange={(c) => handleInputChange("enable2FA", String(c === true))} />
                  <label htmlFor="enable2FA" className="text-sm font-secondary text-text-secondary">Require 2FA on first login</label>
                </div>
                <p className="text-[10px] text-text-muted font-secondary">You can change these later in settings.</p>
              </div>

                <Stack className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                      aria-describedby="terms-description"
                    />
                    <label htmlFor="terms" className="text-sm font-secondary text-text-secondary">
                      I agree to the{" "}
                      <Link to="/legal/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/legal/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="space-y-3 p-4 bg-[hsl(var(--surface-accent))] border rounded-lg">
                    <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))] text-sm">
                      Professional Data Processing Consent
                    </h4>
                    <p className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                      As a therapist, we need additional consent for professional verification and practice management:
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="essential" 
                          checked={consentPreferences.essential}
                          disabled
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-describedby="essential-description"
                        />
                        <label htmlFor="essential" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Essential cookies and data (required for site functionality)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="professional-data" 
                          checked={consentPreferences.professionalData}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, professionalData: checked === true }))
                          }
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-describedby="professional-data-description"
                        />
                        <label htmlFor="professional-data" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Professional credentials and verification data (required for therapist accounts)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="therapy-data" 
                          checked={consentPreferences.therapyData}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, therapyData: checked === true }))
                          }
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-describedby="therapy-data-description"
                        />
                        <label htmlFor="therapy-data" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Therapy data processing (required for client matching and sessions)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="analytics" 
                          checked={consentPreferences.analytics}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, analytics: checked === true }))
                          }
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-describedby="analytics-description"
                        />
                        <label htmlFor="analytics" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Analytics and usage data (help improve our service)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="marketing" 
                          checked={consentPreferences.marketing}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, marketing: checked === true }))
                          }
                          className="min-h-[--touch-target-min] min-w-[--touch-target-min]"
                          aria-describedby="marketing-description"
                        />
                        <label htmlFor="marketing" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Marketing communications (newsletters, promotions)
                        </label>
                      </div>
                    </div>
                  </div>
                </Stack>
                
                <Button type="submit" className="w-full min-h-touch-target max-w-[320px] mx-auto" aria-label="Create therapist account" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Therapist Account"}
                </Button>
              </form>
              
              <div className="text-center space-y-[--space-xs]">
                <Link to="/sign-in" className="text-sm text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] font-secondary">
                  Already have an account? Sign in
                </Link>
                <div className="text-xs text-[hsl(var(--text-secondary))] font-secondary">
                  Looking for client account?{" "}
                  <Link to="/sign-up" className="text-primary hover:underline">
                    Sign up as client
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
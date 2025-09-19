import { useState, useEffect } from "react";
import { useAuth, useSignUp, useUser } from "@clerk/clerk-react";
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
import { AlertCircle, Eye, EyeOff, Users } from "lucide-react";
import { useUserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";

export default function SignUpClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    therapyData: true
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  
  const { isSignedIn } = useAuth();
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();
  const { role } = useUserRole();
  const navigate = useNavigate();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      const redirectTo = getRoleBasedRedirect(role);
      navigate(redirectTo, { replace: true });
    }
  }, [isSignedIn, role, navigate]);

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
    
    if (!consentPreferences.therapyData) {
      setError("Therapy data processing consent is required to use our service");
      return;
    }
    
    if (!signUp) return;
    
    setIsLoading(true);
    
    try {
      // Save consent preferences
      localStorage.setItem('user-consent-preferences', JSON.stringify({
        ...consentPreferences,
        timestamp: new Date().toISOString(),
        version: '2.0'
      }));

      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        unsafeMetadata: {
          role: "client",
          status: "active"
        }
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ 
        strategy: "email_code"
      });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUp) return;
    
    setIsLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Client role is automatically active, redirect to discovery
        navigate("/discover", { replace: true });
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code.");
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
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Sign up as a Client</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                Find and book sessions with licensed therapists
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              {!pendingVerification ? (
                <>
                  <SocialLogin mode="signup" />
                  
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
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pr-12"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-[hsl(var(--text-secondary))] font-secondary">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                    <label htmlFor="terms" className="text-sm font-secondary text-[hsl(var(--text-secondary))]">
                      I agree to the{" "}
                      <Link to="/legal/terms" className="text-[hsl(var(--primary))] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/legal/privacy" className="text-[hsl(var(--primary))] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="space-y-3 p-4 bg-[hsl(var(--surface-variant))] border rounded-lg">
                    <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))] text-sm">
                      Data Processing Consent
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="essential" 
                          checked={consentPreferences.essential}
                          disabled
                        />
                        <label htmlFor="essential" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Essential cookies and data (required)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="therapy-data" 
                          checked={consentPreferences.therapyData}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, therapyData: checked === true }))
                          }
                        />
                        <label htmlFor="therapy-data" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Therapy data processing (required for matching)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="analytics" 
                          checked={consentPreferences.analytics}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, analytics: checked === true }))
                          }
                        />
                        <label htmlFor="analytics" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Analytics data (help improve our service)
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="marketing" 
                          checked={consentPreferences.marketing}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, marketing: checked === true }))
                          }
                        />
                        <label htmlFor="marketing" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Marketing communications (optional)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Client Account"}
                    </Button>
                  </form>
                  
                  <div className="text-center space-y-[--space-xs]">
                    <Link to="/sign-in" className="text-sm text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] font-secondary">
                      Already have an account? Sign in
                    </Link>
                    <div className="text-xs text-[hsl(var(--text-secondary))] font-secondary">
                      Are you a therapist? <Link to="/sign-up/therapist" className="text-[hsl(var(--primary))] hover:underline">Sign up here</Link>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleVerification} className="space-y-[--space-md]">
                  {error && (
                    <div className="flex items-center space-x-[--space-xs] text-sm text-[hsl(var(--error-text))] bg-destructive/10 p-[--space-sm] rounded-md">
                      <AlertCircle className="w-4 w-4" />
                      <span className="font-secondary">{error}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-center">
                    <h3 className="font-primary text-[hsl(var(--text-xl))]">Check your email</h3>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] text-sm">
                      We sent a verification code to {formData.email}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verification">Verification Code</Label>
                    <Input 
                      id="verification" 
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setPendingVerification(false)}
                      className="text-sm font-secondary"
                    >
                      Back to sign up
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
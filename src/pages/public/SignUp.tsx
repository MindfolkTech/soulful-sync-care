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
import { SocialLogin } from "@/components/auth/social-login";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
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
    essential: true, // Always required
    analytics: false,
    marketing: false,
    therapyData: true // Required for service
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    
    setIsLoading(true);
    
    try {
      // Save consent preferences
      localStorage.setItem('user-consent-preferences', JSON.stringify({
        ...consentPreferences,
        timestamp: new Date().toISOString(),
        version: '2.0'
      }));
      
      // TODO: Implement sign up
      console.log("Sign up:", formData, consentPreferences);
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Get started</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                Create your MindFolk account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              <SocialLogin mode="signup" />
              
              <form onSubmit={handleSubmit} className="space-y-[--space-md]">
                {error && (
                  <div className="flex items-center space-x-[--space-xs] text-sm text-destructive bg-destructive/10 p-[--space-sm] rounded-md">
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
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
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
                
                <div className="space-y-4">
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
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="space-y-3 p-4 bg-background border rounded-lg">
                    <h4 className="font-primary font-semibold text-text-primary text-sm">
                      Data Processing Consent
                    </h4>
                    <p className="text-xs font-secondary text-text-secondary">
                      We need your consent to process different types of data. You can choose which you're comfortable with:
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
                        <label htmlFor="essential" className="text-xs font-secondary text-text-secondary">
                          Essential cookies and data (required for site functionality)
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
                        <label htmlFor="therapy-data" className="text-xs font-secondary text-text-secondary">
                          Therapy data processing (required for matching and sessions)
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
                        <label htmlFor="analytics" className="text-xs font-secondary text-text-secondary">
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
                        <label htmlFor="marketing" className="text-xs font-secondary text-text-secondary">
                          Marketing communications (newsletters, promotions)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full min-h-touch-target max-w-[320px] mx-auto" aria-label="Create new account" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
              
              <div className="text-center space-y-[--space-xs]">
                <Link to="/sign-in" className="text-sm text-text-secondary hover:text-text-primary font-secondary">
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

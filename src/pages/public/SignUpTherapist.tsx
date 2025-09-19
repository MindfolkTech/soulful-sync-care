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
import { Textarea } from "@/components/ui/textarea";
import { SocialLogin } from "@/components/auth/social-login";
import { AlertCircle, Eye, EyeOff, Stethoscope, Clock } from "lucide-react";
import { useUserRole, getRoleBasedRedirect } from "@/hooks/use-user-role";

export default function SignUpTherapist() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    licenseState: "",
    yearsExperience: "",
    specialties: "",
    motivation: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToProfessional, setAgreedToProfessional] = useState(false);
  const [consentPreferences, setConsentPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    therapyData: true,
    backgroundCheck: true
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
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

    if (!agreedToProfessional) {
      setError("Please agree to the Professional Therapist Terms");
      return;
    }
    
    if (!consentPreferences.therapyData) {
      setError("Therapy data processing consent is required to provide services");
      return;
    }

    if (!consentPreferences.backgroundCheck) {
      setError("Background check consent is required for therapist verification");
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
          role: "therapist",
          status: "pending",
          applicationData: {
            licenseNumber: formData.licenseNumber,
            licenseState: formData.licenseState,
            yearsExperience: formData.yearsExperience,
            specialties: formData.specialties,
            motivation: formData.motivation,
            submittedAt: new Date().toISOString()
          }
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
        // Show application submitted state
        setApplicationSubmitted(true);
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
          <Container size="sm">
            <Card className="w-full max-w-md mx-auto text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <h1 className="font-primary text-[hsl(var(--text-2xl))]">Application Submitted</h1>
                <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                  Thank you for applying to become a therapist on MindFolk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                  <h3 className="font-primary font-semibold text-yellow-800 text-sm mb-2">
                    What happens next?
                  </h3>
                  <ul className="text-sm text-yellow-700 font-secondary space-y-1">
                    <li>• We'll review your application and credentials</li>
                    <li>• Our team will verify your license and qualifications</li>
                    <li>• You'll receive an email within 2-3 business days</li>
                    <li>• Once approved, you can access your therapist dashboard</li>
                  </ul>
                </div>
                
                <div className="text-sm text-[hsl(var(--text-secondary))] font-secondary">
                  <p>Questions about your application?</p>
                  <Link to="/contact" className="text-[hsl(var(--primary))] hover:underline">
                    Contact our support team
                  </Link>
                </div>

                <Button 
                  onClick={() => navigate("/sign-in")}
                  className="w-full"
                >
                  Sign In to Check Status
                </Button>
              </CardContent>
            </Card>
          </Container>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-[--space-2xl]">
        <Container size="sm">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="font-primary text-[hsl(var(--text-2xl))]">Join as a Therapist</h1>
              <CardDescription className="font-secondary text-[hsl(var(--text-secondary))]">
                Provide therapy services and manage your practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-[--space-lg]">
              {!pendingVerification ? (
                <>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-secondary">
                      <strong>Professional Application:</strong> All therapist accounts require manual verification. 
                      Please provide accurate licensing information for fastest approval.
                    </p>
                  </div>

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
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
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
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Professional email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
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
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                  />
                </div>

                {/* Professional Information */}
                <div className="pt-4 border-t border-[hsl(var(--border))]">
                  <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-4">
                    Professional Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Input 
                        id="licenseNumber" 
                        placeholder="e.g. L123456"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseState">License State *</Label>
                      <Input 
                        id="licenseState" 
                        placeholder="e.g. CA, NY"
                        value={formData.licenseState}
                        onChange={(e) => handleInputChange("licenseState", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Input 
                      id="yearsExperience" 
                      type="number"
                      placeholder="e.g. 5"
                      min="0"
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialties">Specialties *</Label>
                    <Input 
                      id="specialties" 
                      placeholder="e.g. Anxiety, Depression, Couples Therapy"
                      value={formData.specialties}
                      onChange={(e) => handleInputChange("specialties", e.target.value)}
                      required
                    />
                    <p className="text-xs text-[hsl(var(--text-secondary))] font-secondary">
                      Separate multiple specialties with commas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join MindFolk? *</Label>
                    <Textarea 
                      id="motivation" 
                      placeholder="Tell us about your motivation to provide therapy through our platform..."
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                      className="mt-1"
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

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="professional" 
                      checked={agreedToProfessional}
                      onCheckedChange={(checked) => setAgreedToProfessional(checked === true)}
                      className="mt-1"
                    />
                    <label htmlFor="professional" className="text-sm font-secondary text-[hsl(var(--text-secondary))]">
                      I certify that I am a licensed mental health professional and agree to the{" "}
                      <Link to="/legal/professional-terms" className="text-[hsl(var(--primary))] hover:underline">
                        Professional Therapist Terms
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
                          Therapy data processing (required for providing services)
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="background-check" 
                          checked={consentPreferences.backgroundCheck}
                          onCheckedChange={(checked) => 
                            setConsentPreferences(prev => ({ ...prev, backgroundCheck: checked === true }))
                          }
                        />
                        <label htmlFor="background-check" className="text-xs font-secondary text-[hsl(var(--text-secondary))]">
                          Background check and credential verification (required)
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
                          Analytics data (help improve our platform)
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
                      {isLoading ? "Submitting application..." : "Submit Application"}
                    </Button>
                  </form>
                  
                  <div className="text-center space-y-[--space-xs]">
                    <Link to="/sign-in" className="text-sm text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] font-secondary">
                      Already have an account? Sign in
                    </Link>
                    <div className="text-xs text-[hsl(var(--text-secondary))] font-secondary">
                      Looking for therapy? <Link to="/sign-up/client" className="text-[hsl(var(--primary))] hover:underline">Sign up as a client</Link>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleVerification} className="space-y-[--space-md]">
                  {error && (
                    <div className="flex items-center space-x-[--space-xs] text-sm text-[hsl(var(--error-text))] bg-destructive/10 p-[--space-sm] rounded-md">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-secondary">{error}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-center">
                    <h3 className="font-primary text-[hsl(var(--text-xl))]">Verify your email</h3>
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
                    {isLoading ? "Verifying..." : "Verify Email & Submit Application"}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setPendingVerification(false)}
                      className="text-sm font-secondary"
                    >
                      Back to application
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
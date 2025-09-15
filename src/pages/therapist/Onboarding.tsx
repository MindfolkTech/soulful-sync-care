import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Lightbulb, 
  Eye, 
  Save, 
  CheckCircle2,
  Star,
  Clock,
  Users,
  Heart
} from "lucide-react";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to MindFolk",
    subtitle: "Join our community of verified therapists",
    tip: "Take your time - you can save progress and return anytime",
    example: "See how other therapists have built successful practices on MindFolk"
  },
  {
    id: 2,
    title: "Professional Credentials",
    subtitle: "Tell us about your qualifications",
    tip: "Include all relevant qualifications - clients trust verified professionals",
    example: "Dr. Sarah Chen, Clinical Psychologist (HCPC Registered, 8 years experience)"
  },
  {
    id: 3,
    title: "Therapeutic Approach",
    subtitle: "Describe your specialties and style",
    tip: "Be specific about your approach - it helps clients find the right fit",
    example: "CBT specialist focusing on anxiety and depression with empathetic, structured approach"
  },
  {
    id: 4,
    title: "Profile Content",
    subtitle: "Create your professional profile",
    tip: "Your bio is your first impression - make it authentic and welcoming",
    example: "I help people overcome anxiety through evidence-based techniques in a warm, supportive environment."
  },
  {
    id: 5,
    title: "Video Introduction",
    subtitle: "Optional but strongly encouraged",
    tip: "Videos increase client compatibility by 74% - worth the extra effort!",
    example: "Keep it natural, introduce yourself, and explain your approach in 30-60 seconds"
  },
  {
    id: 6,
    title: "Professional Verification",
    subtitle: "Upload your credentials",
    tip: "Verification typically takes 24-48 hours - you can start with chemistry calls while waiting",
    example: "Clear photos of documents work best - ensure text is readable"
  }
];

export default function TherapistOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    experience: "",
    registrations: [],
    modalities: [],
    specialties: [],
    communicationStyle: "",
    bio: "",
    quote: "",
    headshot: null,
    video: null,
    documents: {}
  });

  const progress = (currentStep / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps.find(s => s.id === currentStep);

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('therapistOnboarding', JSON.stringify({
        currentStep,
        profileData,
        timestamp: Date.now()
      }));
      setSavedProgress(true);
      setTimeout(() => setSavedProgress(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentStep, profileData]);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { currentStep: savedStep, profileData: savedData } = JSON.parse(saved);
      setCurrentStep(savedStep);
      setProfileData(savedData);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Progress value={progress} className="h-2 flex-1" />
                  <span className="text-sm text-text-secondary font-secondary whitespace-nowrap">
                    Step {currentStep} of {onboardingSteps.length}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {savedProgress && (
                    <div className="flex items-center space-x-2 text-[var(--success-bg)]">
                      <Save className="w-4 h-4" />
                      <span className="text-sm font-secondary">Saved</span>
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </Button>
                </div>
              </div>
              
              {/* Step Tip */}
              <div className="bg-[var(--surface-accent)] p-4 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-[var(--garden-green)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-secondary text-text-primary text-sm font-medium mb-1">
                      💡 Tip: {currentStepData?.tip}
                    </p>
                    <p className="font-secondary text-text-secondary text-sm">
                      Example: {currentStepData?.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">

            <Card className="min-h-[500px]">
              <CardHeader className="text-center">
                <CardTitle className="font-primary text-2xl text-text-primary">
                  {currentStepData?.title}
                </CardTitle>
                <p className="font-secondary text-text-secondary">
                  {currentStepData?.subtitle}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="text-center space-y-6">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-primary font-bold text-xl">M</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-primary text-lg font-semibold text-text-primary">
                          Why join MindFolk?
                        </h3>
                        <ul className="font-secondary text-text-secondary space-y-2 text-left max-w-md mx-auto">
                          <li>• Compatibility-focused matching reduces early drop-off</li>
                          <li>• Control over your rates and schedule</li>
                          <li>• All-in-one practice management</li>
                          <li>• Video profiles help clients connect with your style</li>
                        </ul>
                      </div>
                    </div>
                    <Button size="lg" className="w-full">Get Started</Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter your first name"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter your last name"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input 
                        id="title" 
                        placeholder="e.g., Clinical Psychologist, Counsellor"
                        value={profileData.title}
                        onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background"
                        value={profileData.experience}
                        onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                      >
                        <option value="">Select experience level</option>
                        <option value="0-2 years">0-2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registration">Professional Body Registration</Label>
                      <div className="space-y-2">
                        {["BACP", "UKCP", "HCPC", "BABCP", "BPS"].map((body) => (
                          <div key={body} className="flex items-center space-x-2">
                            <Checkbox 
                              id={body}
                              checked={profileData.registrations.includes(body)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProfileData({...profileData, registrations: [...profileData.registrations, body]});
                                } else {
                                  setProfileData({...profileData, registrations: profileData.registrations.filter(r => r !== body)});
                                }
                              }}
                            />
                            <label htmlFor={body} className="font-secondary text-text-primary">
                              {body}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Therapeutic Modalities (Select up to 3)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["CBT", "EMDR", "Psychodynamic", "Humanistic", "Mindfulness", "Gestalt", "Family Therapy", "Solution-Focused"].map((modality) => (
                          <div key={modality} className="flex items-center space-x-2">
                            <Checkbox 
                              id={modality}
                              checked={profileData.modalities.includes(modality)}
                              disabled={profileData.modalities.length >= 3 && !profileData.modalities.includes(modality)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProfileData({...profileData, modalities: [...profileData.modalities, modality]});
                                } else {
                                  setProfileData({...profileData, modalities: profileData.modalities.filter(m => m !== modality)});
                                }
                              }}
                            />
                            <label htmlFor={modality} className="font-secondary text-text-primary text-sm">
                              {modality}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-text-muted font-secondary">
                        {profileData.modalities.length}/3 selected
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Specialties (Select up to 5)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Grief", "Identity", "Addiction"].map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox 
                              id={specialty}
                              checked={profileData.specialties.includes(specialty)}
                              disabled={profileData.specialties.length >= 5 && !profileData.specialties.includes(specialty)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setProfileData({...profileData, specialties: [...profileData.specialties, specialty]});
                                } else {
                                  setProfileData({...profileData, specialties: profileData.specialties.filter(s => s !== specialty)});
                                }
                              }}
                            />
                            <label htmlFor={specialty} className="font-secondary text-text-primary text-sm">
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-text-muted font-secondary">
                        {profileData.specialties.length}/5 selected
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Communication Style</Label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background"
                        value={profileData.communicationStyle}
                        onChange={(e) => setProfileData({...profileData, communicationStyle: e.target.value})}
                      >
                        <option value="">Select your communication style</option>
                        <option value="Empathetic and understanding">Empathetic and understanding</option>
                        <option value="Structured and goal-oriented">Structured and goal-oriented</option>
                        <option value="Flexible and adaptable">Flexible and adaptable</option>
                        <option value="Calm and process-focused">Calm and process-focused</option>
                      </select>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio (200-400 words)</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell potential clients about your approach, experience, and what makes you unique..."
                        rows={6}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      />
                      <p className="text-xs text-text-muted font-secondary">
                        {profileData.bio.length}/400 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote">Client Quote (50-100 words)</Label>
                      <Textarea 
                        id="quote" 
                        placeholder="A warm, welcoming message for potential clients..."
                        rows={3}
                        value={profileData.quote}
                        onChange={(e) => setProfileData({...profileData, quote: e.target.value})}
                      />
                      <p className="text-xs text-text-muted font-secondary">
                        {profileData.quote.length}/100 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headshot">Professional Headshot (Required)</Label>
                      <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-text-muted mb-2" />
                        <p className="font-secondary text-text-secondary">
                          Upload a professional headshot
                        </p>
                        <p className="font-secondary text-text-muted text-sm">
                          Good lighting, neutral background recommended
                        </p>
                        <Button variant="outline" className="mt-2">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 text-center">
                    <div className="space-y-4">
                      <h3 className="font-primary text-lg font-semibold text-text-primary">
                        Why video matters
                      </h3>
                      <div className="text-left space-y-2 max-w-md mx-auto">
                        <p className="font-secondary text-text-secondary text-sm">
                          • 88% of clients believe videos help them find the right fit faster
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • 74% higher compatibility rates with video profiles
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • Reduces early session drop-offs
                        </p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-[--border] rounded-lg p-8">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-secondary font-semibold text-text-primary mb-2">
                        Record your 30-60 second introduction
                      </h4>
                      <p className="font-secondary text-text-secondary text-sm mb-4">
                        Good lighting, clear audio, and authentic personality
                      </p>
                      <Button>Start Recording</Button>
                    </div>

                    <Button variant="tertiary">Skip for now (you can add this later)</Button>
                  </div>
                )}

                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-primary text-lg font-semibold text-text-primary">
                        Upload Verification Documents
                      </h3>
                      <p className="font-secondary text-text-secondary">
                        We'll verify your credentials within 24-48 hours
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <Label className="font-secondary font-semibold">Government ID</Label>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload ID
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <Label className="font-secondary font-semibold">Professional Registration Certificate</Label>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Certificate
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <Label className="font-secondary font-semibold">Registration Number</Label>
                        <Input className="mt-2" placeholder="Enter your registration number" />
                      </div>
                    </div>

                    <div className="bg-surface-accent p-4 rounded-lg">
                      <p className="font-secondary text-text-secondary text-sm">
                        <strong>During verification:</strong> You can schedule chemistry calls but not full sessions. 
                        Full access will be granted once verification is complete.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={() => setCurrentStep(Math.min(onboardingSteps.length, currentStep + 1))}
                disabled={currentStep === onboardingSteps.length}
              >
                {currentStep === onboardingSteps.length ? "Complete Setup" : "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
              </div>

              {/* Profile Preview Sidebar */}
              {showPreview && (
                <div className="lg:col-span-1">
                  <Card className="sticky top-8">
                    <CardHeader>
                      <CardTitle className="font-primary text-lg text-text-primary flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Live Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Profile Image Placeholder */}
                        <div className="w-24 h-24 mx-auto bg-[var(--surface-accent)] rounded-full flex items-center justify-center">
                          {profileData.headshot ? (
                            <img src={profileData.headshot} alt="Profile" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-[var(--text-muted)] font-primary text-lg">
                              {profileData.firstName?.[0] || '?'}
                            </span>
                          )}
                        </div>

                        {/* Name and Title */}
                        <div className="text-center">
                          <h3 className="font-primary text-lg font-semibold text-text-primary">
                            {profileData.firstName && profileData.lastName 
                              ? `${profileData.firstName} ${profileData.lastName}` 
                              : 'Your Name'
                            }
                          </h3>
                          <p className="font-secondary text-text-secondary text-sm">
                            {profileData.title || 'Professional Title'}
                          </p>
                          {profileData.experience && (
                            <p className="font-secondary text-text-muted text-xs">
                              {profileData.experience} experience
                            </p>
                          )}
                        </div>

                        {/* Registrations */}
                        {profileData.registrations.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-secondary text-text-secondary text-xs font-medium">Registrations</p>
                            <div className="flex flex-wrap gap-1">
                              {profileData.registrations.map((reg) => (
                                <Badge key={reg} variant="secondary" className="text-xs">
                                  {reg}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Modalities */}
                        {profileData.modalities.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-secondary text-text-secondary text-xs font-medium">Approaches</p>
                            <div className="flex flex-wrap gap-1">
                              {profileData.modalities.slice(0, 3).map((modality) => (
                                <Badge key={modality} variant="outline" className="text-xs">
                                  {modality}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Bio Preview */}
                        {profileData.bio && (
                          <div className="space-y-2">
                            <p className="font-secondary text-text-secondary text-xs font-medium">Bio Preview</p>
                            <p className="font-secondary text-text-primary text-sm leading-relaxed">
                              {profileData.bio.length > 100 
                                ? `${profileData.bio.substring(0, 100)}...` 
                                : profileData.bio
                              }
                            </p>
                          </div>
                        )}

                        {/* Quote */}
                        {profileData.quote && (
                          <div className="space-y-2">
                            <p className="font-secondary text-text-secondary text-xs font-medium">Quote</p>
                            <blockquote className="font-primary text-text-primary text-sm italic">
                              "{profileData.quote}"
                            </blockquote>
                          </div>
                        )}

                        {/* Completion Status */}
                        <div className="pt-4 border-t border-[var(--border)]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-secondary text-text-secondary">Profile Complete</span>
                            <span className="font-secondary text-[var(--garden-green)] font-medium">
                              {Math.round((Object.values(profileData).filter(v => v && v !== "").length / Object.keys(profileData).length) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(Object.values(profileData).filter(v => v && v !== "").length / Object.keys(profileData).length) * 100} 
                            className="h-1 mt-2" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
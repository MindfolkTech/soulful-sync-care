import { useState } from "react";
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
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to MindFolk",
    subtitle: "Join our community of verified therapists"
  },
  {
    id: 2,
    title: "Professional Credentials",
    subtitle: "Tell us about your qualifications"
  },
  {
    id: 3,
    title: "Therapeutic Approach",
    subtitle: "Describe your specialties and style"
  },
  {
    id: 4,
    title: "Profile Content",
    subtitle: "Create your professional profile"
  },
  {
    id: 5,
    title: "Video Introduction",
    subtitle: "Optional but strongly encouraged"
  },
  {
    id: 6,
    title: "Professional Verification",
    subtitle: "Upload your credentials"
  }
];

export default function TherapistOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const progress = (currentStep / onboardingSteps.length) * 100;
  const currentStepData = onboardingSteps.find(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Progress value={progress} className="h-2 mb-4" />
              <p className="text-sm text-text-secondary font-secondary text-center">
                Step {currentStep} of {onboardingSteps.length}
              </p>
            </div>

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
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" placeholder="e.g., Clinical Psychologist, Counsellor" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <select className="w-full p-2 border rounded-md bg-background">
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
                            <Checkbox id={body} />
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
                            <Checkbox id={modality} />
                            <label htmlFor={modality} className="font-secondary text-text-primary text-sm">
                              {modality}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Specialties (Select up to 5)</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Grief", "Identity", "Addiction"].map((specialty) => (
                          <div key={specialty} className="flex items-center space-x-2">
                            <Checkbox id={specialty} />
                            <label htmlFor={specialty} className="font-secondary text-text-primary text-sm">
                              {specialty}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Communication Style</Label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option>Empathetic and understanding</option>
                        <option>Structured and goal-oriented</option>
                        <option>Flexible and adaptable</option>
                        <option>Calm and process-focused</option>
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quote">Client Quote (50-100 words)</Label>
                      <Textarea 
                        id="quote" 
                        placeholder="A warm, welcoming message for potential clients..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headshot">Professional Headshot (Required)</Label>
                      <div className="border-2 border-dashed border-[--border] rounded-lg p-6 text-center">
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
        </Container>
      </main>

      <Footer />
    </div>
  );
}
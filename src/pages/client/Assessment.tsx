import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import celebrationIllustration from "@/assets/celebration-illustration.jpg";

const assessmentSteps = [
  {
    id: 1,
    title: "Welcome & Value Proposition",
    content: "Find the right therapist for you",
    subtitle: "Because everyone's mental health journey is different",
    type: "welcome"
  },
  {
    id: 2,
    title: "Account Creation",
    content: "Getting started - Let's save your profile by signing up",
    type: "signup"
  },
  {
    id: 3,
    title: "What brings you here today?",
    content: "Choose what feels right - you can select multiple",
    options: [
      "Anxiety and everyday worries",
      "Feeling low or depressed", 
      "Relationship challenges",
      "Work and life stress",
      "Family and parenting",
      "Identity and self-discovery",
      "Past experiences and trauma"
    ],
    type: "multiple-choice",
    maxOptions: 7
  },
  {
    id: 4,
    title: "Ideal therapist communication style",
    content: "Choose up to 3",
    options: [
      "Empathetic and understanding",
      "Motivational and encouraging",
      "Pragmatic and problem solving", 
      "Flexible and adaptable",
      "Structured and goal-oriented",
      "Exploratory and insight-based",
      "Calm and process-focused",
      "Gently challenging and direct",
      "I'm still figuring this out"
    ],
    type: "multiple-choice",
    maxOptions: 3
  },
  {
    id: 5,
    title: "A bit about you",
    content: "Help us understand your background",
    type: "demographics"
  },
  {
    id: 6,
    title: "What matters most to you?",
    content: "Select your core values - choose up to 5",
    options: [
      "Personal growth and self-discovery",
      "Strong relationships and connection",
      "Career success and achievement",
      "Family and community",
      "Creativity and self-expression",
      "Health and wellness",
      "Financial security",
      "Adventure and new experiences",
      "Helping others and giving back",
      "Spirituality and meaning"
    ],
    type: "multiple-choice",
    maxOptions: 5
  },
  {
    id: 7,
    title: "Session preferences",
    content: "How would you like to meet?",
    options: [
      "Video calls only",
      "Phone calls only", 
      "Either video or phone is fine",
      "I'd prefer to start with phone calls"
    ],
    type: "single-choice"
  },
  {
    id: 8,
    title: "Previous therapy experience",
    content: "Have you worked with a therapist before?",
    options: [
      "This is my first time",
      "I've tried therapy once or twice", 
      "I've had multiple therapy experiences",
      "I'm currently seeing someone but looking for a change"
    ],
    type: "single-choice"
  },
  {
    id: 9,
    title: "Perfect! We're matching you now...",
    content: "Based on your responses, we're finding therapists who are the best fit for you.",
    subtitle: "This usually takes just a few seconds",
    type: "completion"
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [demographicData, setDemographicData] = useState({
    age: "",
    gender: "",
    location: "",
    timezone: ""
  });
  const [isMatching, setIsMatching] = useState(false);

  const handleOptionToggle = (stepId: number, option: string) => {
    const currentResponses = responses[stepId] || [];
    const step = assessmentSteps.find(s => s.id === stepId);
    const maxOptions = step?.maxOptions || Infinity;

    if (currentResponses.includes(option)) {
      setResponses({
        ...responses,
        [stepId]: currentResponses.filter(r => r !== option)
      });
    } else if (currentResponses.length < maxOptions) {
      setResponses({
        ...responses,
        [stepId]: [...currentResponses, option]
      });
    }
  };

  const handleSingleChoice = (stepId: number, option: string) => {
    setResponses({
      ...responses,
      [stepId]: [option]
    });
  };

  const handleContinue = () => {
    if (currentStep === 9) {
      setIsMatching(true);
      // Simulate matching process
      setTimeout(() => {
        window.location.href = "/client/discover";
      }, 3000);
    } else {
      setCurrentStep(Math.min(assessmentSteps.length, currentStep + 1));
    }
  };

  const currentStepData = assessmentSteps.find(s => s.id === currentStep);
  const progress = (currentStep / assessmentSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Progress value={progress} className="h-2 mb-4" />
              <p className="text-sm text-text-secondary font-secondary text-center">
                Step {currentStep} of {assessmentSteps.length}
              </p>
            </div>

            <Card className="min-h-[400px]">
              <CardHeader className="text-center">
                <CardTitle className="font-primary text-2xl text-text-primary">
                  {currentStepData?.title}
                </CardTitle>
                {currentStepData?.content && (
                  <p className="font-secondary text-text-secondary mt-2">
                    {currentStepData.content}
                  </p>
                )}
                {currentStepData?.subtitle && (
                  <p className="font-secondary text-text-secondary text-sm mt-1">
                    {currentStepData.subtitle}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                {currentStepData?.type === "welcome" && (
                  <div className="text-center space-y-6">
                    <img 
                      src={celebrationIllustration} 
                      alt="Person celebrating mental wellness journey"
                      className="w-48 h-48 mx-auto rounded-lg object-cover"
                    />
                    <div className="space-y-4">
                      <Button size="lg" className="w-full">
                        Start Your Journey
                      </Button>
                      <Button variant="ghost" size="lg" className="w-full">
                        Log in
                      </Button>
                    </div>
                  </div>
                )}

                {currentStepData?.type === "signup" && (
                  <div className="text-center space-y-4">
                    <p className="font-secondary text-text-secondary">
                      We'll create your account during this assessment
                    </p>
                    <Button size="lg" className="w-full">
                      Continue
                    </Button>
                  </div>
                )}

                {currentStepData?.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {currentStepData.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <Checkbox
                          id={option}
                          checked={(responses[currentStep] || []).includes(option)}
                          onCheckedChange={() => handleOptionToggle(currentStep, option)}
                        />
                        <label 
                          htmlFor={option}
                          className="font-secondary text-text-primary cursor-pointer flex-1"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {currentStepData?.type === "single-choice" && (
                  <RadioGroup 
                    value={(responses[currentStep] || [])[0]} 
                    onValueChange={(value) => handleSingleChoice(currentStep, value)}
                  >
                    {currentStepData.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={option} />
                        <label 
                          htmlFor={option}
                          className="font-secondary text-text-primary cursor-pointer flex-1"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentStepData?.type === "demographics" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age Range</Label>
                        <Select value={demographicData.age} onValueChange={(value) => 
                          setDemographicData({...demographicData, age: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18-25">18-25</SelectItem>
                            <SelectItem value="26-35">26-35</SelectItem>
                            <SelectItem value="36-45">36-45</SelectItem>
                            <SelectItem value="46-55">46-55</SelectItem>
                            <SelectItem value="56-65">56-65</SelectItem>
                            <SelectItem value="65+">65+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender Identity</Label>
                        <Select value={demographicData.gender} onValueChange={(value) => 
                          setDemographicData({...demographicData, gender: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select identity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="woman">Woman</SelectItem>
                            <SelectItem value="man">Man</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (City, Country)</Label>
                      <Input 
                        id="location"
                        placeholder="e.g. London, UK"
                        value={demographicData.location}
                        onChange={(e) => setDemographicData({...demographicData, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Preferred Session Times</Label>
                      <Select value={demographicData.timezone} onValueChange={(value) => 
                        setDemographicData({...demographicData, timezone: value})
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="When works best?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am-12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm-5pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm-8pm)</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStepData?.type === "completion" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 mx-auto">
                      {isMatching ? (
                        <Loader2 className="w-16 h-16 animate-spin text-primary" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-background" />
                        </div>
                      )}
                    </div>
                    {isMatching && (
                      <div className="space-y-2">
                        <p className="font-secondary text-text-secondary text-sm">
                          Analyzing your preferences...
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          Finding your perfect matches...
                        </p>
                      </div>
                    )}
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

              <div className="flex space-x-3">
                <Button variant="tertiary">
                  Skip for now
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={currentStep === assessmentSteps.length || isMatching}
                >
                  {currentStep === 9 ? (isMatching ? "Matching..." : "Find My Therapists") : "Continue"}
                  {!isMatching && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
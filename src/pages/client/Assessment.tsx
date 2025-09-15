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
    title: "I want my therapist to be...",
    content: "Choose up to 3 that resonate with you",
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
    content: "Optional - helps us find therapists who understand your experience",
    type: "demographics"
  },
  {
    id: 6,
    title: "It's important to me that my therapist is...",
    content: "Optional - helps us find therapists who truly understand you",
    type: "smart-values"
  },
  {
    id: 7,
    title: "Swipe to Connect",
    content: "We'll show you therapists who match your preferences",
    subtitle: "Swipe right to save to favourites, left to pass",
    type: "explainer"
  },
  {
    id: 8,
    title: "Browse with freedom",
    content: "Explore therapists at your own pace",
    subtitle: "Click on a profile to learn more",
    type: "explainer"
  },
  {
    id: 9,
    title: "We all change",
    content: "Update filtering anytime and find new therapists that match your preferences",
    subtitle: "Find the right therapist for you",
    type: "final-explainer"
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<number, string[]>>({});
  const [demographicData, setDemographicData] = useState({
    primaryLanguage: "",
    culturalIdentity: "",
    genderIdentity: "",
    ageGroup: "",
    sexualOrientation: ""
  });
  const [isMatching, setIsMatching] = useState(false);

  // Language options from PRD
  const languageOptions = [
    "Amharic", "Arabic", "Bengali / Sylheti", "British Sign Language (BSL)", "Bulgarian", "Burmese", "Cantonese", "Croatian", "Czech", "Danish", "Dutch", "English", "Farsi / Dari (Persian)", "Finnish", "French", "German", "Greek", "Gujarati", "Haitian Creole", "Hebrew", "Hindi", "Hungarian", "Igbo", "Italian", "Jamaican Patois (Creole)", "Kurdish", "Latvian", "Lithuanian", "Malay (Bahasa Melayu)", "Mandarin", "Mongolian", "Pashto", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Serbian", "Slovak", "Somali", "Spanish", "Swahili", "Swedish", "Tagalog / Filipino", "Tamil", "Thai", "Turkish", "Urdu", "Vietnamese", "Yoruba"
  ];

  // Smart values options based on demographics
  const getSmartValuesOptions = () => {
    const options = ["Neurodiversity affirming", "Trauma-informed and gentle"];
    
    if (demographicData.sexualOrientation && demographicData.sexualOrientation !== "Straight") {
      options.push("LGBTQ+ friendly and affirming");
    }
    
    if (demographicData.culturalIdentity && demographicData.culturalIdentity !== "British") {
      options.push("Culturally sensitive and aware");
    }
    
    if (demographicData.primaryLanguage && demographicData.primaryLanguage !== "English") {
      options.push("Speaks my native language");
    }
    
    return options;
  };

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
        window.location.href = "/discover";
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
                      <Button size="lg" className="w-full" onClick={handleContinue}>
                        Start Your Journey
                      </Button>
                      <Button variant="ghost" size="lg" className="w-full" onClick={() => window.location.href = '/sign-in'}>
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
                    <Button size="lg" className="w-full" onClick={handleContinue}>
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
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryLanguage">Primary language:</Label>
                        <Select value={demographicData.primaryLanguage} onValueChange={(value) => 
                          setDemographicData({...demographicData, primaryLanguage: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languageOptions.map((lang) => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="culturalIdentity">Cultural identity:</Label>
                        <Select value={demographicData.culturalIdentity} onValueChange={(value) => 
                          setDemographicData({...demographicData, culturalIdentity: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cultural identity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="British">British</SelectItem>
                            <SelectItem value="South Asian">South Asian</SelectItem>
                            <SelectItem value="Black African">Black African</SelectItem>
                            <SelectItem value="Black Caribbean">Black Caribbean</SelectItem>
                            <SelectItem value="Mixed">Mixed</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="genderIdentity">Gender identity:</Label>
                        <Select value={demographicData.genderIdentity} onValueChange={(value) => 
                          setDemographicData({...demographicData, genderIdentity: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender identity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Woman">Woman</SelectItem>
                            <SelectItem value="Man">Man</SelectItem>
                            <SelectItem value="Non-binary">Non-binary</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ageGroup">Age group:</Label>
                        <Select value={demographicData.ageGroup} onValueChange={(value) => 
                          setDemographicData({...demographicData, ageGroup: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18–24">18–24</SelectItem>
                            <SelectItem value="25–34">25–34</SelectItem>
                            <SelectItem value="35–44">35–44</SelectItem>
                            <SelectItem value="45–54">45–54</SelectItem>
                            <SelectItem value="55+">55+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sexualOrientation">Sexual orientation:</Label>
                        <Select value={demographicData.sexualOrientation} onValueChange={(value) => 
                          setDemographicData({...demographicData, sexualOrientation: value})
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sexual orientation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Straight">Straight</SelectItem>
                            <SelectItem value="Gay">Gay</SelectItem>
                            <SelectItem value="Lesbian">Lesbian</SelectItem>
                            <SelectItem value="Bisexual">Bisexual</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="bg-surface-accent p-4 rounded-lg">
                      <p className="font-secondary text-text-secondary text-sm">
                        This information is only used to help match you with compatible therapists
                      </p>
                    </div>
                  </div>
                )}

                {currentStepData?.type === "smart-values" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {getSmartValuesOptions().map((option) => (
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
                  </div>
                )}

                {currentStepData?.type === "explainer" && (
                  <div className="text-center space-y-6">
                    <div className="space-y-4">
                      <div className="text-left space-y-2 max-w-md mx-auto">
                        <p className="font-secondary text-text-secondary text-sm">
                          • Swipe right to save to favourites, left to pass
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • Book free 15-minute chemistry calls
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • Only pay for the sessions you book
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentStepData?.type === "final-explainer" && (
                  <div className="text-center space-y-6">
                    <div className="space-y-4">
                      <div className="text-left space-y-2 max-w-md mx-auto">
                        <p className="font-secondary text-text-secondary text-sm">
                          • Click on a profile to learn more
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • Watch video introductions from therapists
                        </p>
                        <p className="font-secondary text-text-secondary text-sm">
                          • Book free chemistry calls with your favourites
                        </p>
                      </div>
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
                {(currentStep === 5 || currentStep === 6) && (
                  <Button variant="tertiary">
                    Skip this step
                  </Button>
                )}
                <Button
                  onClick={handleContinue}
                  disabled={isMatching}
                >
                  {currentStep === 9 ? (isMatching ? "Matching..." : "Start browsing therapists") : "Continue"}
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
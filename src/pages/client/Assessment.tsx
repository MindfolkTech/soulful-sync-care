import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  }
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<number, string[]>>({});

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
                <Button variant="ghost">
                  Skip for now
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(assessmentSteps.length, currentStep + 1))}
                  disabled={currentStep === assessmentSteps.length}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
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
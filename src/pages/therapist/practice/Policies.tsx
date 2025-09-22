import { useState } from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Sparkles, FileText, Clock, MessageCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PracticePolicies() {
  const [formData, setFormData] = useState({
    cancellationPolicy: "Clients can cancel or reschedule up to 24 hours before the scheduled session time without a fee. Cancellations within 24 hours will be charged the full session fee.",
    reschedulingPolicy: "Rescheduling is flexible up to 24 hours before the session. Please contact me directly to find a new time that works for both of us.",
    latenessPolicy: "If you are late for a session, we will still end at the scheduled time. The session will be charged at the full rate. If I am late, the time will be made up at a later date.",
    communicationPolicy: "Between sessions, you can contact me via the secure messaging platform for brief check-ins. I will respond within one business day. Please note this is not for emergency contact.",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setFormData({
        cancellationPolicy: "Clients can cancel or reschedule up to 24 hours before the scheduled session time without a fee. Cancellations within 24 hours will be charged the full session fee.",
        reschedulingPolicy: "Rescheduling is flexible up to 24 hours before the session. Please contact me directly to find a new time that works for both of us.",
        latenessPolicy: "If you are late for a session, we will still end at the scheduled time. The session will be charged at the full rate. If I am late, the time will be made up at a later date.",
        communicationPolicy: "Between sessions, you can contact me via the secure messaging platform for brief check-ins. I will respond within one business day. Please note this is not for emergency contact."
      });
      setIsGenerating(false);
    }, 1000);
  };

  const policyFields = [
    { 
      id: "cancellationPolicy", 
      label: "Cancellation Policy", 
      placeholder: "e.g., Please provide at least 24 hours notice for cancellations...",
      icon: AlertCircle,
      description: "Define your cancellation rules and any associated fees"
    },
    { 
      id: "reschedulingPolicy", 
      label: "Rescheduling Policy", 
      placeholder: "e.g., Rescheduling is permitted with 24 hours notice...",
      icon: Clock,
      description: "Explain how clients can reschedule appointments"
    },
    { 
      id: "latenessPolicy", 
      label: "Lateness Policy", 
      placeholder: "e.g., Sessions will end at the scheduled time regardless of start time...",
      icon: Clock,
      description: "Set expectations for punctuality and late arrivals"
    },
    { 
      id: "communicationPolicy", 
      label: "Communication Policy", 
      placeholder: "e.g., How you handle communication between sessions...",
      icon: MessageCircle,
      description: "Guidelines for client contact between sessions"
    },
  ] as const;

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))]">Practice Policies</h1>
                <Badge variant="destructive">Required</Badge>
              </div>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Set clear expectations and boundaries for your therapeutic practice</p>
            </div>
            
            <Stack className="space-y-6">
              {/* AI Generation Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Quick Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <p className="font-secondary text-[hsl(var(--text-secondary))] mb-4">
                      Generate professional policy templates tailored to your practice, then customize them to fit your needs.
                    </p>
                    <Button onClick={handleAIGenerate} disabled={isGenerating} variant="outline">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Policy Templates"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">You can edit all suggestions after they're generated.</p>
                </CardContent>
              </Card>
              
              {/* Policy Forms */}
              {policyFields.map(field => {
                const IconComponent = field.icon;
                return (
                  <Card key={field.id}>
                    <CardHeader>
                      <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        {field.label}
                      </CardTitle>
                      <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                        {field.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Label htmlFor={field.id} className="sr-only">{field.label}</Label>
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          className="min-h-[100px]"
                          value={formData[field.id]}
                          onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Policy Tips */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Policy Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Be clear and specific about timeframes and expectations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Include emergency contact procedures in your communication policy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Consider offering flexibility for exceptional circumstances
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                      Ensure policies comply with your professional body's guidelines
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Save Changes */}
              <HStack className="justify-end pt-4">
                <Button variant="outline" className="min-h-[--touch-target-min]">
                  Cancel
                </Button>
                <Button variant="primary" className="min-h-[--touch-target-min]">
                  Save Policies
                </Button>
              </HStack>
            </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
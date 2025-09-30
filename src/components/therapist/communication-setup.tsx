import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface CommunicationSetupProps {
  onComplete?: () => void;
}

const communicationStyles = [
  {
    value: "Supportive and Relational",
    label: "Supportive and Relational",
    description: "I focus on creating safety, trust, and emotional validation"
  },
  {
    value: "Motivational and Encouraging",
    label: "Motivational and Encouraging", 
    description: "I focus on boosting morale, using encouragement and gentle challenge"
  },
  {
    value: "Pragmatic and Problem-solving",
    label: "Pragmatic and Problem-solving",
    description: "I focus on offering clear, solution-oriented feedback with actionable takeaways"
  },
  {
    value: "Flexible and Adaptive",
    label: "Flexible and Adaptive",
    description: "I am constantly shifting tone/style depending on the client's needs in the moment"
  }
];

const sessionFormats = [
  {
    value: "Structured and Goal-oriented",
    label: "Structured and Goal-oriented",
    description: "Sessions follow a clear agenda with measurable progress markers"
  },
  {
    value: "Exploratory and Insight-based",
    label: "Exploratory and Insight-based",
    description: "Sessions unfold organically, focusing on deep reflection and meaning-making"
  },
  {
    value: "Interactive and Dynamic",
    label: "Interactive and Dynamic",
    description: "I switch it up with various techniques and exercises to keep energy high"
  },
  {
    value: "Calm and Process-Focused",
    label: "Calm and Process-Focused",
    description: "My sessions emphasise pacing, safety, and careful exploration of feelings"
  }
];

export function CommunicationSetup({ onComplete }: CommunicationSetupProps) {
  const { user } = useAuth();
  const [communicationStyle, setCommunicationStyle] = React.useState<string>("");
  const [sessionFormat, setSessionFormat] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load existing values
  React.useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('therapist_profiles')
        .select('communication_style, session_format')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (data) {
        setCommunicationStyle(data.communication_style || "");
        setSessionFormat(data.session_format || "");
      }
    };
    
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user || !communicationStyle || !sessionFormat) {
      setError("Please select both a communication style and session format");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('therapist_profiles')
        .update({
          communication_style: communicationStyle,
          session_format: sessionFormat,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error saving communication preferences:', error);
      setError('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Communication Style</CardTitle>
          <CardDescription>
            When working with a therapy client, my communication style tends to lean towards...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={communicationStyle} onValueChange={setCommunicationStyle}>
            <div className="space-y-4">
              {communicationStyles.map((style) => (
                <div key={style.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-accent transition-colors">
                  <RadioGroupItem value={style.value} id={style.value} className="mt-1" />
                  <Label htmlFor={style.value} className="flex-1 cursor-pointer">
                    <div className="font-semibold">{style.label}</div>
                    <div className="text-sm text-text-muted mt-1">{style.description}</div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Format</CardTitle>
          <CardDescription>
            In terms of how I format my sessions with clients, I tend to be more...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={sessionFormat} onValueChange={setSessionFormat}>
            <div className="space-y-4">
              {sessionFormats.map((format) => (
                <div key={format.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-accent transition-colors">
                  <RadioGroupItem value={format.value} id={format.value} className="mt-1" />
                  <Label htmlFor={format.value} className="flex-1 cursor-pointer">
                    <div className="font-semibold">{format.label}</div>
                    <div className="text-sm text-text-muted mt-1">{format.description}</div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 rounded-md bg-error-bg text-error-text text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !communicationStyle || !sessionFormat}
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}

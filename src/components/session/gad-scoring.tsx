import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3,
  Calendar,
  Save,
  Info
} from "lucide-react";

interface GADScoringProps {
  clientId: string;
  sessionId: string;
}

interface GADQuestion {
  id: number;
  text: string;
  score: number | null;
}

export function GADScoring({ clientId, sessionId }: GADScoringProps) {
  const [questions, setQuestions] = useState<GADQuestion[]>([
    { id: 1, text: "Feeling nervous, anxious, or on edge", score: null },
    { id: 2, text: "Not being able to stop or control worrying", score: null },
    { id: 3, text: "Worrying too much about different things", score: null },
    { id: 4, text: "Trouble relaxing", score: null },
    { id: 5, text: "Being so restless that it's hard to sit still", score: null },
    { id: 6, text: "Becoming easily annoyed or irritable", score: null },
    { id: 7, text: "Feeling afraid as if something awful might happen", score: null }
  ]);

  const [previousScores] = useState([
    { date: "2024-01-15", score: 12 },
    { date: "2024-01-08", score: 15 },
    { date: "2024-01-01", score: 18 },
    { date: "2023-12-25", score: 16 }
  ]);

  const scoreOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const updateScore = (questionId: number, score: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, score } : q
    ));
  };

  const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
  const maxScore = questions.length * 3;
  const isComplete = questions.every(q => q.score !== null);

  const getSeverityLevel = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "secondary", description: "Minimal anxiety symptoms" };
    if (score <= 9) return { level: "Mild", color: "secondary", description: "Mild anxiety symptoms" };
    if (score <= 14) return { level: "Moderate", color: "default", description: "Moderate anxiety symptoms" };
    return { level: "Severe", color: "destructive", description: "Severe anxiety symptoms" };
  };

  const severity = getSeverityLevel(totalScore);

  const handleSave = () => {
    if (isComplete) {
      // Save assessment logic here
      console.log("Saving GAD-7 assessment:", { totalScore, questions, sessionId });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="font-primary">
            GAD-7 Anxiety Assessment
          </CardTitle>
          <p className="text-sm text-text-secondary font-secondary">
            Generalized Anxiety Disorder Scale - Session {sessionId}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold font-primary text-primary">
                {totalScore}/{maxScore}
              </div>
              <p className="text-sm text-text-secondary font-secondary">Total Score</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Badge variant={severity.color as "default" | "secondary" | "destructive" | "outline"} className="text-sm">
                {severity.level}
              </Badge>
              <p className="text-sm text-text-secondary font-secondary mt-1">Severity Level</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold font-primary text-primary">
                {Math.round((7 - questions.filter(q => q.score !== null).length) / 7 * 100)}%
              </div>
              <p className="text-sm text-text-secondary font-secondary">Progress</p>
            </div>
          </div>
          
          {isComplete && (
            <div className="mt-4 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                {severity.level === "Severe" && <AlertTriangle className="h-4 w-4 text-error-foreground" />}
                {severity.level === "Moderate" && <AlertTriangle className="h-4 w-4 text-warning-foreground" />}
                {severity.level === "Mild" && <CheckCircle2 className="h-4 w-4 text-info-foreground" />}
                {severity.level === "Minimal" && <CheckCircle2 className="h-4 w-4 text-success-foreground" />}
                <span className="font-medium font-primary">Assessment Result</span>
              </div>
              <p className="text-sm text-text-secondary font-secondary">{severity.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Over the last 2 weeks, how often have you been bothered by the following problems?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                  {question.id}
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">
                    {question.text}
                  </Label>
                </div>
              </div>
              
              <RadioGroup
                value={question.score?.toString() || ""}
                onValueChange={(value) => updateScore(question.id, parseInt(value))}
                className="ml-9"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {scoreOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={`q${question.id}-${option.value}`} 
                      />
                      <Label 
                        htmlFor={`q${question.id}-${option.value}`} 
                        className="text-sm cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Score History */}
      {previousScores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-info" />
              Score History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previousScores.map((score, index) => {
                const prevSeverity = getSeverityLevel(score.score);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{score.date}</span>
                      <Badge variant={prevSeverity.color as "default" | "secondary" | "destructive" | "outline"} className="text-xs">
                        {prevSeverity.level}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">
                      {score.score}/21
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Trend Analysis */}
            <div className="mt-4 p-3 bg-info border border-info rounded-lg">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-info-foreground" />
                <span className="font-medium text-info-foreground font-primary">Trend Analysis</span>
              </div>
              <p className="text-sm text-info-foreground font-secondary">
                {previousScores[0].score < previousScores[1].score 
                  ? "Scores show improvement over recent sessions. Continue current treatment approach."
                  : "Scores indicate a slight increase in anxiety. Consider reviewing coping strategies."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Save Draft</Button>
        <Button onClick={handleSave} disabled={!isComplete}>
          <Save className="h-4 w-4 mr-2" />
          Complete Assessment
        </Button>
      </div>
    </div>
  );
}
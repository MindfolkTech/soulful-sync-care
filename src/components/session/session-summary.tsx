import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  User, 
  Target, 
  TrendingUp, 
  FileText, 
  Calendar,
  Star,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2
} from "lucide-react";

interface SessionSummaryProps {
  sessionId: string;
  clientName: string;
  therapistName: string;
  sessionDate: string;
  duration: number;
}

export function SessionSummary({ 
  sessionId, 
  clientName, 
  therapistName, 
  sessionDate, 
  duration 
}: SessionSummaryProps) {
  // Mock session data
  const sessionData = {
    objectives: [
      { text: "Identify anxiety triggers", completed: true },
      { text: "Practice breathing exercises", completed: true },
      { text: "Discuss work-life balance", completed: false }
    ],
    keyInsights: [
      "Client showed significant improvement in recognizing anxiety patterns",
      "Work-related stress identified as primary trigger",
      "Client responsive to cognitive behavioral techniques"
    ],
    interventions: [
      { name: "Deep Breathing Exercise", effectiveness: 85 },
      { name: "Cognitive Restructuring", effectiveness: 70 },
      { name: "Grounding Technique", effectiveness: 90 }
    ],
    homework: [
      "Practice 5-4-3-2-1 grounding technique daily",
      "Complete anxiety diary for one week",
      "Listen to guided meditation recording"
    ],
    nextSteps: [
      "Continue working on workplace stress management",
      "Introduce progressive muscle relaxation",
      "Schedule follow-up in one week"
    ],
    riskAssessment: "low",
    overallProgress: 75
  };

  const completedObjectives = sessionData.objectives.filter(obj => obj.completed).length;
  const totalObjectives = sessionData.objectives.length;

  return (
    <div className="space-y-6">
      {/* Session Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Session Summary
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {sessionDate}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {duration} minutes
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {clientName} & {therapistName}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-6xl font-bold font-primary text-primary">
                {completedObjectives}/{totalObjectives}
              </div>
              <p className="text-sm text-text-secondary font-secondary">Objectives Met</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-6xl font-bold font-primary text-primary">
                {sessionData.overallProgress}%
              </div>
              <p className="text-sm text-text-secondary font-secondary">Session Progress</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Badge 
                variant={sessionData.riskAssessment === "low" ? "secondary" : "destructive"}
                className="text-lg"
              >
                {sessionData.riskAssessment.toUpperCase()} RISK
              </Badge>
              <p className="text-sm text-text-secondary font-secondary mt-1">Risk Level</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Session Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessionData.objectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                {objective.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-[--success-text]" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-[--warning-text]" />
                )}
                <span className={objective.completed ? "line-through text-muted-foreground" : ""}>
                  {objective.text}
                </span>
                <Badge 
                  variant={objective.completed ? "secondary" : "outline"} 
                  className="ml-auto"
                >
                  {objective.completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {sessionData.keyInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Interventions Used */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Interventions & Effectiveness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionData.interventions.map((intervention, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{intervention.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {intervention.effectiveness}% effective
                  </span>
                </div>
                <Progress value={intervention.effectiveness} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Homework Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Homework & Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sessionData.homework.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Session Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {sessionData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Target className="h-4 w-4 mt-0.5 text-primary" />
                  {step}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium font-primary">Session Documentation</h3>
              <p className="text-sm text-text-secondary font-secondary">
                Export or share this session summary
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share with Client
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
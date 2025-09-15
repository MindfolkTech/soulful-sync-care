import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Save, 
  Plus, 
  FileText, 
  Tag,
  Clock,
  User,
  Brain,
  Heart,
  Target,
  AlertTriangle
} from "lucide-react";

interface NotesEditorProps {
  sessionId: string;
  clientName: string;
}

interface SessionNote {
  id: string;
  timestamp: string;
  content: string;
  type: "observation" | "intervention" | "goal" | "concern" | "progress";
  tags: string[];
}

export function NotesEditor({ sessionId, clientName }: NotesEditorProps) {
  const [notes, setNotes] = useState<SessionNote[]>([
    {
      id: "1",
      timestamp: "14:05",
      content: "Client reports increased anxiety levels this week, particularly around work deadlines.",
      type: "observation",
      tags: ["anxiety", "work-stress"]
    }
  ]);
  
  const [newNote, setNewNote] = useState("");
  const [noteType, setNoteType] = useState<SessionNote["type"]>("observation");
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Session goals and objectives
  const [sessionGoals, setSessionGoals] = useState([
    "Identify triggers for workplace anxiety",
    "Practice grounding techniques",
    "Set manageable daily goals"
  ]);
  
  const [newGoal, setNewGoal] = useState("");
  
  // Available tags
  const availableTags = [
    "anxiety", "depression", "stress", "coping-skills", "relationships", 
    "work-stress", "family-issues", "self-esteem", "trauma", "grief",
    "behavioral-change", "cognitive-restructuring", "mindfulness"
  ];

  const addNote = () => {
    if (newNote.trim()) {
      const note: SessionNote = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: newNote,
        type: noteType,
        tags: selectedTags
      };
      
      setNotes(prev => [...prev, note]);
      setNewNote("");
      setSelectedTags([]);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setSessionGoals(prev => [...prev, newGoal]);
      setNewGoal("");
    }
  };

  const getTypeIcon = (type: SessionNote["type"]) => {
    switch (type) {
      case "observation": return <FileText className="h-4 w-4" />;
      case "intervention": return <Brain className="h-4 w-4" />;
      case "goal": return <Target className="h-4 w-4" />;
      case "concern": return <AlertTriangle className="h-4 w-4" />;
      case "progress": return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: SessionNote["type"]) => {
    switch (type) {
      case "observation": return "secondary";
      case "intervention": return "default";
      case "goal": return "outline";
      case "concern": return "destructive";
      case "progress": return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Session Notes - {clientName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Session ID: {sessionId} • {new Date().toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notes" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Session Notes</TabsTrigger>
              <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
              <TabsTrigger value="summary">Session Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4">
              {/* Add New Note */}
              <Card className="bg-muted/20">
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="note-type">Note Type</Label>
                      <Select value={noteType} onValueChange={(value: SessionNote["type"]) => setNoteType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="observation">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Observation
                            </div>
                          </SelectItem>
                          <SelectItem value="intervention">
                            <div className="flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              Intervention
                            </div>
                          </SelectItem>
                          <SelectItem value="goal">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Goal Setting
                            </div>
                          </SelectItem>
                          <SelectItem value="concern">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Concern
                            </div>
                          </SelectItem>
                          <SelectItem value="progress">
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4" />
                              Progress
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="flex gap-2">
                        <Select onValueChange={addTag}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add tag" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTags
                              .filter(tag => !selectedTags.includes(tag))
                              .map(tag => (
                                <SelectItem key={tag} value={tag}>
                                  {tag}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter session note..."
                    className="min-h-[100px]"
                  />
                  
                  <Button onClick={addNote} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Notes */}
              <div className="space-y-3">
                {notes.map((note) => (
                  <Card key={note.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2 mt-1">
                        {getTypeIcon(note.type)}
                        <Badge variant={getTypeColor(note.type) as any} className="text-xs">
                          {note.type}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm mb-2">{note.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {note.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {note.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              {/* Add New Goal */}
              <Card className="bg-muted/20">
                <CardContent className="p-4 space-y-4">
                  <Label htmlFor="new-goal">Session Goals & Objectives</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      placeholder="Add session goal or objective..."
                    />
                    <Button onClick={addGoal}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Goals List */}
              <div className="space-y-2">
                {sessionGoals.map((goal, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-start gap-3">
                      <Target className="h-4 w-4 mt-0.5 text-primary" />
                      <p className="text-sm">{goal}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="summary">Session Summary</Label>
                    <Textarea
                      placeholder="Summarize the key points, outcomes, and next steps from this session..."
                      className="min-h-[150px] mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="homework">Homework/Action Items</Label>
                    <Textarea
                      placeholder="List any homework assignments or action items for the client..."
                      className="min-h-[100px] mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="next-session">Next Session Plan</Label>
                    <Textarea
                      placeholder="Notes for the next session - areas to focus on, follow-up items..."
                      className="min-h-[100px] mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save & Complete Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

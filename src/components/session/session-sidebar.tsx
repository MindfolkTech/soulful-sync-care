import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  FileText, 
  Clock, 
  User,
  Send,
  Paperclip,
  Eye,
  EyeOff
} from "lucide-react";

interface SessionSidebarProps {
  sessionId: string;
}

export function SessionSidebar({ sessionId }: SessionSidebarProps) {
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showClientNotes, setShowClientNotes] = useState(false);

  // Mock data
  const sessionNotes = [
    {
      id: "1",
      timestamp: "14:05",
      content: "Client reports feeling more anxious this week. Work stress mentioned.",
      type: "observation"
    },
    {
      id: "2", 
      timestamp: "14:12",
      content: "Discussed coping strategies for workplace anxiety. Client responsive to breathing exercises.",
      type: "intervention"
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "therapist",
      content: "I'm sharing a relaxation exercise document with you",
      timestamp: "14:08",
      hasAttachment: true
    },
    {
      id: "2",
      sender: "client", 
      content: "Thank you, I'll review this after our session",
      timestamp: "14:09"
    }
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote("");
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send message logic here
      setNewMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="notes" className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Session Notes Tab */}
        <TabsContent value="notes" className="flex-1 flex flex-col p-4 space-y-4">
          {/* Session Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Session Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>50 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="secondary">Individual Therapy</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Focus:</span>
                <span>Anxiety Management</span>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Session Notes</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowClientNotes(!showClientNotes)}
              >
                {showClientNotes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="ml-1">{showClientNotes ? "Hide from" : "Share with"} client</span>
              </Button>
            </div>

            <ScrollArea className="flex-1 mb-4">
              <div className="space-y-3">
                {sessionNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant={note.type === "observation" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {note.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Add Note */}
            <div className="space-y-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add session note..."
                className="min-h-[80px]"
              />
              <Button onClick={handleAddNote} size="sm" className="w-full">
                Add Note
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col p-4">
          {/* Messages */}
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === "therapist" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "therapist" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  }`}>
                    {message.hasAttachment && (
                      <div className="flex items-center gap-2 mb-2 text-xs opacity-80">
                        <Paperclip className="h-3 w-3" />
                        <span>Attachment: relaxation-exercise.pdf</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 ${
                      message.sender === "therapist" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="space-y-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[60px]"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} size="sm" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
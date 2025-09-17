import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageThread } from "@/components/messaging/message-thread";
import { MessageInput } from "@/components/messaging/message-input";
import { Container } from "@/components/ui/container";
import { MessagingDataNotice } from "@/components/legal/data-processing-notice";
import { 
  Search, 
  Plus, 
  Shield, 
  MessageSquare,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function Messages() {
  const [selectedThread, setSelectedThread] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock message threads
  const threads = [
    {
      id: "1",
      therapistName: "Dr. Sarah Chen",
      therapistAvatar: "/images/therapist-white-female-20s.png",
      lastMessage: "I've sent you some homework exercises to try this week",
      timestamp: "2 hours ago",
      unread: 2,
      encrypted: true,
      online: true
    },
    {
      id: "2", 
      therapistName: "Dr. Marcus Johnson",
      therapistAvatar: "/images/therapist-black-male-40s.png",
      lastMessage: "How are you feeling about our last session?",
      timestamp: "1 day ago",
      unread: 0,
      encrypted: true,
      online: false
    }
  ];

  const filteredThreads = threads.filter(thread =>
    thread.therapistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Container size="xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-primary text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Secure communication with your therapists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[--space-lg] min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)]">
          {/* Threads List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversations
                </CardTitle>
                <Button size="sm" variant="outline" aria-label="Start new conversation">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Search */}
              <div className="p-[--space-md] border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Thread List */}
              <div className="divide-y">
                {filteredThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                      selectedThread === thread.id ? "bg-muted" : ""
                    }`}
                    aria-label={`Open conversation with ${thread.therapistName}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={thread.therapistAvatar} alt={`${thread.therapistName} profile picture`} />
                          <AvatarFallback>
                            {thread.therapistName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {thread.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[--success-text] border-2 border-background rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-secondary font-medium truncate">
                            {thread.therapistName}
                          </h4>
                          <div className="flex items-center gap-1">
                            {thread.encrypted && (
                              <Shield className="h-3 w-3 text-[--success-text]" />
                            )}
                            {thread.unread > 0 && (
                              <Badge variant="default" className="text-xs px-2 py-0.5">
                                {thread.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {thread.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {thread.timestamp}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message View */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedThread ? (
              <>
                {/* Thread Header */}
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={filteredThreads.find(t => t.id === selectedThread)?.therapistAvatar} alt={`${filteredThreads.find(t => t.id === selectedThread)?.therapistName} profile picture`} />
                          <AvatarFallback>
                            {filteredThreads.find(t => t.id === selectedThread)?.therapistName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-primary font-semibold">
                            {filteredThreads.find(t => t.id === selectedThread)?.therapistName}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-[--success-text] rounded-full"></div>
                              Online
                            </div>
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-[--success-text]" />
                              End-to-end encrypted
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-[--success-text]" />
                        Verified therapist
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Messages */}
                <Card className="flex-1 flex flex-col">
                  <CardContent className="flex-1 flex flex-col p-0">
                    <MessageThread threadId={selectedThread} />
                    <MessageInput onSendMessage={(message) => console.log("Send:", message)} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-[--space-md]">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-primary font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation to start messaging with your therapist
                  </p>
                  <div className="max-w-md mx-auto">
                    <MessagingDataNotice />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
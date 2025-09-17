import { useState } from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageThread } from "@/components/messaging/message-thread";
import { MessageInput } from "@/components/messaging/message-input";
import { 
  Search, 
  Filter, 
  Shield, 
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const conversations = [
  {
    id: "1",
    clientName: "Jessica D.",
    clientInitials: "JD",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b196?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Thank you for the session today. I feel much better about implementing those coping strategies.",
    timestamp: "2 hours ago",
    unreadCount: 0,
    isOnline: true,
    priority: "normal"
  },
  {
    id: "2", 
    clientName: "Michael S.",
    clientInitials: "MS",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "I'm struggling with the exercises we discussed. Could we schedule an earlier session?",
    timestamp: "5 hours ago",
    unreadCount: 2,
    isOnline: false,
    priority: "high"
  },
  {
    id: "3",
    clientName: "Sarah L.",
    clientInitials: "SL", 
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Looking forward to our session next week. I've been practicing the mindfulness techniques.",
    timestamp: "1 day ago",
    unreadCount: 0,
    isOnline: false,
    priority: "normal"
  },
  {
    id: "4",
    clientName: "Robert P.",
    clientInitials: "RP",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "The homework assignment was really helpful. I noticed a significant improvement in my sleep patterns.",
    timestamp: "2 days ago", 
    unreadCount: 1,
    isOnline: true,
    priority: "normal"
  }
];

export default function TherapistMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "normal":
      default:
        return <MessageSquare className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <TherapistLayout>
      <div className="p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-text-primary mb-2">Messages</h1>
              <p className="font-secondary text-text-secondary">Secure communication with your clients</p>
            </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[--space-lg] h-full min-h-0 max-h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1 space-y-[--space-md]">
          {/* Message Stats */}
          <div className="grid grid-cols-2 gap-[--space-md]">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-foreground">{totalUnread}</div>
                  <div className="font-secondary text-muted-foreground text-sm">Unread</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="font-primary text-2xl font-bold text-foreground">{conversations.length}</div>
                  <div className="font-secondary text-muted-foreground text-sm">Active</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <Stack className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 min-h-touch-min"
                  />
                </div>
                <Button variant="outline" size="sm" className="w-full min-h-[--touch-target-min]" aria-label="Filter conversations">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Messages
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Conversations */}
          <Card className="flex-1 min-h-0">
            <CardHeader className="pb-3">
              <CardTitle className="font-primary text-jovial-jade">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0 max-h-96 overflow-y-auto">
                {filteredConversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`
                      p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/50
                      ${selectedConversation.id === conversation.id ? 'bg-surface-accent' : ''}
                      ${index === filteredConversations.length - 1 ? 'border-b-0' : ''}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.clientAvatar} alt={conversation.clientInitials} />
                          <AvatarFallback className="bg-surface-accent text-jovial-jade font-secondary font-semibold text-sm">
                            {conversation.clientInitials}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-secondary font-bold text-foreground text-sm truncate">
                            {conversation.clientName}
                          </h4>
                          <div className="flex items-center gap-2">
                            {getPriorityIcon(conversation.priority)}
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0.5 min-w-[20px] h-5">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                          {conversation.lastMessage}
                        </p>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {conversation.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col min-h-0">
            <CardHeader className="flex-shrink-0">
              <HStack className="justify-between">
                <HStack>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedConversation.clientAvatar} alt={selectedConversation.clientInitials} />
                    <AvatarFallback className="bg-surface-accent text-jovial-jade font-secondary font-semibold text-sm">
                      {selectedConversation.clientInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-primary font-semibold text-foreground">
                      {selectedConversation.clientName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full ${selectedConversation.isOnline ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                      {selectedConversation.isOnline ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </HStack>
                
                <HStack>
                  <Button variant="ghost" size="sm" className="min-h-[--touch-target-min]" aria-label="Security settings">
                    <Shield className="w-4 h-4" />
                  </Button>
                  <Badge variant="outline" className="bg-tag-misc text-tag-misc-foreground">
                    Encrypted
                  </Badge>
                </HStack>
              </HStack>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col min-h-0 p-0">
              {/* Message Thread */}
              <div className="flex-1 p-4 overflow-y-auto min-h-0">
                <MessageThread conversationId={selectedConversation.id} />
              </div>
              
              {/* Message Input */}
              <div className="flex-shrink-0 border-t border-border p-4">
                <MessageInput conversationId={selectedConversation.id} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
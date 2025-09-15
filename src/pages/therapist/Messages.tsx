import { useState } from "react";
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
  AlertCircle,
  Star
} from "lucide-react";

export default function TherapistMessages() {
  const [selectedThread, setSelectedThread] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, urgent, unread

  // Mock client message threads
  const threads = [
    {
      id: "1",
      clientName: "Alex Johnson",
      clientAvatar: "/images/client-white-male-20s-neutral-shirt.png",
      lastMessage: "I tried the breathing exercise and it really helped",
      timestamp: "15 minutes ago",
      unread: 1,
      encrypted: true,
      priority: "normal",
      lastSession: "2 days ago",
      nextSession: "Tomorrow 2:00 PM"
    },
    {
      id: "2",
      clientName: "Emma Wilson", 
      clientAvatar: "/images/client-white-female-autistic-20s.png",
      lastMessage: "Having a really difficult day, could use some guidance",
      timestamp: "1 hour ago",
      unread: 2,
      encrypted: true,
      priority: "urgent",
      lastSession: "5 days ago",
      nextSession: "Friday 10:00 AM"
    },
    {
      id: "3",
      clientName: "Michael Chen",
      clientAvatar: "/images/client-white-male-20s-lilac-shirt.png", 
      lastMessage: "Thank you for the resources, I'll review them",
      timestamp: "3 hours ago",
      unread: 0,
      encrypted: true,
      priority: "normal",
      lastSession: "1 day ago",
      nextSession: "Next week"
    }
  ];

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === "all" || 
      (filter === "urgent" && thread.priority === "urgent") ||
      (filter === "unread" && thread.unread > 0);
    
    return matchesSearch && matchesFilter;
  });

  const urgentCount = threads.filter(t => t.priority === "urgent").length;
  const unreadCount = threads.reduce((sum, t) => sum + t.unread, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Client Messages</h1>
              <p className="text-muted-foreground">
                Secure communication with your clients
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {urgentCount > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {urgentCount} urgent
                </Badge>
              )}
              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Client Threads List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Client Conversations
                </CardTitle>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Search and Filters */}
              <div className="p-4 border-b space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === "urgent" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("urgent")}
                    className="flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    Urgent
                  </Button>
                  <Button
                    variant={filter === "unread" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("unread")}
                  >
                    Unread
                  </Button>
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
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={thread.clientAvatar} />
                          <AvatarFallback>
                            {thread.clientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {thread.priority === "urgent" && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-error border-2 border-background rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium truncate">
                            {thread.clientName}
                          </h4>
                          <div className="flex items-center gap-1">
                            {thread.priority === "urgent" && (
                              <AlertCircle className="h-3 w-3 text-[var(--error-text)]" />
                            )}
                            {thread.encrypted && (
                              <Shield className="h-3 w-3 text-[var(--success-bg)]" />
                            )}
                            {thread.unread > 0 && (
                              <Badge variant="default" className="text-xs px-2 py-0.5">
                                {thread.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {thread.lastMessage}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {thread.timestamp}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Next: {thread.nextSession}
                          </div>
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
                          <AvatarImage src={filteredThreads.find(t => t.id === selectedThread)?.clientAvatar} />
                          <AvatarFallback>
                            {filteredThreads.find(t => t.id === selectedThread)?.clientName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {filteredThreads.find(t => t.id === selectedThread)?.clientName}
                            </h3>
                            {filteredThreads.find(t => t.id === selectedThread)?.priority === "urgent" && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3 text-[var(--success-bg)]" />
                              Encrypted
                            </div>
                            <span>•</span>
                            <span>
                              Last session: {filteredThreads.find(t => t.id === selectedThread)?.lastSession}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Add Note
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
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
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select a client conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation to start messaging with your client
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Paperclip, 
  Download, 
  Shield, 
  Check, 
  CheckCheck,
  Clock,
  AlertCircle
} from "lucide-react";

interface MessageThreadProps {
  threadId: string;
}

interface Message {
  id: string;
  sender: "client" | "therapist" | "system";
  content: string;
  timestamp: string;
  type: "text" | "file" | "system";
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
  deliveryStatus: "sending" | "sent" | "delivered" | "read";
  encrypted: boolean;
}

export function MessageThread({ threadId }: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Mock messages data
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      content: "End-to-end encryption enabled. Your messages are secure.",
      timestamp: "Today 2:00 PM",
      type: "system",
      deliveryStatus: "delivered",
      encrypted: true
    },
    {
      id: "2", 
      sender: "therapist",
      content: "Hello Alex! How are you feeling today? I wanted to check in after our last session.",
      timestamp: "Today 2:05 PM",
      type: "text",
      deliveryStatus: "read",
      encrypted: true
    },
    {
      id: "3",
      sender: "client", 
      content: "Hi Dr. Chen! I'm doing better today. I tried the breathing exercise you recommended and it really helped with my anxiety this morning.",
      timestamp: "Today 2:12 PM",
      type: "text",
      deliveryStatus: "read",
      encrypted: true
    },
    {
      id: "4",
      sender: "therapist",
      content: "That's wonderful to hear! I'm so glad the breathing exercise helped. I have some additional resources that might be useful for you.",
      timestamp: "Today 2:15 PM", 
      type: "text",
      deliveryStatus: "read",
      encrypted: true
    },
    {
      id: "5",
      sender: "therapist",
      content: "I'm sharing a guided meditation audio file with you.",
      timestamp: "Today 2:16 PM",
      type: "file",
      attachment: {
        name: "guided-meditation-anxiety.mp3",
        size: "12.5 MB",
        type: "audio"
      },
      deliveryStatus: "delivered",
      encrypted: true
    },
    {
      id: "6",
      sender: "client",
      content: "Thank you so much! I'll listen to this tonight before bed. Should I let you know how it goes?",
      timestamp: "Today 2:45 PM",
      type: "text", 
      deliveryStatus: "sent",
      encrypted: true
    }
  ]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getDeliveryIcon = (status: Message["deliveryStatus"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-primary" />;
    }
  };

  const formatFileSize = (bytes: string) => {
    return bytes; // Already formatted in mock data
  };

  const getFileIcon = (type: string) => {
    return <Paperclip className="h-4 w-4" />;
  };

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message) => {
          if (message.type === "system") {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-muted/50 px-3 py-2 rounded-full flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 text-[--success-text]" />
                  {message.content}
                </div>
              </div>
            );
          }

          const isTherapist = message.sender === "therapist";
          
          return (
            <div 
              key={message.id}
              className={`flex gap-3 ${isTherapist ? "justify-end" : "justify-start"}`}
            >
              {!isTherapist && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/images/client-white-male-20s-neutral-shirt.png" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-[70%] ${isTherapist ? "order-2" : ""}`}>
                <div className={`rounded-lg p-3 ${
                  isTherapist 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}>
                  {message.type === "file" && message.attachment ? (
                    <div className="space-y-2">
                      <p className="text-sm font-secondary">{message.content}</p>
                      <div className={`p-3 rounded border ${
                        isTherapist 
                          ? "bg-primary/10 border-primary/20" 
                          : "border-border bg-background"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded ${
                            isTherapist ? "bg-primary-foreground/20" : "bg-muted"
                          }`}>
                            {getFileIcon(message.attachment.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate font-secondary ${
                              isTherapist ? "text-primary-foreground" : "text-foreground"
                            }`}>
                              {message.attachment.name}
                            </p>
                            <p className={`text-xs font-secondary ${
                              isTherapist ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {message.attachment.size}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            variant={isTherapist ? "secondary" : "outline"}
                            className="shrink-0"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-secondary">{message.content}</p>
                  )}
                </div>
                
                <div className={`flex items-center gap-2 mt-1 text-xs ${
                  isTherapist ? "justify-end" : "justify-start"
                }`}>
                  <span className="text-muted-foreground">
                    {message.timestamp}
                  </span>
                  {message.encrypted && (
                    <Shield className="h-3 w-3 text-[--success-text]" />
                  )}
                  {isTherapist && getDeliveryIcon(message.deliveryStatus)}
                </div>
              </div>

              {isTherapist && (
                <Avatar className="w-8 h-8 order-1">
                  <AvatarImage src="/images/therapist-white-female-20s.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
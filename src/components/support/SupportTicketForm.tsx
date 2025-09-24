import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface SupportTicket {
  subject: string;
  category: 'technical' | 'billing' | 'therapy' | 'safety' | 'other';
  description: string;
}

export function SupportTicketForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ticket, setTicket] = React.useState<SupportTicket>({ subject: '', category: 'technical', description: '' });

  const mutation = useMutation({
    mutationFn: async (newTicket: SupportTicket) => {
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from('support_tickets').insert([
        { ...newTicket, user_id: user.id },
      ]);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Ticket Submitted",
        description: "We've received your request and will get back to you shortly.",
      });
      setTicket({ subject: '', category: 'technical', description: '' });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(ticket);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="font-primary">Submit a Support Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="subject" className="font-secondary font-medium">Subject</label>
            <Input
              id="subject"
              placeholder="e.g., Trouble logging in"
              value={ticket.subject}
              onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
              required
              className="min-h-[--touch-target-min]"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="font-secondary font-medium">Category</label>
            <Select
              value={ticket.category}
              onValueChange={(value: SupportTicket['category']) => setTicket({ ...ticket, category: value })}
            >
              <SelectTrigger id="category" className="min-h-[--touch-target-min]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="billing">Billing Question</SelectItem>
                <SelectItem value="therapy">Therapy Feedback</SelectItem>
                <SelectItem value="safety">Safety Concern</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="font-secondary font-medium">Description</label>
            <Textarea
              id="description"
              placeholder="Please describe your issue in detail..."
              value={ticket.description}
              onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
              required
              className="min-h-[120px]"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full min-h-[--touch-target-min]">
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

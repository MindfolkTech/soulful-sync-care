import * as React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ModerationActionsProps {
  itemId: string;
  currentStatus: string;
}

export function ModerationActions({ itemId, currentStatus }: ModerationActionsProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ status }: { status: 'resolved' | 'dismissed' }) => {
      const { error } = await supabase
        .from('moderation_queue')
        .update({ status, reviewed_at: new Date().toISOString() })
        .eq('id', itemId);

      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      toast({
        title: "Content Moderated",
        description: `The item has been marked as ${status}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['moderation_queue'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Action Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (currentStatus !== 'pending') {
    return <span className="text-sm text-[hsl(var(--text-secondary))]">Actioned</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="text-[hsl(var(--success-text))] hover:bg-[hsl(var(--success-bg))] hover:text-[hsl(var(--success-text))] min-h-[--touch-target-min]"
        onClick={() => mutation.mutate({ status: 'resolved' })}
        disabled={mutation.isPending}
        aria-label="Approve content"
      >
        {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))] hover:text-[hsl(var(--error-text))] min-h-[--touch-target-min]"
        onClick={() => mutation.mutate({ status: 'dismissed' })}
        disabled={mutation.isPending}
        aria-label="Reject content"
      >
        {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
      </Button>
    </div>
  );
}

import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Loader2, Download, Trash2, Shield, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Stack, HStack, Cluster } from "@/components/layout/layout-atoms";

export function GDPRRequestForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Data Export Mutation
  const exportMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.functions.invoke('gdpr-export', {
        body: { user_id: user.id }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Create downloadable JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mindfolk-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data Export Complete",
        description: "Your data has been downloaded as a JSON file.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Account Deletion Mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase.functions.invoke('gdpr-delete', {
        body: { user_id: user.id }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Account Deletion Initiated",
        description: "Your account has been scheduled for deletion. You will be logged out shortly.",
      });
      
      // Log out user after successful deletion
      setTimeout(() => {
        supabase.auth.signOut();
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Stack className="gap-6">
      {/* Data Export Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-primary flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Your Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Stack className="gap-4">
            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
              Download a complete copy of all your personal data stored in our system. 
              This includes your profile, appointments, assessments, and communication history.
            </p>
            <Cluster>
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                JSON Format
              </Badge>
            </Cluster>
            <Button
              onClick={() => exportMutation.mutate()}
              disabled={exportMutation.isPending}
              className="w-full min-h-[--touch-target-min]"
            >
              {exportMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Download className="mr-2 h-4 w-4" />
              Export My Data
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Account Deletion Section */}
      <Card className="border-[hsl(var(--error-bg))]">
        <CardHeader>
          <CardTitle className="font-primary flex items-center gap-2 text-[hsl(var(--error-text))]">
            <Trash2 className="h-5 w-5" />
            Delete My Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Stack className="gap-4">
            <div className="flex items-start gap-3 p-3 bg-[hsl(var(--warning-bg))] rounded-md">
              <AlertTriangle className="h-5 w-5 text-[hsl(var(--warning-text))] mt-0.5 flex-shrink-0" />
              <Stack className="gap-1">
                <p className="font-secondary font-medium text-sm text-[hsl(var(--warning-text))]">
                  Permanent Action
                </p>
                <p className="font-secondary text-xs text-[hsl(var(--warning-text))]">
                  This will permanently delete your account and anonymize your data. 
                  This action cannot be undone.
                </p>
              </Stack>
            </div>
            
            <Stack className="gap-2">
              <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                <strong>What happens when you delete your account:</strong>
              </p>
              <ul className="font-secondary text-sm text-[hsl(var(--text-secondary))] space-y-1 ml-4">
                <li>• Your personal information will be permanently removed</li>
                <li>• Your appointments will be anonymized</li>
                <li>• You will lose access to your account immediately</li>
                <li>• Aggregated data may be retained for analytics (anonymized)</li>
              </ul>
            </Stack>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  className="w-full min-h-[--touch-target-min]"
                >
                  {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete My Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-primary flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-[hsl(var(--error-text))]" />
                    Confirm Account Deletion
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-secondary">
                    <Stack className="gap-3">
                      <p>
                        Are you absolutely sure you want to delete your account? 
                        This action is permanent and cannot be undone.
                      </p>
                      <p className="font-medium">
                        All your personal data will be permanently removed from our systems.
                      </p>
                    </Stack>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="font-secondary">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMutation.mutate()}
                    className="bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] hover:bg-[hsl(var(--error-bg))]/90 font-secondary"
                  >
                    Yes, Delete My Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Stack>
        </CardContent>
      </Card>

      {/* Information Section */}
      <Card>
        <CardContent className="pt-6">
          <Stack className="gap-3">
            <h4 className="font-primary font-medium">Your Data Rights</h4>
            <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
              Under GDPR and other privacy laws, you have the right to:
            </p>
            <ul className="font-secondary text-sm text-[hsl(var(--text-secondary))] space-y-1 ml-4">
              <li>• Access your personal data (Export)</li>
              <li>• Delete your personal data (Right to be forgotten)</li>
              <li>• Correct inaccurate data (Contact support)</li>
              <li>• Restrict processing (Contact support)</li>
              <li>• Data portability (Export feature)</li>
            </ul>
            <p className="font-secondary text-xs text-[hsl(var(--text-secondary))] pt-2">
              For questions about your data rights, please contact our support team.
            </p>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

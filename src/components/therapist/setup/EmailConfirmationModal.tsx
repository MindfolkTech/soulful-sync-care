import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck, AlertCircle } from 'lucide-react';

interface EmailConfirmationModalProps {
  userEmail: string | undefined;
  isOpen: boolean;
}

export function EmailConfirmationModal({ userEmail, isOpen }: EmailConfirmationModalProps) {
  const [isSending, setIsSending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!userEmail) return;
    
    setIsSending(true);
    setError(null);
    setResent(false);
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
    });

    if (error) {
      setError(error.message);
    } else {
      setResent(true);
    }
    
    setIsSending(false);
  };
  
  const handleEmailChange = () => {
    // This would typically navigate to an account settings page
    // For now, we can just log it.
    console.log("Redirecting to change email page...");
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Confirm Your Email</DialogTitle>
          <DialogDescription className="text-center">
            To continue setting up your profile, please verify your email address.
            We've sent a confirmation link to <strong>{userEmail}</strong>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Please check your inbox (and spam folder). Once you click the link, this page will update automatically.
          </p>
          
          {resent && (
            <Alert variant="default" className="bg-green-50 border-green-200">
              <MailCheck className="h-4 w-4 text-green-600" />
              <AlertTitle>Email Sent!</AlertTitle>
              <AlertDescription>
                A new confirmation link has been sent to your email address.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-2">
            <Button onClick={handleResend} disabled={isSending}>
              {isSending ? 'Sending...' : 'Resend Confirmation Email'}
            </Button>
            <Button variant="link" onClick={handleEmailChange}>
              Wrong email address?
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



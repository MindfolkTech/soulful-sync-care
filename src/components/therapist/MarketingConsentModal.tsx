import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Shield, X } from 'lucide-react';

interface MarketingConsentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConsent: (consented: boolean) => void;
  email: string;
  firstName: string;
}

export function MarketingConsentModal({
  open,
  onOpenChange,
  onConsent,
  email,
  firstName
}: MarketingConsentModalProps): JSX.Element {
  const [consented, setConsented] = useState(false);

  const handleContinue = (): void => {
    onConsent(consented);
    onOpenChange(false);
  };

  const handleSkip = (): void => {
    onConsent(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[hsl(var(--on-primary))]" />
            </div>
          </div>
          <DialogTitle className="font-primary text-xl">
            Stay connected with Mindfolk
          </DialogTitle>
          <DialogDescription className="font-secondary text-[hsl(var(--text-secondary))]">
            We'd love to help you complete your profile and start matching with ideal clients.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--surface-accent))] rounded-lg border border-[hsl(var(--border))]">
            <Checkbox
              id="marketing-consent"
              checked={consented}
              onCheckedChange={(checked) => setConsented(checked === true)}
              className="mt-1"
            />
            <div className="flex-1">
              <label
                htmlFor="marketing-consent"
                className="text-sm font-medium font-secondary cursor-pointer"
              >
                Yes, send me helpful emails about:
              </label>
              <ul className="text-xs text-[hsl(var(--text-secondary))] mt-2 space-y-1 ml-1">
                <li>• Completing my profile setup</li>
                <li>• Finding ideal clients</li>
                <li>• Tips for successful matching</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-[hsl(var(--text-muted))]">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p className="font-secondary">
              We'll send these emails to <strong className="text-[hsl(var(--text-primary))]">{email}</strong>.
              You can unsubscribe anytime. We never spam or share your email.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleSkip}
            className="w-full sm:w-auto"
          >
            Skip for now
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!consented}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        </DialogFooter>

        {!consented && (
          <p className="text-xs text-center text-[hsl(var(--text-muted))] font-secondary -mt-2">
            You can still complete Quick Start without opting in
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

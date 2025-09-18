import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ForgotPasswordDialog() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clerk = useClerk();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      await clerk.client.signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for a password reset link.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: "Failed to send reset link. Please check your email address.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm px-0 h-auto">
          Forgot your password?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-primary">Reset your password</DialogTitle>
          <DialogDescription className="font-secondary">
            Enter your email address and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !email}>
              {isLoading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-surface-secondary rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-secondary text-[hsl(var(--text-primary))]">Check your email</p>
              <p className="text-sm text-[hsl(var(--text-secondary))] font-secondary">
                We've sent a password reset link to {email}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

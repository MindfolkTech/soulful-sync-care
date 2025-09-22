import * as React from 'react';
import { MessageSquareText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MediaItem, TherapistData } from '@/components/molecules/therapist-card';

interface ReadyToConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist: TherapistData | null;
}

export function ReadyToConnectModal({ open, onOpenChange, therapist }: ReadyToConnectModalProps) {
  const navigate = useNavigate();
  
  if (!therapist) return null;

  const handleBookChemistryCall = () => {
    navigate(`/book/${therapist.id}`);
    onOpenChange(false);
  };

  const handleBookTherapySession = () => {
    navigate(`/book/${therapist.id}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay className="bg-[hsl(var(--modal-backdrop))] backdrop-blur-sm" />
        <DialogContent className="sm:max-w-md text-center p-8">
            <DialogClose className="absolute top-4 right-4 text-text-muted opacity-80 hover:opacity-100">
                <X className="h-5 w-5" />
            </DialogClose>
            <DialogHeader className="items-center">
            <div className="w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-success-bg text-success-text">
                <MessageSquareText className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-primary text-text-primary">
                Ready to connect with {therapist.name}?
            </DialogTitle>
            <DialogDescription className="text-text-muted pt-2 pb-4">
                You can book a free chemistry call to see if it's a good fit, or schedule a full session.
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="grid grid-cols-2 gap-4 items-center">
                <Button variant="ghost" className="text-primary font-semibold" onClick={handleBookChemistryCall}>
                    Book Free Chemistry Call
                </Button>
                <Button variant="ghost" className="text-primary font-semibold" onClick={handleBookTherapySession}>
                    Book Therapy Session
                </Button>
                <div className="col-span-2">
                    <Button variant="link" onClick={() => onOpenChange(false)} className="text-text-muted underline">
                        Skip for now
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}

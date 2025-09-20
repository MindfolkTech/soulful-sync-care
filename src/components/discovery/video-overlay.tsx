import * as React from "react";
import { X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  posterUrl?: string;
  title?: string;
}

export function VideoOverlay({ open, onOpenChange, videoUrl, posterUrl, title }: VideoOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-[hsl(var(--modal-backdrop))] backdrop-blur-sm" />
      <DialogContent className="bg-transparent max-w-4xl w-full p-0 border-none shadow-none">
        <DialogClose className="absolute -top-2 -right-2 z-10 bg-surface rounded-full p-1 text-text-secondary opacity-80 hover:opacity-100">
          <X className="h-5 w-5" />
        </DialogClose>
        <div className="aspect-video">
            <video
              src={videoUrl}
              poster={posterUrl}
              controls
              autoPlay
              className="w-full h-full rounded-lg shadow-2xl"
              aria-label={`${title} introduction video`}
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}

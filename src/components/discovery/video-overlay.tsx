import * as React from "react";
import { TherapistVideoOverlay } from "@/components/video";

interface VideoOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
  posterUrl?: string;
  title?: string;
}

export function VideoOverlay({ open, onOpenChange, videoUrl, posterUrl, title }: VideoOverlayProps) {
  return (
    <TherapistVideoOverlay
      open={open}
      onOpenChange={onOpenChange}
      videoUrl={videoUrl}
      posterUrl={posterUrl}
      therapistName={title}
    />
  );
}

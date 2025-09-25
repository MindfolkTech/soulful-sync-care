# Video Components

This directory contains custom video player components optimized for therapist profile videos with multi-source video support.

## Components

### 1. CloudflareStreamPlayer

A highly customized video player with:
- **Multi-source support**:
  - Cloudflare Stream HLS videos
  - YouTube videos (using YouTube Embed API)
  - Vimeo videos (using Vimeo Player API)
  - Standard HTML5 video files (MP4, WebM, etc.)
- Custom controls (play/pause, scrub, captions, mute)
- Adaptive behavior for mobile and desktop
- Keyboard shortcuts and swipe gestures
- Accessibility features
- Automatic caption support

### 2. TherapistVideoOverlay

A modal dialog component that displays therapist videos with:
- Responsive sizing for different devices
- Therapist information display
- Gesture support for dismissal
- Integration with design system tokens

## Usage

```tsx
import { TherapistVideoOverlay } from "@/components/video";

// In your component
function YourComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <TherapistVideoOverlay
      open={open}
      onOpenChange={setOpen}
      // Supports multiple video sources:
      videoUrl="https://example.cloudflare.stream/video.m3u8"  // Cloudflare Stream
      // videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"  // YouTube
      // videoUrl="https://vimeo.com/123456789"  // Vimeo
      // videoUrl="/videos/therapist-intro.mp4"  // Standard video file
      posterUrl="/images/poster.jpg"
      therapistName="Dr. Emma Wilson"
      therapistRate="£80/hr"
    />
  );
}
```

## Features

- **Default state**: Video paused with centered play icon, captions ON by default
- **Tap/Play behavior**: Opens fullscreen overlay on mobile
- **Controls**: Custom shadcn/ui controls for play/pause, scrub, captions, mute
- **Gestures**: Swipe down to dismiss, device back action support
- **Accessibility**: ARIA labels, touch targets 44-56px, keyboard shortcuts

## Keyboard Shortcuts

- **Space/K**: Play/pause
- **M**: Toggle mute
- **C**: Toggle captions
- **F**: Toggle fullscreen
- **Esc**: Exit overlay
- **Left/Right Arrow**: Seek -/+ 5 seconds

## Video Source Integration

### Cloudflare Stream
Optimized for Cloudflare Stream HLS URLs with support for:
- Adaptive bitrate streaming
- Video analytics (through Cloudflare dashboard)
- Captions and subtitles
- Global CDN delivery

### YouTube
Supports YouTube videos with:
- Privacy-enhanced mode (youtube-nocookie.com)
- Minimal branding
- Responsive sizing

### Vimeo
Supports Vimeo videos with:
- Clean player interface (no title, byline, portrait)
- Responsive sizing
- Fullscreen support

### Standard Video
Supports standard video files with:
- Custom controls
- Adaptive playback
- Metadata preloading
- Caption support

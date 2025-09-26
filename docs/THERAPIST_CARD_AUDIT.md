# 📋 Therapist Card Master Audit & Implementation Plan

## 🎯 Core Requirements

### 1. VIDEO PLAY OVERLAY (Priority: HIGH)
**Current Issue:** Play button not always visible on portrait
**Required Fix:**
- ✅ Always-visible play overlay on portrait (when video exists)
- ✅ 56×56px shadcn Button component
- ✅ Centered positioning with proper z-index
- ✅ `aria-label="Play therapist introduction video"`
- ✅ Subtle dark gradient backdrop (use `--overlay-dark` token)

**Implementation:**
```tsx
// In therapist-card.tsx
{therapist.video_url && (
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
    <Button
      size="icon"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white"
      aria-label="Play therapist introduction video"
      onClick={handlePlayVideo}
    >
      <Play className="h-6 w-6 text-black" />
    </Button>
  </div>
)}
```

### 2. CAPTION (CC) BADGE (Priority: HIGH)
**Current Issue:** No indication of caption availability on card
**Required Fix:**
- ✅ Small CC badge on card (top-left corner)
- ✅ Use tag/chip token styling
- ✅ Shows "CC on" state (captions enabled by default per spec)
- ✅ Full caption text ONLY in fullscreen overlay

**Implementation:**
```tsx
// In card media section
{therapist.video_url && (
  <div className="absolute top-2 left-2 z-10">
    <Badge variant="secondary" className="bg-black/70 text-white text-xs">
      CC on
    </Badge>
  </div>
)}
```

### 3. VIDEO CONTROLS PLACEMENT (Priority: HIGH)
**Current Issue:** Controls appearing in wrong places
**Required Fix:**

#### Discovery Card (Minimal):
- ✅ Play overlay button ONLY
- ✅ CC badge indicator
- ❌ NO scrub bar
- ❌ NO mute button
- ❌ NO other controls

#### Fullscreen Overlay (Full Chrome):
- ✅ Play/Pause button
- ✅ Scrub/progress bar
- ✅ CC toggle
- ✅ Mute/Volume control
- ✅ Therapist name + rate display
- ✅ Close (X) button
- ✅ ALL using shadcn/ui components
- ❌ NO vendor UI (YouTube/browser native)

### 4. VIDEO ERROR HANDLING (Priority: HIGH)
**Current Issue:** "Video unavailable" with YouTube UI showing
**Required Fix:**

**Debug Checklist:**
- [ ] Check console for CORS errors
- [ ] Verify 401/403 auth errors
- [ ] Check for expired signed URLs
- [ ] Validate video_url format in database
- [ ] Test Cloudflare Stream API keys

**Fallback UI:**
```tsx
// Video error state
{videoError && (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
    <img src={therapist.poster_url} alt="" className="mb-4 rounded-lg opacity-50" />
    <p className="text-text-muted mb-2">Video temporarily unavailable</p>
    <Button onClick={handleRetry} variant="outline" size="sm">
      Try Again
    </Button>
    {therapist.audio_url && (
      <Button onClick={playAudioOnly} variant="ghost" size="sm" className="mt-2">
        Listen to Audio Instead
      </Button>
    )}
  </div>
)}
```

### 5. NAVIGATION ARROWS (Priority: MEDIUM)
**Current Issue:** Desktop has unnecessary left/right carousel arrows
**Required Fix:**
- ❌ REMOVE desktop carousel navigation arrows
- ✅ Use action bar (Pass/Save) for navigation
- ✅ Undo toast handles mistakes
- ✅ Keep keyboard navigation (arrow keys)

### 6. PERSONALITY TAGS (Priority: MEDIUM)
**Current Issue:** Canonical personality tags missing from card
**Required Fix:**
- ✅ Display 2-3 personality tags on card
- ✅ Use proper tag tokens (`--tag-personality-bg`, `--tag-personality-text`)
- ✅ Position at bottom of media with gradient backdrop
- ✅ Responsive sizing (smaller on mobile)

**Database Check:**
```sql
SELECT personality_tags, communication_style, session_format 
FROM therapist_profiles 
WHERE user_id = ?;
```

### 7. MEDIA CONTAINER STYLING (Priority: MEDIUM)
**Required Fix:**
- ✅ `rounded-lg` for media container
- ✅ Consistent aspect ratio (3:4 portrait)
- ✅ Proper overflow handling
- ✅ Gradient overlays using design tokens

## 📱 Viewport-Specific Requirements

### MOBILE (320px - 768px)
- ✅ Full viewport card display
- ✅ Dedicated action bar at bottom
- ✅ 44px minimum touch targets
- ✅ Bottom navigation safe area padding
- ✅ Swipe gestures with `--motion-swipe` token
- ✅ Single column layout

### TABLET (768px - 1024px)
- ✅ Centered card with padding
- ✅ Max-width constraint (600px)
- ✅ Hover states on interactive elements
- ✅ Larger touch targets (48px)
- ✅ Side-by-side action buttons

### DESKTOP (1024px+)
- ✅ Three-column layout option
- ✅ Hover effects on cards
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Larger media preview
- ❌ Remove carousel arrows

## 🔗 Database Integration Requirements

### MCP Server Queries Needed:

1. **Fetch Video URLs with Refresh:**
```typescript
// Check and refresh expired URLs
const { data: videoData } = await supabase
  .rpc('get_fresh_video_url', { 
    therapist_id: therapist.id 
  });
```

2. **Update Video Metadata:**
```typescript
// Store caption availability
await supabase
  .from('therapist_profiles')
  .update({
    has_captions: true,
    video_duration: duration,
    updated_at: new Date()
  })
  .eq('user_id', therapist.user_id);
```

3. **Log Video Events:**
```typescript
// Track video interactions
await supabase
  .from('video_analytics')
  .insert({
    therapist_id: therapist.id,
    client_id: user.id,
    event_type: 'play_attempt',
    error_message: error?.message,
    timestamp: new Date()
  });
```

## 🎨 Design System Compliance

### Required Tokens:
- `--overlay-dark`: Dark gradient overlays
- `--tag-personality-bg/text`: Personality tag styling
- `--motion-swipe`: Swipe animations
- `--radius-lg`: Media container rounding
- `--shadow-card`: Card elevation
- `--touch-min`: Minimum touch target (44px)

### Component Usage:
- `Button` from shadcn/ui for all interactive elements
- `Badge` for CC indicator
- `Tag` for personality tags
- `Dialog` for fullscreen overlay
- `Slider` for video scrubbing
- Custom controls, NO native video UI

## ✅ Testing Checklist

### Functionality:
- [ ] Play button always visible when video exists
- [ ] CC badge shows on card
- [ ] Fullscreen opens with custom controls
- [ ] Video errors show fallback UI
- [ ] No vendor UI appears
- [ ] Personality tags display correctly
- [ ] Gradient overlays render properly

### Cross-Device:
- [ ] Mobile: Full viewport, swipe works
- [ ] Tablet: Centered layout, proper spacing
- [ ] Desktop: No carousel arrows, keyboard nav works
- [ ] All viewports: Touch targets meet minimums

### Database:
- [ ] Video URLs load correctly
- [ ] Expired URLs refresh automatically
- [ ] Analytics events log properly
- [ ] Metadata updates save

### Accessibility:
- [ ] ARIA labels present
- [ ] Keyboard navigation functional
- [ ] Focus indicators visible
- [ ] Screen reader compatible

## 🚀 Implementation Priority Order

1. **IMMEDIATE (Block release):**
   - Fix always-visible play overlay
   - Add CC badge to cards
   - Fix fullscreen custom controls
   - Debug video unavailable errors

2. **HIGH (This sprint):**
   - Remove carousel arrows
   - Add error fallback UI
   - Implement URL refresh logic
   - Mobile viewport verification

3. **MEDIUM (Next sprint):**
   - Restore personality tags
   - Add gradient overlays
   - Tablet/Desktop viewport polish
   - PostHog event logging

4. **LOW (Backlog):**
   - Audio-only fallback
   - Advanced analytics
   - Performance optimizations

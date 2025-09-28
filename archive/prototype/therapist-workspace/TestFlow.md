# 🧪 Testing the Complete Onboarding Flow

## How to Test the Safe Prototype

### Step 1: Start the Development Server
```bash
npm run dev
```
Server runs on: http://localhost:8080

### Step 2: Complete Quick Start (3 minutes)
1. Go to: **http://localhost:8080/prototype/therapist-quickstart**
2. Complete the 3-step flow:
   - Step 1: Basic info + credentials
   - Step 2: Communication & Session styles
   - Step 3: Welcome screen
3. This sets the `therapistQuickStartComplete` flag

### Step 3: Access the Wrapped Workspace
Go to: **http://localhost:8080/prototype/workspace/dashboard**

You'll see:
- ✅ Real therapist dashboard page
- ✅ OnboardingCoach overlay (bottom-right)
- ✅ Profile strength indicator (top-right)
- ✅ Automatic navigation between pages

### Step 4: Test the Coach Flow
The coach will guide you through:

1. **Dashboard** → Welcome message
2. **Profile** → Add specialties (20% match)
3. **Profile** → Add identity tags (20% match)
4. **Settings** → Set your rates
5. **Business** → Add availability
6. **Profile** → Record video (optional)

### What Makes This Safe?

| Aspect | Production | Prototype |
|--------|------------|-----------|
| **Route** | `/therapist/*` | `/prototype/workspace/*` |
| **Pages** | Original untouched | Same pages, wrapped |
| **Data** | Real database | localStorage only |
| **Coach** | Not present | Overlay added |
| **Impact** | None | Completely isolated |

### Key Features to Test

1. **Coach Navigation**
   - Click "Mark Complete" to progress
   - Watch it auto-navigate between pages
   - Try minimizing/maximizing the coach

2. **Profile Strength**
   - Starts at 30% (from Quick Start)
   - Increases with each completed step
   - Shows visual progress meter

3. **Element Highlighting**
   - Coach highlights specific sections
   - Green glow animation on target elements
   - Auto-scrolls to highlighted areas

4. **Gamification**
   - Rewards shown for each step
   - Celebration at 90% complete
   - Profile strength badges

### Resetting the Test

To restart the onboarding flow:
```javascript
// In browser console:
localStorage.removeItem('therapistQuickStartComplete');
localStorage.removeItem('therapistOnboardingComplete');
localStorage.removeItem('profileStrength');
```

Then refresh and start from Quick Start again.

### What We're Validating

- ✅ 3-minute Quick Start feasibility
- ✅ Coach doesn't break existing pages
- ✅ Navigation flow makes sense
- ✅ Gamification motivates completion
- ✅ Profile strength calculation accurate
- ✅ Element targeting works correctly

### Next Steps After Testing

1. **If successful:**
   - Move to production with feature flag
   - A/B test with/without coach
   - Track completion metrics

2. **If issues found:**
   - All changes are in `/prototype/` folder
   - Easy to modify without affecting production
   - Can delete entire folder if needed

## 🎯 Success Metrics to Track

- **Quick Start:** 95% completion in 3-5 min
- **First Quick Win:** 80% complete within session
- **Full Profile:** 75% reach 70%+ strength
- **Video Upload:** 45% complete (with AI assist)

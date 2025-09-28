import React from "react";
import { ProfileStrengthIndicator } from "./ProfileStrengthIndicator";

/**
 * Example usage of ProfileStrengthIndicator component
 *
 * This file shows how to integrate the ProfileStrengthIndicator into different pages
 * and scenarios. Remove this file once integration is complete.
 */

// Basic usage in a therapist dashboard
export const BasicUsageExample = () => {
  return (
    <div className="relative min-h-screen">
      <h1>Therapist Dashboard</h1>
      <p>Your dashboard content goes here...</p>

      {/* The indicator will position itself in the top-right corner */}
      <ProfileStrengthIndicator
        userId="current-user-id"
        showLabel={true}
      />
    </div>
  );
};

// Usage with custom improvement handler
export const CustomHandlerExample = () => {
  const handleImprove = () => {
    // Custom logic when user wants to improve profile
    console.log("Opening custom improvement flow...");
    // Could navigate to specific onboarding step
    // Could trigger custom modal
    // Could track analytics event
  };

  return (
    <div className="relative min-h-screen">
      <h1>Custom Handler Example</h1>

      <ProfileStrengthIndicator
        userId="current-user-id"
        showLabel={true}
        onImprove={handleImprove}
      />
    </div>
  );
};

// Mobile-only version (no label)
export const MobileExample = () => {
  return (
    <div className="relative min-h-screen">
      <h1>Mobile View</h1>

      <ProfileStrengthIndicator
        userId="current-user-id"
        showLabel={false}
        className="md:hidden" // Only show on mobile
      />
    </div>
  );
};

// Integration with existing layout
export const LayoutIntegrationExample = () => {
  return (
    <div className="relative">
      {/* Your existing TherapistLayout */}
      <div className="p-4 md:p-6 lg:p-8">
        <div className="container">
          <h1>Dashboard Content</h1>
          {/* Your existing dashboard content */}
        </div>
      </div>

      {/* Add the indicator */}
      <ProfileStrengthIndicator
        userId="current-user-id"
      />
    </div>
  );
};

/**
 * Integration Notes:
 *
 * 1. The component automatically positions itself fixed in the top-right corner
 * 2. It includes z-index management to appear above other content
 * 3. It's responsive and adapts to mobile/desktop automatically
 * 4. Real-time updates happen automatically via Supabase subscriptions
 * 5. Uses design tokens from the design system
 * 6. Includes proper accessibility features (ARIA labels, keyboard navigation)
 *
 * To integrate into your existing pages:
 * 1. Import the component
 * 2. Add it anywhere in your JSX (position is handled automatically)
 * 3. Pass the current user's ID
 * 4. Optionally customize with showLabel and onImprove props
 *
 * The component will handle:
 * - Loading states
 * - Error states
 * - Real-time profile updates
 * - Color coding based on completion percentage
 * - Hover interactions showing detailed breakdown
 * - Click interactions opening improvement modal
 * - Mobile responsiveness
 */
import React from "react";
import { QuickActionCards } from "./QuickActionCards";

/**
 * Example implementation of QuickActionCards component
 *
 * This demonstrates how to integrate the QuickActionCards into a dashboard
 * or other therapist interface pages.
 */

export function QuickActionCardsExample() {
  const handleActionClick = (actionId: string) => {
    console.log('Quick action clicked:', actionId);

    // Example analytics tracking
    // analytics.track('quick_action_clicked', {
    //   action_id: actionId,
    //   page: 'dashboard',
    //   timestamp: new Date().toISOString()
    // });

    // Example user feedback
    // toast.info(`Navigating to ${actionId} setup...`);
  };

  return (
    <div className="space-y-6">
      {/* Basic Usage */}
      <section>
        <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
          Basic Usage
        </h2>
        <QuickActionCards
          userId="example-user-id"
          onActionClick={handleActionClick}
        />
      </section>

      {/* Limited Cards */}
      <section>
        <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
          Limited to 2 Cards
        </h2>
        <QuickActionCards
          userId="example-user-id"
          maxCards={2}
          onActionClick={handleActionClick}
        />
      </section>

      {/* Custom Styling */}
      <section>
        <h2 className="font-primary text-xl font-semibold text-[hsl(var(--text-primary))] mb-4">
          Custom Styling
        </h2>
        <QuickActionCards
          userId="example-user-id"
          maxCards={3}
          className="grid-cols-1 md:grid-cols-3 gap-6"
          onActionClick={handleActionClick}
        />
      </section>
    </div>
  );
}

/**
 * Integration example for dashboard:
 *
 * ```tsx
 * import { QuickActionCards } from "@/components/therapist/onboarding";
 *
 * function TherapistDashboard() {
 *   const { user } = useAuth();
 *
 *   return (
 *     <div className="space-y-6">
 *       <h1>Dashboard</h1>
 *
 *       <div data-onboarding="quick-actions">
 *         <h2>Quick Actions</h2>
 *         <QuickActionCards
 *           userId={user?.id || ""}
 *           maxCards={4}
 *           onActionClick={(actionId) => {
 *             // Handle action clicks
 *             console.log('Action clicked:', actionId);
 *           }}
 *         />
 *       </div>
 *
 *       // ... rest of dashboard
 *     </div>
 *   );
 * }
 * ```
 */
import { Waitlist } from "@clerk/clerk-react";

export function ClerkWaitlist() {
  return (
    <Waitlist 
      afterJoinWaitlistUrl="/waitlist-success"
      appearance={{
        elements: {
          rootBox: "mx-auto max-w-md",
          card: "border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-lg rounded-[--radius-lg]",
          headerTitle: "font-primary text-[hsl(var(--text-primary))] text-2xl font-medium",
          headerSubtitle: "font-secondary text-[hsl(var(--text-secondary))] text-sm mt-2",
          formFieldInput: "w-full px-3 py-2 border border-[hsl(var(--border))] rounded-[--radius-md] bg-[hsl(var(--surface))] text-[hsl(var(--text-primary))] font-secondary focus:outline-none focus:ring-2 focus:ring-[hsl(var(--garden-green))] focus:border-transparent",
          formButtonPrimary: "w-full bg-[hsl(var(--garden-green))] hover:bg-[hsl(var(--jovial-jade))] text-[hsl(var(--btn-primary-text))] font-secondary font-medium py-2 px-4 rounded-[--radius-md] transition-colors min-h-[--touch-target-min]",
          footer: "text-center text-xs text-[hsl(var(--text-muted))] font-secondary mt-4"
        }
      }}
    />
  );
}
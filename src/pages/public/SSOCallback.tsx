import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function SSOCallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse mb-4">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Completing sign in...</p>
        </div>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}
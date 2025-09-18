import { useEffect } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SSOCallback() {
  const navigate = useNavigate();

  const handleCallback = () => {
    // Redirect will happen automatically based on user role via AuthGuard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <AuthenticateWithRedirectCallback 
        afterSignInUrl="/"
        afterSignUpUrl="/"
        redirectUrl="/"
      />
      <div className="text-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Completing sign in...</p>
        </div>
      </div>
    </div>
  );
}
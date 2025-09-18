import { ClerkProvider } from "@clerk/clerk-react";
import { ReactNode, useRef } from "react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

// Global flag to prevent multiple Clerk initialization
let clerkInitialized = false;

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const initRef = useRef(false);
  
  if (!clerkPubKey) {
    throw new Error("Missing Clerk Publishable Key");
  }

  // Prevent multiple initialization
  if (clerkInitialized || initRef.current) {
    console.warn("ClerkProvider already initialized, skipping duplicate initialization");
    return <>{children}</>;
  }

  initRef.current = true;
  clerkInitialized = true;

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "hsl(151 19% 46%)", // --garden-green
          colorBackground: "hsl(33 71% 97%)", // --warm-white
          colorText: "hsl(151 23% 29%)", // --text-primary
          colorTextSecondary: "hsl(210 8% 21%)", // --text-secondary
          borderRadius: "8px", // --radius-md
          fontFamily: "var(--font-secondary)", // Helvetica Neue
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export { clerkPubKey };
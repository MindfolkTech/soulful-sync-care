import { ClerkProvider } from "@clerk/clerk-react";
import { ReactNode } from "react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  if (!clerkPubKey) {
    throw new Error("Missing Clerk Publishable Key");
  }

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
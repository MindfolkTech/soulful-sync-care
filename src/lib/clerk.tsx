import { ClerkProvider } from "@clerk/clerk-react";
import { ReactNode } from "react";

const clerkPubKey = "pk_test_YWN0aXZlLXF1YWdnYS01OS5jbGVyay5hY2NvdW50cy5kZXYk";

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
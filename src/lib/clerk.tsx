import { ClerkProvider } from '@clerk/clerk-react'
import { ReactNode } from 'react'

const PUBLISHABLE_KEY = 'pk_test_YWN0aXZlLXF1YWdnYS01OS5jbGVyay5hY2NvdW50cy5kZXYk'

interface ClerkAuthProviderProps {
  children: ReactNode
}

export function ClerkAuthProvider({ children }: ClerkAuthProviderProps) {
  if (!PUBLISHABLE_KEY) {
    console.warn('Clerk publishable key not found. Authentication features will be disabled.');
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  )
}
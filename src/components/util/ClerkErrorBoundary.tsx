import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ClerkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if error is related to Clerk
    if (error.message.includes('Publishable Key') || error.message.includes('Clerk')) {
      return { hasError: true, error };
    }
    // Let other errors bubble up
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ClerkErrorBoundary caught an error:', error, errorInfo);
  }

  handleContinue = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-primary text-foreground">
                Authentication Temporarily Unavailable
              </h1>
              <p className="text-muted-foreground text-sm font-secondary">
                Don't worry - you can still browse and explore our platform. Authentication features will be restored shortly.
              </p>
            </div>
            
            <Button
              onClick={this.handleContinue}
              className="min-h-[var(--touch-target-comfort)] px-6 py-3"
            >
              Continue Browsing
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ClerkErrorBoundary;
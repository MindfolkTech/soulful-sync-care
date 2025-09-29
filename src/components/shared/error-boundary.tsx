import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  
  private handleRetry = () => {
    // Attempt to recover by forcing a re-render
    this.setState({ hasError: false });
  };


  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-warm-white text-center p-4">
            <h1 className="font-primary text-2xl text-text-primary mb-2">Something went wrong</h1>
            <p className="font-secondary text-text-muted mb-6">
                We're sorry, but something unexpected happened. Please try again.
            </p>
            <Button onClick={this.handleRetry}>
                Try again
            </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-text-primary hover:text-jovial-jade transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-garden-green flex items-center justify-center">
                <span className="text-white font-primary font-bold text-lg">M</span>
              </div>
              <span className="font-primary font-bold text-xl">MindFolk</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/browse" 
              className="text-text-secondary hover:text-text-primary transition-colors font-secondary"
            >
              Find a Therapist
            </Link>
            <Link 
              to="/therapist" 
              className="text-text-secondary hover:text-text-primary transition-colors font-secondary"
            >
              For Therapists
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
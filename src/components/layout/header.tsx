import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-warm-white/60"
      style={{ backgroundColor: "var(--warm-white)" }}
    >
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
              <span 
                className="font-bold text-xl"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Mindfolk
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/browse" 
              className="text-text-secondary hover:text-text-primary transition-colors font-secondary min-h-touch-target"
            >
              Find a Therapist
            </Link>
            <Link 
              to="/therapist" 
              className="text-text-secondary hover:text-text-primary transition-colors font-secondary min-h-touch-target"
            >
              For Therapists
            </Link>
            <Link 
              to="/sign-in" 
              className="text-text-secondary hover:text-text-primary transition-colors font-secondary min-h-touch-target"
            >
              Sign in
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button 
              asChild
              style={{ 
                backgroundColor: "var(--btn-primary-bg)", 
                color: "var(--btn-primary-text)" 
              }}
              className="min-h-touch-target"
            >
              <Link 
                to="/signup"
                aria-label="Create account and start assessment"
              >
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
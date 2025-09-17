import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TaskBadge } from "@/components/molecules/task-badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell } from "lucide-react";

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
                <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-lg">M</span>
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
              to="/discover" 
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
            {/* Task notifications - shown when user is logged in */}
            <TaskBadge count={3} role="client" />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              asChild
            >
              <Link to="/notifications" aria-label="View notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full flex items-center justify-center text-xs text-[hsl(var(--on-dark))]">
                  2
                </span>
              </Link>
            </Button>
            
            <Button 
              asChild
              style={{ 
                backgroundColor: "var(--btn-primary-bg)", 
                color: "var(--btn-primary-text)" 
              }}
              className="min-h-touch-target"
            >
              <Link 
                to="/sign-up"
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
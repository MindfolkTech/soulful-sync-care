import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ backgroundColor: "hsl(var(--warm-white))" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-[hsl(var(--text-primary))] hover:text-[hsl(var(--jovial-jade))] transition-colors"
          >
            <div 
              className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--garden-green))" }}
            >
              <span className="text-[hsl(var(--btn-primary-text))] font-primary font-bold text-lg">M</span>
            </div>
            <span 
              className="font-bold text-xl"
              style={{ 
                fontFamily: "var(--font-primary)",
                color: "hsl(var(--text-primary))"
              }}
            >
              MindFolk
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-[--space-lg]">
            <Link 
              to="/therapist" 
              className="font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors"
            >
              For Therapists
            </Link>
            
            <div className="flex items-center space-x-[--space-md]">
              <Button variant="ghost" asChild>
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            {/* Mobile Navigation Links */}
            <div className="px-4 py-2 space-y-1">
              <Link 
                to="/therapist"
                className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                onClick={() => setIsMenuOpen(false)}
              >
                For Therapists
              </Link>
              
              <Link 
                to="/sign-in"
                className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/sign-up"
                className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--garden-green))] hover:text-[hsl(var(--jovial-jade))] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
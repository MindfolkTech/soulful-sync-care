import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-surface border-t mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-[hsl(var(--garden-green))] flex items-center justify-center">
                  <span className="text-[hsl(var(--on-dark))] font-primary font-bold text-sm">M</span>
                </div>
                <span className="font-primary font-bold text-lg text-[hsl(var(--text-primary))]">MindFolk</span>
              </div>
              <p className="text-[hsl(var(--text-secondary))] text-sm font-secondary max-w-xs">
                Personality-first therapy matching with video profiles, free chemistry calls, and accessible care.
              </p>
            </div>

            <div>
              <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-4">For Clients</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/assessment" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Find a Therapist
                  </Link>
                </li>
                <li>
                  <Link to="/discover" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Browse Therapists
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-4">For Therapists</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/therapist/signup" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Join as Therapist
                  </Link>
                </li>
                <li>
                  <Link to="/t/dashboard" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Therapist Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/legal/privacy" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/terms" className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] transition-colors font-secondary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-[hsl(var(--text-secondary))] text-sm font-secondary">
                © 2024 MindFolk. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-[hsl(var(--text-secondary))] text-sm font-secondary">GDPR Compliant</span>
                <span className="text-[hsl(var(--text-secondary))] text-sm font-secondary">WCAG 2.1 AA</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
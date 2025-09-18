import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, profile, user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

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
            
            {isSignedIn && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.imageUrl} alt={`${profile.first_name} ${profile.last_name}`} />
                      <AvatarFallback>
                        {profile.first_name?.[0]}{profile.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  {profile.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/overview" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {profile.role === 'therapist' && (
                    <DropdownMenuItem asChild>
                      <Link to="/t/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-[--space-md]">
                <Button variant="ghost" asChild>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
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
              
              {isSignedIn && profile ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-[hsl(var(--text-primary))]">
                    {profile.first_name} {profile.last_name}
                  </div>
                  <Link 
                    to="/account"
                    className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Account
                  </Link>
                  {profile.role === 'admin' && (
                    <Link 
                      to="/admin/overview"
                      className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  {profile.role === 'therapist' && (
                    <Link 
                      to="/t/dashboard"
                      className="block px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md font-secondary text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-accent))]"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
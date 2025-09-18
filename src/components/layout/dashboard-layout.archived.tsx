/**
 * ARCHIVED COMPONENT - NOT CURRENTLY IN USE
 * 
 * This DashboardLayout component has been archived and is not being used
 * in the current application. The app now uses:
 * - TherapistLayout for all therapist pages
 * - AdminLayout for all admin pages
 * 
 * This component is kept for reference but should not be imported or used.
 * 
 * @deprecated Use TherapistLayout or AdminLayout instead
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search, 
  Home, 
  Users, 
  User, 
  BarChart3, 
  PlusCircle,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TherapistBottomNav } from "@/components/therapist/therapist-bottom-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * ARCHIVED - DO NOT USE
 * Use TherapistLayout or AdminLayout instead
 */
export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { href: "/t/dashboard", icon: Home, label: "Dashboard" },
    { href: "/t/clients", icon: Users, label: "My Clients" },
    { href: "/t/profile", icon: User, label: "My Profile" },
    { href: "/t/analytics", icon: BarChart3, label: "Performance & Analytics" },
  ];

  const quickActions = [
    "Update pricing",
    "Add a new video", 
    "Learn engagement boost",
    "FAQ"
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-dvh overflow-hidden bg-background">
      {/* Header Section */}
      <header className="row-start-1 bg-[hsl(var(--jovial-jade))] text-[hsl(var(--on-dark))] relative z-50">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Menu, Logo, Search */}
            <div className="flex items-center gap-4">
              {/* Menu toggle - visible on all screen sizes */}
              <Button
                variant="ghost"
                size="sm"
                className="text-[hsl(var(--on-dark))] hover:bg-white/20 min-h-touch-min"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <h1 className="font-primary text-xl font-bold text-[hsl(var(--on-dark))]">Mindfolk</h1>
              
              {/* Search bar - always visible on desktop, hidden on mobile when sidebar is open */}
              <div className={`relative ${sidebarOpen ? 'hidden md:block' : 'hidden sm:block'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  id="client-search"
                  name="clientSearch"
                  type="search" 
                  placeholder="Search Clients" 
                  className="pl-10 pr-4 py-2 bg-white text-foreground rounded border-0 focus:ring-2 focus:ring-white/30 focus:outline-none min-h-touch-min w-48 md:w-64"
                  aria-label="Search clients"
                />
              </div>
            </div>
            
            {/* Right side - User avatar with profile link */}
            <Link 
              to="/t/profile" 
              className="w-10 h-10 bg-[hsl(var(--surface-accent))] rounded-full flex items-center justify-center min-h-touch-min min-w-[2.5rem] hover:bg-white/10 transition-colors"
              aria-label="Go to profile settings"
            >
              <span className="font-secondary text-sm font-semibold text-[hsl(var(--jovial-jade))]">CT</span>
            </Link>
          </div>
        </Container>
      </header>

      {/* Main content area with sidebar */}
      <div className="row-start-2 flex overflow-hidden">
        {/* Sidebar Navigation - Collapsible on all screen sizes */}
        <aside className={`
          fixed lg:fixed inset-y-0 left-0 z-40
          w-64 bg-[hsl(var(--surface-accent))] min-h-full
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-hidden
        `}>
          <div className="h-full">
            <div className="py-6 h-full px-4 lg:px-6">
              <nav className="space-y-2 h-full flex flex-col">
            {/* Main navigation */}
            <div className="flex-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.href);
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-colors min-h-touch-min
                      ${isActive 
                        ? 'bg-[hsl(var(--jovial-jade))] text-[hsl(var(--on-dark))]' 
                        : 'text-[hsl(var(--jovial-jade))] hover:bg-[hsl(var(--jovial-jade))] hover:text-[hsl(var(--on-dark))]'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-secondary font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-[hsl(var(--border))] my-4"></div>
              
              {/* Quick Actions */}
              <div>
                <h3 className="font-primary text-[hsl(var(--jovial-jade))] font-semibold text-sm mb-2">QUICK ACTIONS</h3>
                <div className="space-y-1">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="w-full justify-start font-secondary text-[hsl(var(--jovial-jade))] hover:bg-[hsl(var(--jovial-jade))] hover:text-[hsl(var(--on-dark))] min-h-touch-min"
                      aria-label={`Quick action: ${action}`}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sign out at bottom */}
            <div className="border-t border-[hsl(var(--border))] pt-4">
              <button className="flex items-center gap-3 py-2 text-[hsl(var(--jovial-jade))] hover:text-[hsl(var(--garden-green))] transition-colors min-h-touch-min w-full justify-start" aria-label="Sign out of account">
                <span className="font-secondary text-sm">Sign out</span>
              </button>
            </div>
              </nav>
            </div>
          </div>
        </aside>

        {/* Overlay for when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Full width when sidebar is closed */}
        <main className="flex-1 overflow-auto min-w-0 w-full">
          <Container className="py-8 min-h-full max-w-full">
            {/* Page title section */}
            {(title || subtitle) && (
              <div className="mb-[--space-xl]">
                {title && (
                  <h2 className="font-primary text-[hsl(var(--text-3xl))] font-bold text-[hsl(var(--jovial-jade))] mb-[--space-xs]">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="font-secondary text-[hsl(var(--text-secondary))]">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            
            {/* Page content */}
            <div className="min-h-0 w-full overflow-auto">
              {children}
            </div>
          </Container>
        </main>
      </div>
      
      {/* Bottom Navigation - Mobile Only */}
      <TherapistBottomNav />
    </div>
  );
}

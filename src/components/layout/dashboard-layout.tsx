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

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

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
      <header className="row-start-1 bg-jovial-jade text-white relative z-50">
        <Container className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/20 min-h-touch-min"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <h1 className="font-primary text-xl font-bold text-white">Mindfolk</h1>
              
              {/* Search bar - hidden on mobile when sidebar is open */}
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
            
            {/* User avatar */}
            <div className="w-10 h-10 bg-surface-accent rounded-full flex items-center justify-center min-h-touch-min min-w-[2.5rem]">
              <span className="font-secondary text-sm font-semibold text-jovial-jade">CT</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Main content area with sidebar */}
      <div className="row-start-2 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-64 bg-surface-accent min-h-full
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          overflow-hidden
        `}>
          <div className="h-full">
            <Container className="py-6 h-full">
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
                        ? 'bg-jovial-jade text-white' 
                        : 'text-jovial-jade hover:bg-jovial-jade hover:text-white'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-secondary font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-border my-4"></div>
              
              {/* Quick Actions */}
              <div>
                <h3 className="font-primary text-jovial-jade font-semibold text-sm mb-2">QUICK ACTIONS</h3>
                <div className="space-y-1">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="w-full justify-start font-secondary text-jovial-jade hover:bg-jovial-jade hover:text-white min-h-touch-min"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sign out at bottom */}
            <div className="border-t border-border pt-4">
              <button className="flex items-center gap-3 py-2 text-jovial-jade hover:text-garden-green transition-colors min-h-touch-min w-full justify-start">
                <span className="font-secondary text-sm">Sign out</span>
              </button>
            </div>
              </nav>
            </Container>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto min-w-0 w-full">
          <Container className="py-8 min-h-full max-w-full">
            {/* Page title section */}
            {(title || subtitle) && (
              <div className="mb-8">
                {title && (
                  <h1 className="font-primary text-3xl font-bold text-jovial-jade mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="font-secondary text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            
            {/* Page content */}
            <div className="min-h-0 w-full overflow-hidden">
              {children}
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
}

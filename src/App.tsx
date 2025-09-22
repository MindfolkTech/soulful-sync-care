import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsent } from "@/components/legal/cookie-consent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ImpersonationProvider } from "@/contexts/impersonation-context";
import { GlobalImpersonationBar } from "@/components/admin/global-impersonation-bar";
import ErrorBoundary from "@/components/util/ErrorBoundary";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// App-level loading component
const AppLoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <p className="text-secondary text-sm">Loading your session...</p>
    </div>
  </div>
);

// Simple auth guard component
const AuthGuard = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user && requiredRole) {
        setRoleLoading(true);
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
          
          if (error) {
            console.error('AuthGuard: Database error:', error);
            setUserRole('client'); // Default to client on error
          } else {
            const role = profile?.role || 'client';
            setUserRole(role);
          }
        } catch (error) {
          console.error('AuthGuard: Exception while fetching user role:', error);
          setUserRole('client');
        } finally {
          setRoleLoading(false);
        }
      } else if (!requiredRole) {
        // No role required, allow access
        setUserRole('any');
        setRoleLoading(false);
      }
    };

    checkUserRole();
  }, [user, requiredRole]);

  if (loading) {
    return <AppLoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (requiredRole && roleLoading) {
    return <AppLoadingScreen />;
  }

  if (requiredRole && userRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Pages
import Index from "./pages/Index";
import TherapistLanding from "./pages/TherapistLanding";
import NotFound from "./pages/NotFound";

// Public pages
import SignIn from "./pages/public/SignIn";
import SignUp from "./pages/public/SignUp";
import Terms from "./pages/public/Terms";
import Privacy from "./pages/public/Privacy";
import DocumentPolicy from "./pages/public/DocumentPolicy";

// Client pages
import Assessment from "./pages/client/Assessment";
import Discover from "./pages/client/Discover";
import TherapistDetail from "./pages/client/TherapistDetail";
import BookAppointment from "./pages/client/BookAppointment";
import Appointments from "./pages/client/Appointments";
import Favorites from "./pages/client/Favorites";
import Notifications from "./pages/client/Notifications";
import Account from "./pages/client/Account";
import Messages from "./pages/client/Messages";
import Billing from "./pages/client/Billing";
import ClientTasks from "./pages/client/Tasks";
import ClientFeedback from "./pages/client/Feedback";

// Therapist pages
import TherapistSignUp from "./pages/therapist/SignUp";
import OnboardingWelcome from "./pages/therapist/onboarding/Welcome";
import OnboardingCredentials from "./pages/therapist/onboarding/Credentials";
import OnboardingVerification from "./pages/therapist/onboarding/Verification";
import TherapistProfile from "./pages/therapist/Profile";
import PracticeProfile from "./pages/therapist/practice/Profile";
import PracticeCredentials from "./pages/therapist/practice/Credentials";
import PracticeServices from "./pages/therapist/practice/Services";
import PracticePolicies from "./pages/therapist/practice/Policies";

import TherapistClients from "./pages/therapist/Clients";
import TherapistClientTasks from "./pages/therapist/ClientTasks";
import TherapistSchedule from "./pages/therapist/Schedule";
import TherapistBusiness from "./pages/therapist/Business";
import TherapistSettings from "./pages/therapist/Settings";
import TherapistDashboard from "./pages/therapist/Dashboard";
import ClientDetail from "./pages/therapist/ClientDetail";
import TherapistSetup from "./pages/therapist/Setup";

// Session pages
import SessionRoom from "./pages/session/SessionRoom";

// Admin pages
import AdminOverview from "./pages/admin/Overview";
import AdminUsers from "./pages/admin/Users";
import AdminTherapists from "./pages/admin/Therapists";
import AdminModeration from "./pages/admin/Moderation";
import AdminBookings from "./pages/admin/Bookings";
import AdminFeatureFlags from "./pages/admin/FeatureFlags";
import AdminWebhooks from "./pages/admin/Webhooks";
import AdminAudit from "./pages/admin/Audit";
import AdminSupport from "./pages/admin/Support";
import AdminTasks from "./pages/admin/Tasks";
import AdminTaxonomy from "./pages/admin/Taxonomy";

// Dev pages
import ScreenshotCapturePage from "./pages/dev/ScreenshotCapture";
import SessionManagementDemo from "./pages/dev/SessionManagementDemo";

const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useAuth();

  // Show a loading screen for the entire app until the initial session is loaded.
  // This prevents the AuthGuard from running with incomplete data.
  if (loading) {
    return <AppLoadingScreen />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ImpersonationProvider>
            <GlobalImpersonationBar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/therapist" element={<TherapistLanding />} />
              <Route path="/therapist/signup" element={<TherapistSignUp />} />
              {/* Redirect old therapist URLs to correct /t/ paths */}
              <Route path="/therapist/onboarding/*" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/therapist/dashboard" element={<Navigate to="/t/dashboard" replace />} />
              <Route path="/therapist/profile" element={<Navigate to="/t/profile" replace />} />
              <Route path="/therapist/clients" element={<Navigate to="/t/clients" replace />} />
              <Route path="/therapist/schedule" element={<Navigate to="/t/schedule" replace />} />
              <Route path="/therapist/business" element={<Navigate to="/t/business" replace />} />
              <Route path="/therapist/settings" element={<Navigate to="/t/settings" replace />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/document-policy" element={<DocumentPolicy />} />

              {/* Client routes */}
              <Route path="/assessment" element={<AuthGuard><Assessment /></AuthGuard>} />
              <Route path="/discover" element={<AuthGuard><Discover /></AuthGuard>} />
              <Route path="/therapists/:id" element={<AuthGuard><TherapistDetail /></AuthGuard>} />
              <Route path="/book/:id" element={<AuthGuard><BookAppointment /></AuthGuard>} />
              <Route path="/appointments" element={<AuthGuard><Appointments /></AuthGuard>} />
              <Route path="/favorites" element={<AuthGuard><Favorites /></AuthGuard>} />
              <Route path="/notifications" element={<AuthGuard><Notifications /></AuthGuard>} />
              <Route path="/account" element={<AuthGuard><Account /></AuthGuard>} />
              <Route path="/messages" element={<AuthGuard><Messages /></AuthGuard>} />
              <Route path="/billing" element={<AuthGuard><Billing /></AuthGuard>} />
              <Route path="/client/tasks" element={<AuthGuard><ClientTasks /></AuthGuard>} />
              <Route path="/client/feedback/:id" element={<AuthGuard><ClientFeedback /></AuthGuard>} />

              {/* Therapist routes */}
              <Route path="/t/onboarding" element={<AuthGuard requiredRole="therapist"><OnboardingWelcome /></AuthGuard>} />
              <Route path="/t/onboarding/credentials" element={<AuthGuard requiredRole="therapist"><OnboardingCredentials /></AuthGuard>} />
              <Route path="/t/onboarding/verification" element={<AuthGuard requiredRole="therapist"><OnboardingVerification /></AuthGuard>} />
              <Route path="/t/setup" element={<AuthGuard requiredRole="therapist"><TherapistSetup /></AuthGuard>} />
              <Route path="/t/profile" element={<AuthGuard requiredRole="therapist"><TherapistProfile /></AuthGuard>} />
              
              {/* Practice routes */}
              <Route path="/t/practice/profile" element={<AuthGuard requiredRole="therapist"><PracticeProfile /></AuthGuard>} />
              <Route path="/t/practice/credentials" element={<AuthGuard requiredRole="therapist"><PracticeCredentials /></AuthGuard>} />
              <Route path="/t/practice/services" element={<AuthGuard requiredRole="therapist"><PracticeServices /></AuthGuard>} />
              <Route path="/t/practice/policies" element={<AuthGuard requiredRole="therapist"><PracticePolicies /></AuthGuard>} />
              
              <Route path="/t/clients" element={<AuthGuard requiredRole="therapist"><TherapistClients /></AuthGuard>} />
              <Route path="/t/clients/tasks" element={<AuthGuard requiredRole="therapist"><TherapistClientTasks /></AuthGuard>} />
              <Route path="/t/schedule" element={<AuthGuard requiredRole="therapist"><TherapistSchedule /></AuthGuard>} />
              <Route path="/t/clients/:id" element={<AuthGuard requiredRole="therapist"><ClientDetail /></AuthGuard>} />
              <Route path="/t/dashboard" element={<AuthGuard requiredRole="therapist"><TherapistDashboard /></AuthGuard>} />
              <Route path="/t/business" element={<AuthGuard requiredRole="therapist"><TherapistBusiness /></AuthGuard>} />
              <Route path="/t/settings" element={<AuthGuard requiredRole="therapist"><TherapistSettings /></AuthGuard>} />

              {/* Session routes */}
              <Route path="/session/:sessionId" element={<AuthGuard><SessionRoom /></AuthGuard>} />

              {/* Admin routes */}
              <Route path="/admin/overview" element={<AuthGuard requiredRole="admin"><AdminOverview /></AuthGuard>} />
              <Route path="/admin/users" element={<AuthGuard requiredRole="admin"><AdminUsers /></AuthGuard>} />
              <Route path="/admin/therapists" element={<AuthGuard requiredRole="admin"><AdminTherapists /></AuthGuard>} />
              <Route path="/admin/moderation" element={<AuthGuard requiredRole="admin"><AdminModeration /></AuthGuard>} />
              <Route path="/admin/bookings" element={<AuthGuard requiredRole="admin"><AdminBookings /></AuthGuard>} />
              <Route path="/admin/feature-flags" element={<AuthGuard requiredRole="admin"><AdminFeatureFlags /></AuthGuard>} />
              <Route path="/admin/webhooks" element={<AuthGuard requiredRole="admin"><AdminWebhooks /></AuthGuard>} />
              <Route path="/admin/audit" element={<AuthGuard requiredRole="admin"><AdminAudit /></AuthGuard>} />
              <Route path="/admin/support" element={<AuthGuard requiredRole="admin"><AdminSupport /></AuthGuard>} />
              <Route path="/admin/tasks" element={<AuthGuard requiredRole="admin"><AdminTasks /></AuthGuard>} />
              <Route path="/admin/taxonomy" element={<AuthGuard requiredRole="admin"><AdminTaxonomy /></AuthGuard>} />

              {/* Dev routes */}
              <Route path="/dev/screenshots" element={<AuthGuard requiredRole="admin"><ScreenshotCapturePage /></AuthGuard>} />
              <Route path="/dev/session-management" element={<AuthGuard requiredRole="admin"><SessionManagementDemo /></AuthGuard>} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ImpersonationProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  console.log('App: Starting application');
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
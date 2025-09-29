import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CookieConsent } from "@/components/legal/cookie-consent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ImpersonationProvider } from "@/contexts/impersonation-context";
import { GlobalImpersonationBar } from "@/components/admin/global-impersonation-bar";
import { RoleSwitchingProvider, useRoleSwitching } from "@/contexts/role-switching-context";
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

// Enhanced auth guard component with role switching support
const AuthGuard = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user, loading } = useAuth();
  const { currentViewRole, actualUserRole, isAdmin } = useRoleSwitching();

  if (loading) {
    return <AppLoadingScreen />;
  }

  if (!user) {
    console.log('AuthGuard: No user, redirecting to sign-in');
    return <Navigate to="/sign-in" replace />;
  }

  // If no role required, allow access
  if (!requiredRole) {
    return <>{children}</>;
  }

  console.log('AuthGuard: Required role:', requiredRole, 'Current view role:', currentViewRole, 'Actual user role:', actualUserRole);

  // If we haven't loaded the actual user role yet, wait
  if (actualUserRole === null) {
    console.log('AuthGuard: Waiting for role to load...');
    return <AppLoadingScreen />;
  }

  // For admins: always allow access to all pages regardless of role
  if (isAdmin) {
    console.log('AuthGuard: Admin access granted to all pages - admin override');
    return <>{children}</>;
  }

  // For non-admins, check if they have the required role
  if (actualUserRole !== requiredRole) {
    console.log('AuthGuard: Access denied, redirecting to home');
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
import OnboardingRouter from "./pages/therapist/OnboardingRouter";
import TherapistQuickStart from "./pages/therapist/QuickStart";
// ARCHIVED: Legacy V1 onboarding files moved to archive/legacy-onboarding/
// import OnboardingWelcome from "./pages/therapist/onboarding/Welcome";
// import OnboardingCredentials from "./pages/therapist/onboarding/Credentials";
import OnboardingVerification from "./pages/therapist/onboarding/Verification";
import TherapistProfile from "./pages/therapist/Profile";
// ARCHIVED: Practice pages (duplicates) moved to archive/legacy-onboarding/practice/
// import PracticeProfile from "./pages/therapist/practice/Profile";
// import PracticeCredentials from "./pages/therapist/practice/Credentials";
// import PracticeServices from "./pages/therapist/practice/Services";
// import PracticePolicies from "./pages/therapist/practice/Policies";

import TherapistClients from "./pages/therapist/Clients";
import TherapistClientTasks from "./pages/therapist/ClientTasks";
import TherapistSchedule from "./pages/therapist/Schedule";
import TherapistBusiness from "./pages/therapist/Business";
import TherapistSettings from "./pages/therapist/Settings";
import TherapistDashboard from "./pages/therapist/Dashboard";
import ClientDetail from "./pages/therapist/ClientDetail";
// ARCHIVED: Legacy setup flow moved to archive/legacy-onboarding/
// import TherapistSetup from "./pages/therapist/Setup";

// Session pages
import SessionRoom from "./pages/session/SessionRoom";

// ARCHIVED: Prototype pages moved to archive/prototype/
// import { TherapistQuickStart } from "./prototype/therapist-onboarding/QuickStart";
// import { PrototypeRouter } from "./prototype/therapist-workspace/PrototypeRouter";

// Therapist workspace integration
import { TherapistWorkspaceProvider } from "@/components/therapist/onboarding/TherapistWorkspaceProvider";

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
import AdminRoleSwitcher from "./pages/admin/RoleSwitcher";

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
          <RoleSwitchingProvider>
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
              <Route path="/assessment" element={<AuthGuard requiredRole="client"><Assessment /></AuthGuard>} />
              <Route path="/discover" element={<AuthGuard requiredRole="client"><Discover /></AuthGuard>} />
              <Route path="/therapists/:id" element={<AuthGuard requiredRole="client"><TherapistDetail /></AuthGuard>} />
              <Route path="/book/:id" element={<AuthGuard requiredRole="client"><BookAppointment /></AuthGuard>} />
              <Route path="/appointments" element={<AuthGuard requiredRole="client"><Appointments /></AuthGuard>} />
              <Route path="/favorites" element={<AuthGuard requiredRole="client"><Favorites /></AuthGuard>} />
              <Route path="/notifications" element={<AuthGuard requiredRole="client"><Notifications /></AuthGuard>} />
              <Route path="/account" element={<AuthGuard requiredRole="client"><Account /></AuthGuard>} />
              <Route path="/messages" element={<AuthGuard requiredRole="client"><Messages /></AuthGuard>} />
              <Route path="/billing" element={<AuthGuard requiredRole="client"><Billing /></AuthGuard>} />
              <Route path="/client/tasks" element={<AuthGuard requiredRole="client"><ClientTasks /></AuthGuard>} />
              <Route path="/client/feedback/:id" element={<AuthGuard requiredRole="client"><ClientFeedback /></AuthGuard>} />
              
              {/* Client Onboarding - for admin testing */}
              <Route path="/client/onboarding" element={<AuthGuard requiredRole="client"><Assessment /></AuthGuard>} />
              <Route path="/client/onboarding/assessment" element={<AuthGuard requiredRole="client"><Assessment /></AuthGuard>} />

              {/* Therapist routes - V2 onboarding system */}
              <Route path="/t/quick-start" element={<AuthGuard requiredRole="therapist"><TherapistQuickStart /></AuthGuard>} />
              <Route path="/t/onboarding" element={<AuthGuard requiredRole="therapist"><OnboardingRouter /></AuthGuard>} />
              {/* ARCHIVED: Legacy onboarding routes replaced by V2 QuickStart */}
              <Route path="/t/onboarding/credentials" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/welcome" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/policies" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/profile" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/approach" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/video" element={<Navigate to="/t/onboarding" replace />} />
              <Route path="/t/onboarding/verification" element={<AuthGuard requiredRole="therapist"><OnboardingVerification /></AuthGuard>} />
              {/* ARCHIVED: Legacy setup route */}
              <Route path="/t/setup" element={<Navigate to="/t/onboarding" replace />} />

              {/* Main workspace routes with contextual onboarding */}
              <Route path="/t/profile" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistProfile /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/clients" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistClients /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/clients/tasks" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistClientTasks /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/schedule" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistSchedule /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/clients/:id" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><ClientDetail /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/dashboard" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistDashboard /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/business" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistBusiness /></TherapistWorkspaceProvider></AuthGuard>} />
              <Route path="/t/settings" element={<AuthGuard requiredRole="therapist"><TherapistWorkspaceProvider><TherapistSettings /></TherapistWorkspaceProvider></AuthGuard>} />

              {/* ARCHIVED: Practice routes (duplicates of workspace pages) */}
              <Route path="/t/practice/profile" element={<Navigate to="/t/profile" replace />} />
              <Route path="/t/practice/credentials" element={<Navigate to="/t/profile" replace />} />
              <Route path="/t/practice/services" element={<Navigate to="/t/profile" replace />} />
              <Route path="/t/practice/policies" element={<Navigate to="/t/profile" replace />} />
              <Route path="/t/practice/*" element={<Navigate to="/t/profile" replace />} />

              {/* Session routes */}
              <Route path="/session/:sessionId" element={<AuthGuard><SessionRoom /></AuthGuard>} />

              {/* ARCHIVED: Prototype routes moved to archive/prototype/ */}
              {/* <Route path="/prototype/therapist-quickstart" element={<TherapistQuickStart />} /> */}
              {/* <Route path="/prototype/workspace/*" element={<PrototypeRouter />} /> */}

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
              <Route path="/admin/role-switcher" element={<AuthGuard requiredRole="admin"><AdminRoleSwitcher /></AuthGuard>} />

              {/* Dev routes */}
              <Route path="/dev/screenshots" element={<AuthGuard requiredRole="admin"><ScreenshotCapturePage /></AuthGuard>} />
              <Route path="/dev/session-management" element={<AuthGuard requiredRole="admin"><SessionManagementDemo /></AuthGuard>} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </ImpersonationProvider>
          </RoleSwitchingProvider>
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
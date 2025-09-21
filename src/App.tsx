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

// Simple auth guard component
const AuthGuard = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user, loading } = useAuth();

  console.log('AuthGuard: Checking auth', { user: !!user, loading, requiredRole });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-secondary text-sm">Loading your session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('AuthGuard: No user, redirecting to sign-in');
    return <Navigate to="/sign-in" replace />;
  }

  // TODO: Implement role checking
  if (requiredRole) {
    console.log('AuthGuard: Role checking not implemented', { requiredRole });
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

// Therapist pages
import TherapistSignUp from "./pages/therapist/SignUp";
import TherapistOnboarding from "./pages/therapist/Onboarding";
import TherapistProfile from "./pages/therapist/Profile";
import TherapistAvailability from "./pages/therapist/Availability";
import TherapistBookings from "./pages/therapist/Bookings";
import TherapistClients from "./pages/therapist/Clients";
import TherapistAnalytics from "./pages/therapist/Analytics";
import TherapistDashboard from "./pages/therapist/Dashboard";
import TherapistMessages from "./pages/therapist/Messages";
import TherapistPayouts from "./pages/therapist/Payouts";
import TherapistEarnings from "./pages/therapist/Earnings";
import TherapistTasks from "./pages/therapist/Tasks";
import ClientDetail from "./pages/therapist/ClientDetail";

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

// Dev pages
import ScreenshotCapturePage from "./pages/dev/ScreenshotCapture";
import SessionManagementDemo from "./pages/dev/SessionManagementDemo";

const queryClient = new QueryClient();

const AppContent = () => {
  console.log('AppContent: Rendering app content');
  
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
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/privacy" element={<Privacy />} />

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

              {/* Therapist routes */}
              <Route path="/t/onboarding" element={<AuthGuard requiredRole="therapist"><TherapistOnboarding /></AuthGuard>} />
              <Route path="/t/profile" element={<AuthGuard requiredRole="therapist"><TherapistProfile /></AuthGuard>} />
              <Route path="/t/availability" element={<AuthGuard requiredRole="therapist"><TherapistAvailability /></AuthGuard>} />
              <Route path="/t/bookings" element={<AuthGuard requiredRole="therapist"><TherapistBookings /></AuthGuard>} />
              <Route path="/t/clients" element={<AuthGuard requiredRole="therapist"><TherapistClients /></AuthGuard>} />
              <Route path="/t/clients/:id" element={<AuthGuard requiredRole="therapist"><ClientDetail /></AuthGuard>} />
              <Route path="/t/analytics" element={<AuthGuard requiredRole="therapist"><TherapistAnalytics /></AuthGuard>} />
              <Route path="/t/dashboard" element={<AuthGuard requiredRole="therapist"><TherapistDashboard /></AuthGuard>} />
              <Route path="/t/messages" element={<AuthGuard requiredRole="therapist"><TherapistMessages /></AuthGuard>} />
              <Route path="/t/payouts" element={<AuthGuard requiredRole="therapist"><TherapistPayouts /></AuthGuard>} />
              <Route path="/t/earnings" element={<AuthGuard requiredRole="therapist"><TherapistEarnings /></AuthGuard>} />
              <Route path="/t/tasks" element={<AuthGuard requiredRole="therapist"><TherapistTasks /></AuthGuard>} />

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
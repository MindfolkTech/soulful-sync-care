import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// Therapist pages
import TherapistOnboarding from "./pages/therapist/Onboarding";
import TherapistProfile from "./pages/therapist/Profile";
import TherapistAvailability from "./pages/therapist/Availability";
import TherapistBookings from "./pages/therapist/Bookings";
import TherapistClients from "./pages/therapist/Clients";
import TherapistAnalytics from "./pages/therapist/Analytics";
import TherapistDashboard from "./pages/therapist/Dashboard";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/therapist" element={<TherapistLanding />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/privacy" element={<Privacy />} />

          {/* Client routes */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/therapists/:id" element={<TherapistDetail />} />
          <Route path="/book/:id" element={<BookAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/account" element={<Account />} />

          {/* Therapist routes */}
          <Route path="/t/onboarding" element={<TherapistOnboarding />} />
          <Route path="/t/profile" element={<TherapistProfile />} />
          <Route path="/t/availability" element={<TherapistAvailability />} />
          <Route path="/t/bookings" element={<TherapistBookings />} />
          <Route path="/t/clients" element={<TherapistClients />} />
          <Route path="/t/analytics" element={<TherapistAnalytics />} />
          <Route path="/t/dashboard" element={<TherapistDashboard />} />

          {/* Admin routes */}
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/therapists" element={<AdminTherapists />} />
          <Route path="/admin/moderation" element={<AdminModeration />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/feature-flags" element={<AdminFeatureFlags />} />
          <Route path="/admin/webhooks" element={<AdminWebhooks />} />
          <Route path="/admin/audit" element={<AdminAudit />} />
          <Route path="/admin/support" element={<AdminSupport />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

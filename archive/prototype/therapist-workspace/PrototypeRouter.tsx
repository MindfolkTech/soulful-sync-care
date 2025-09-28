import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceWrapper } from './WorkspaceWrapper';

// Import REAL therapist pages - we're not modifying them!
import TherapistDashboard from '@/pages/therapist/Dashboard';
import TherapistProfile from '@/pages/therapist/Profile';
import TherapistSettings from '@/pages/therapist/Settings';
import TherapistSchedule from '@/pages/therapist/Schedule';
import TherapistClients from '@/pages/therapist/Clients';
import TherapistClientTasks from '@/pages/therapist/ClientTasks';
import TherapistBusiness from '@/pages/therapist/Business';

/**
 * PrototypeRouter - Safe testing environment
 * 
 * This creates a parallel route structure at /prototype/workspace/*
 * that loads REAL therapist pages but wraps them with our overlay
 * 
 * Access via: http://localhost:8080/prototype/workspace/dashboard
 */
export function PrototypeRouter() {
  // Debug: Log when router loads
  React.useEffect(() => {
    console.log('PrototypeRouter mounted');
    // Simulate that Quick Start was completed
    localStorage.setItem('therapistQuickStartComplete', 'true');
    // Clear this to restart onboarding coach
    localStorage.removeItem('therapistOnboardingComplete');
  }, []);

  return (
    <WorkspaceWrapper>
        <Routes>
          {/* Mirror the real therapist routes */}
          <Route path="/dashboard" element={<TherapistDashboard />} />
          <Route path="/profile" element={<TherapistProfile />} />
          <Route path="/settings" element={<TherapistSettings />} />
          <Route path="/schedule" element={<TherapistSchedule />} />
          <Route path="/clients" element={<TherapistClients />} />
          <Route path="/tasks" element={<TherapistClientTasks />} />
          <Route path="/business" element={<TherapistBusiness />} />

          {/* Handle both root and dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    </WorkspaceWrapper>
  );
}

/**
 * HOW TO TEST:
 * 
 * 1. Start dev server: npm run dev
 * 2. Complete Quick Start: http://localhost:8080/prototype/therapist-quickstart
 * 3. Access wrapped workspace: http://localhost:8080/prototype/workspace/dashboard
 * 
 * The OnboardingCoach will appear and guide through real pages!
 * 
 * SAFE BECAUSE:
 * - Runs at /prototype/* route (not production /therapist/*)
 * - Uses real pages but doesn't modify them
 * - All changes are in overlay components only
 * - Can be deleted without affecting production
 */

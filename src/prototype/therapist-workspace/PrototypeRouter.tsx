import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WorkspaceWrapper } from './WorkspaceWrapper';

// Import REAL therapist pages - we're not modifying them!
import TherapistDashboard from '@/pages/therapist/Dashboard';
import TherapistProfile from '@/pages/therapist/Profile';
import TherapistSettings from '@/pages/therapist/Settings';
import { TherapistLayout } from '@/components/layout/therapist-layout';
// Note: Availability page might be at different location or not exist yet
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
  // Simulate that Quick Start was completed
  React.useEffect(() => {
    // Set this flag to activate the coach
    localStorage.setItem('therapistQuickStartComplete', 'true');
    // Clear this to restart onboarding coach
    localStorage.removeItem('therapistOnboardingComplete');
  }, []);

  return (
    <WorkspaceWrapper>
      <TherapistLayout>
        <Routes>
          {/* Mirror the real therapist routes */}
          <Route path="dashboard" element={<TherapistDashboard />} />
          <Route path="profile" element={<TherapistProfile />} />
          <Route path="settings" element={<TherapistSettings />} />
          <Route path="business" element={<TherapistBusiness />} />
          {/* Availability would go here when that page exists */}
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </TherapistLayout>
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

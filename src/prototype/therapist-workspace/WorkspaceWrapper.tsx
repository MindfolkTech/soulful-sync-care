import React, { useEffect } from 'react';
import { ContextualOnboarding } from './ContextualOnboarding';

interface WorkspaceWrapperProps {
  children: React.ReactNode;
}

/**
 * WorkspaceWrapper - HOC that adds contextual onboarding tooltips to therapist pages
 * Works like UserPilot/Pendo/Appcues - contextual guidance with spotlight effect
 */
export function WorkspaceWrapper({ children }: WorkspaceWrapperProps) {
  // Add data attributes to elements for tooltip targeting
  useEffect(() => {
    // Add data attributes dynamically to existing elements
    // This would normally be done in the actual component files
    const addDataAttributes = () => {
      // Profile page elements
      const specialtiesSection = document.querySelector('.specialties-section');
      if (specialtiesSection) {
        specialtiesSection.setAttribute('data-onboarding', 'specialties');
      }
      
      const identitySection = document.querySelector('.identity-tags-section');
      if (identitySection) {
        identitySection.setAttribute('data-onboarding', 'identity-tags');
      }
      
      // Settings page elements
      const rateInput = document.querySelector('.session-rate-input');
      if (rateInput) {
        rateInput.setAttribute('data-onboarding', 'session-rate');
      }
      
      // Business page elements  
      const calendar = document.querySelector('.availability-calendar');
      if (calendar) {
        calendar.setAttribute('data-onboarding', 'availability-calendar');
      }
      
      // Video upload
      const videoSection = document.querySelector('.video-upload-section');
      if (videoSection) {
        videoSection.setAttribute('data-onboarding', 'video-upload');
      }
    };
    
    // Try to add attributes after a short delay to ensure DOM is ready
    setTimeout(addDataAttributes, 100);
    
    // Also try on route changes
    const observer = new MutationObserver(addDataAttributes);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Original page content - unchanged */}
      {children}
      
      {/* Contextual onboarding tooltips - only shows if needed */}
      <ContextualOnboarding 
        onComplete={() => {
          console.log('Onboarding complete!');
          // Could trigger analytics, show completion stats, etc.
        }}
      />
    </>
  );
}

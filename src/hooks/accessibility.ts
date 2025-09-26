import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook that traps focus within a container when active
 * 
 * @param containerRef - Reference to the container element
 * @param isActive - Whether the focus trap is active
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean = true
) {
  const focusableElementsString = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'video',
    '[contenteditable]'
  ].join(', ');

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) {
        return;
      }

      const focusableElements = Array.from(
        containerRef.current.querySelectorAll(focusableElementsString)
      ) as HTMLElement[];

      if (focusableElements.length === 0) {
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      // Handle shift+tab
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } 
      // Handle tab
      else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [containerRef, isActive, focusableElementsString]);
}

/**
 * Hook that handles the escape key press
 * 
 * @param callback - Function to call when escape key is pressed
 * @param isActive - Whether the escape key handler is active
 */
export function useEscapeKey(
  callback: () => void,
  isActive: boolean = true
) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (isActive && event.key === 'Escape') {
        callback();
      }
    },
    [callback, isActive]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);
}

/**
 * Hook that prevents scrolling of the document body when active
 * 
 * @param isActive - Whether the scroll lock is active
 */
export function useScrollLock(isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    // Save current body overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Lock scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore original style
      document.body.style.overflow = originalStyle;
    };
  }, [isActive]);
}

/**
 * Hook that announces content to screen readers using aria-live
 * 
 * @returns An object with announce and clear methods
 */
export function useAnnouncer() {
  const announcerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Create the announcer element if it doesn't exist
    if (!announcerRef.current) {
      const el = document.createElement('div');
      el.setAttribute('aria-live', 'assertive');
      el.setAttribute('aria-atomic', 'true');
      el.setAttribute('role', 'status');
      el.className = 'sr-only';
      document.body.appendChild(el);
      announcerRef.current = el;
    }
    
    return () => {
      // Cleanup on unmount
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current);
        announcerRef.current = null;
      }
    };
  }, []);
  
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'assertive') => {
    if (!announcerRef.current) return;
    
    // Update the aria-live attribute based on priority
    announcerRef.current.setAttribute('aria-live', priority);
    
    // Set the message
    announcerRef.current.textContent = message;
    
    // Clear after a delay to prevent multiple announcements being merged
    setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = '';
      }
    }, 1000);
  }, []);
  
  const clear = useCallback(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = '';
    }
  }, []);
  
  return { announce, clear };
}

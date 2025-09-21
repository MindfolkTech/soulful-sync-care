import * as React from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash?.replace('#', '') ?? '';
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const prev = el.getAttribute('data-coach-highlighted');
    if (!prev) {
      el.setAttribute('data-coach-highlighted', '1');
      el.classList.add('outline', 'outline-2', 'outline-[hsl(var(--ring))]', 'rounded');
      window.setTimeout(() => {
        el.classList.remove('outline', 'outline-2', 'outline-[hsl(var(--ring))]', 'rounded');
        el.removeAttribute('data-coach-highlighted');
      }, 2000);
    }
  }, [location.hash, location.pathname]);
}



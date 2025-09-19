import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Input modality detection for focus rings
// Run once on app load
window.addEventListener('keydown', () => document.body.classList.add('user-keys'), { once: true });
window.addEventListener('mousedown', () => document.body.classList.remove('user-keys'));
window.addEventListener('touchstart', () => document.body.classList.remove('user-keys'));

// Connect to standalone React DevTools (development only)
if (typeof window !== 'undefined' && (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.connectToDevTools?.();
}

createRoot(document.getElementById("root")!).render(
  <App />
);

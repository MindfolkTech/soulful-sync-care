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

// Error boundary wrapper
function AppWithErrorBoundary() {
  try {
    return <App />;
  } catch (error) {
    console.log('App rendering error:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
        <h1>Loading...</h1>
        <p>Starting your therapy platform...</p>
      </div>
    );
  }
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<AppWithErrorBoundary />);
} else {
  console.error('Root element not found');
}

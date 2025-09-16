import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Connect to standalone React DevTools (development only)
if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.connectToDevTools?.();
}

createRoot(document.getElementById("root")!).render(<App />);

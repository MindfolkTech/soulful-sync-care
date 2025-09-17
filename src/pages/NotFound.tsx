import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-primary text-[hsl(var(--text-primary))]">404</h1>
        <p className="mb-4 text-xl font-secondary text-[hsl(var(--text-secondary))]">Oops! Page not found</p>
        <a href="/" className="text-[hsl(var(--garden-green))] underline hover:text-[hsl(var(--elated-emerald))] font-secondary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

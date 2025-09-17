import * as React from "react";
import { Moon, Sun, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
type Contrast = "normal" | "high";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [contrast, setContrast] = React.useState<Contrast>("normal");

  // Load theme from localStorage on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedContrast = localStorage.getItem("contrast") as Contrast;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    
    if (savedContrast) {
      setContrast(savedContrast);
      document.documentElement.setAttribute("data-contrast", savedContrast);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleContrastChange = (newContrast: Contrast) => {
    setContrast(newContrast);
    document.documentElement.setAttribute("data-contrast", newContrast);
    localStorage.setItem("contrast", newContrast);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    handleThemeChange(newTheme);
  };

  const toggleContrast = () => {
    const newContrast = contrast === "normal" ? "high" : "normal";
    handleContrastChange(newContrast);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="min-h-touch-target min-w-touch-target"
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={theme === "dark"}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Sun className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>

      {/* Contrast Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleContrast}
        className="min-h-touch-target min-w-touch-target"
        aria-label={contrast === "normal" ? "Switch to high contrast" : "Switch to normal contrast"}
        aria-pressed={contrast === "high"}
      >
        <Contrast className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}

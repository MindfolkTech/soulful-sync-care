import { ReactNode } from "react";
import { TherapistSidebar } from "@/components/therapist/therapist-sidebar";

interface TherapistLayoutProps {
  children: ReactNode;
  className?: string;
}

export function TherapistLayout({ children, className = "" }: TherapistLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <TherapistSidebar />
      <main className={`flex-1 overflow-auto ${className}`}>
        {children}
      </main>
    </div>
  );
}


import { ReactNode } from "react";
import { TherapistSidebar } from "@/components/therapist/therapist-sidebar";
import { TherapistBottomNav } from "@/components/therapist/therapist-bottom-nav";

interface TherapistLayoutProps {
  children: ReactNode;
  className?: string;
}

export function TherapistLayout({ children, className = "" }: TherapistLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <TherapistSidebar />
      <main className={`ml-0 lg:ml-64 overflow-auto pb-20 lg:pb-0 ${className}`}>
        {children}
      </main>
      <TherapistBottomNav />
    </div>
  );
}


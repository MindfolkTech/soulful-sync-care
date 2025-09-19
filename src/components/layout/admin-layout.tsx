import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className = "" }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <AdminSidebar />
      <main className={`ml-0 lg:ml-64 overflow-auto pb-20 lg:pb-0 ${className}`}>
        {children}
      </main>
      <AdminBottomNav />
    </div>
  );
}


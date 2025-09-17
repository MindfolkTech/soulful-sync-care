import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

interface AdminLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AdminLayout({ children, className = "" }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className={`flex-1 overflow-auto ${className}`}>
        {children}
      </main>
    </div>
  );
}


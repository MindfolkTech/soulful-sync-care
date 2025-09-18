import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'client' | 'therapist' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  return (
    <AuthGuard requiredRole={requiredRole}>
      {children}
    </AuthGuard>
  );
}
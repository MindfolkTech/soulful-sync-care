import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "therapist" | "admin";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
}

interface ImpersonationContextType {
  isImpersonating: boolean;
  impersonatedUser: User | null;
  startImpersonation: (user: User) => void;
  endImpersonation: () => void;
  navigateToUserDashboard: (user: User) => void;
}

const ImpersonationContext = createContext<ImpersonationContextType | undefined>(undefined);

interface ImpersonationProviderProps {
  children: ReactNode;
}

export function ImpersonationProvider({ children }: ImpersonationProviderProps) {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const navigateToUserDashboard = (user: User) => {
    if (user.role === 'client') {
      // Navigate to main client experience - assessment or discover page
      navigate('/discover');
    } else if (user.role === 'therapist') {
      // Navigate to therapist dashboard
      navigate('/t/dashboard');
    }
  };

  const startImpersonation = (user: User) => {
    setIsImpersonating(true);
    setImpersonatedUser(user);
    navigateToUserDashboard(user);
  };

  const endImpersonation = () => {
    setIsImpersonating(false);
    setImpersonatedUser(null);
    // Navigate back to admin overview
    navigate('/admin/overview');
  };

  const value: ImpersonationContextType = {
    isImpersonating,
    impersonatedUser,
    startImpersonation,
    endImpersonation,
    navigateToUserDashboard,
  };

  return (
    <ImpersonationContext.Provider value={value}>
      {children}
    </ImpersonationContext.Provider>
  );
}

export function useImpersonation() {
  const context = useContext(ImpersonationContext);
  if (context === undefined) {
    throw new Error('useImpersonation must be used within an ImpersonationProvider');
  }
  return context;
}

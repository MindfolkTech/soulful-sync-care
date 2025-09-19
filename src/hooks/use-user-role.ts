import { useUser } from "@clerk/clerk-react";

export type UserRole = "client" | "therapist" | "admin";
export type UserStatus = "active" | "pending" | "suspended" | "rejected";

export const useUserRole = () => {
  const { user, isLoaded } = useUser();
  
  const role = user?.unsafeMetadata?.role as UserRole | undefined;
  const status = user?.unsafeMetadata?.status as UserStatus | "active";
  
  return {
    role,
    status,
    isLoaded,
    isClient: role === "client",
    isTherapist: role === "therapist", 
    isAdmin: role === "admin",
    isPending: status === "pending",
    isActive: status === "active",
    isSuspended: status === "suspended",
    isRejected: status === "rejected",
  };
};

export const getRoleBasedRedirect = (role?: UserRole): string => {
  switch (role) {
    case "client":
      return "/discover";
    case "therapist":
      return "/t/dashboard";
    case "admin":
      return "/admin/overview";
    default:
      return "/";
  }
};
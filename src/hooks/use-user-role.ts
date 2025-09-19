import { useUser } from "@clerk/clerk-react";

export type UserRole = "client" | "therapist" | "admin";

export const useUserRole = () => {
  const { user, isLoaded } = useUser();
  
  const role = user?.unsafeMetadata?.role as UserRole | undefined;
  
  return {
    role,
    isLoaded,
    isClient: role === "client",
    isTherapist: role === "therapist", 
    isAdmin: role === "admin",
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
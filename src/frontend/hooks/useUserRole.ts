import { useMemo } from "react";
import { useLocation } from "react-router";

export type UserRole = "admin" | "staff" | "veterinarian" | "client";

export function useUserRole() {
  const location = useLocation();
  const role = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/admin")) {
      return "admin";
    } else if (path.startsWith("/veterinarian")) {
      return "veterinarian";
    } else if (path.startsWith("/staff")) {
      return "staff";
    } else if (path.startsWith("/client")) {
      return "client";
    }
    return null;
  }, [location.pathname]);
  return {
    role,
    loading: false,
  };
}

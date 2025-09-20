import { ReactNode } from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import { UserRoleEnum } from "../../types/auth";
import { hasRouteAccess } from "../../utils/authUtils";
import { useAppSelector } from "../../hooks/useAppSelector";

interface RoleGuardProps {
  children?: ReactNode;
  allowedRoles: UserRoleEnum[];
}

// 👈 Fast validation function
const getAuthData = () => {
  try {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("auth_user");

    if (token && userData) {
      return {
        isAuthenticated: true,
        user: JSON.parse(userData),
      };
    }
  } catch (error) {
    console.error("Error parsing auth data:", error);
  }

  return { isAuthenticated: false, user: null };
};

// Base ProtectedRoute component
function ProtectedRoute({ children, allowedRoles }: RoleGuardProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // 👈 Use Redux state first, localStorage as immediate fallback
  const authData =
    isAuthenticated && user ? { isAuthenticated, user } : getAuthData();

  // 👈 Immediate validation without any loading state
  if (!authData.isAuthenticated || !authData.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions immediately
  if (!allowedRoles.includes(authData.user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check route access immediately
  if (!hasRouteAccess(authData.user.role, location.pathname)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Valid access
  return children ? <>{children}</> : <Outlet />;
}

// Role guards tetap sama...
export function AdminRoute({ children }: { children?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN]}>
      {children}
    </ProtectedRoute>
  );
}

export function StaffRoute({ children }: { children?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.STAFF]}>
      {children}
    </ProtectedRoute>
  );
}

export function VeterinarianRoute({ children }: { children?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.VETERINARIAN]}>
      {children}
    </ProtectedRoute>
  );
}

export function ClientRoute({ children }: { children?: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[UserRoleEnum.CLIENT]}>
      {children}
    </ProtectedRoute>
  );
}

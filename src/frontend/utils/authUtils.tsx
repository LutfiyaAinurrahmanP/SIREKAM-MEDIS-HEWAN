import { UserRoleEnum, ROLE_ROUTES } from "../types/auth";

// Get redirect path based on user role
export const getRoleBasedRoute = (role: UserRoleEnum): string => {
  return ROLE_ROUTES[role] || "/client"; // default to client if role not found
};

// Check if user has access to route
export const hasRouteAccess = (
  userRole: UserRoleEnum,
  currentPath: string
): boolean => {
  const allowedPath = getRoleBasedRoute(userRole);
  return currentPath.startsWith(allowedPath);
};

// Get role display name
export const getRoleDisplayName = (role: UserRoleEnum): string => {
  const roleNames = {
    [UserRoleEnum.ADMIN]: "Administrator",
    [UserRoleEnum.STAFF]: "Staff",
    [UserRoleEnum.VETERINARIAN]: "Veterinarian",
    [UserRoleEnum.CLIENT]: "Client",
  };

  return roleNames[role] || "Unknown";
};

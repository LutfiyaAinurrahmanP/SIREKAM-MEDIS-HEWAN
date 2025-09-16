import AdminSidebarLayout from "../AdminSidebarLayout";
import ClientSidebarLayout from "../ClientSidebarLayout";
import StaffSidebarLayout from "../StaffSidebarLayout";
import VeterinarianSidebarLayout from "../VeterinarianSidebarLayout";

export function getSidebarLayout(
  role: "admin" | "staff" | "veterinarian" | "client" | null
) {
  switch (role) {
    case "admin":
      return AdminSidebarLayout();
    case "staff":
      return StaffSidebarLayout();
    case "veterinarian":
      return VeterinarianSidebarLayout();
    case "client":
      return ClientSidebarLayout();
    default:
      return {
        navItems: [],
        dataItems: [],
        medicalItems: [],
        financeItems: [],
      };
  }
}

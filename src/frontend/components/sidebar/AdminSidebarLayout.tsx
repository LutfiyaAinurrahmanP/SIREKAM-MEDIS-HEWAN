import {
  GridIcon,
  GroupIcon,
  MedicalIcon,
  MedicalServiceIcon,
  MedicineOutlineIcon,
  PawIcon,
  TransactionIcon,
} from "../../icons";
import { NavItem } from "../../layout/AppSidebar";

export default function AdminSidebarLayout() {
  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/admin",
    },
    {
      icon: <GroupIcon />,
      name: "Employee accounts",
      path: "/admin/employees",
    },
  ];

  const dataItems: NavItem[] = [
    {
      icon: <PawIcon />,
      name: "Animal types",
      path: "/admin/animal-types",
    },
    {
      icon: <MedicalServiceIcon />,
      name: "Service categories",
      path: "/admin/service-categories",
    },
    {
      icon: <MedicineOutlineIcon />,
      name: "Medicines",
      path: "/admin/medicines",
    },
  ];

  const medicalItems: NavItem[] = [
    {
      icon: <MedicalIcon />,
      name: "Medical records",
      path: "/admin/medical-records",
    },
  ];

  const financeItems: NavItem[] = [
    {
      icon: <TransactionIcon />,
      name: "Transactions",
      path: "/admin/transactions",
    },
  ];

  return {
    navItems,
    dataItems,
    medicalItems,
    financeItems,
  };
}

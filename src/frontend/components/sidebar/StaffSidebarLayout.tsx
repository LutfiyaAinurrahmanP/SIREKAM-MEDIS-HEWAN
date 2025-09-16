import {
  CatIcon,
  GridIcon,
  GroupIcon,
  MedicalIcon,
  PencilIcon,
  PrescriptionIcon,
  PrescriptionItemIcon,
  TransactionIcon,
} from "../../icons";
import { NavItem } from "../../layout/AppSidebar";

export default function StaffSidebarLayout() {
  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/staff",
    },
  ];

  const medicalItems: NavItem[] = [
    {
      icon: <MedicalIcon />,
      name: "Medical records",
      path: "/staff/medical-records",
    },
    {
      icon: <PencilIcon />,
      name: "Appointments",
      path: "/staff/appointments",
    },
    {
      icon: <PrescriptionIcon />,
      name: "Prescriptions",
      path: "/staff/prescriptions",
    },
    {
      icon: <PrescriptionItemIcon />,
      name: "Prescription items",
      path: "/staff/prescription-items",
    },
    {
      icon: <CatIcon />,
      name: "Pets",
      path: "/staff/pets",
    },
    {
      icon: <GroupIcon />,
      name: "Client accounts",
      path: "/staff/users/",
    },
  ];

  const financeItems: NavItem[] = [
    {
      icon: <TransactionIcon />,
      name: "Transactions",
      path: "/staff/transactions",
    },
  ];

  return {
    navItems,
    dataItems: [],
    medicalItems,
    financeItems,
  };
}

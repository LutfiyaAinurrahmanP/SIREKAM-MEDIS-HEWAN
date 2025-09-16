import {
  CatIcon,
  GridIcon,
  MedicalIcon,
  NoteIcon,
  PencilIcon,
  PrescriptionIcon,
  PrescriptionItemIcon,
  TransactionIcon,
} from "../../icons";
import { NavItem } from "../../layout/AppSidebar";

export default function ClientSidebarLayout() {
  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/client",
    },
  ];

  const medicalItems: NavItem[] = [
    {
      icon: <MedicalIcon />,
      name: "Medical records",
      path: "/client/medical-records",
    },
    {
      icon: <PencilIcon />,
      name: "Appointments",
      path: "/client/appointments",
    },
    {
      icon: <PrescriptionIcon />,
      name: "Prescriptions",
      path: "/client/prescriptions",
    },
    {
      icon: <PrescriptionItemIcon />,
      name: "Prescription items",
      path: "/client/prescription-items",
    },
    {
      icon: <NoteIcon />,
      name: "Treatment notes",
      path: "/client/treatment-notes",
    },
    {
      icon: <CatIcon />,
      name: "Pets",
      path: "/client/pets",
    },
  ];

  const financeItems: NavItem[] = [
    {
      icon: <TransactionIcon />,
      name: "Transactions",
      path: "/client/transactions",
    },
  ];

  return {
    navItems,
    dataItems: [],
    medicalItems,
    financeItems,
  };
}

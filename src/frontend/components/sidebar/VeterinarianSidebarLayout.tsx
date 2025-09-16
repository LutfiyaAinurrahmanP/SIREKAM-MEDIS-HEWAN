import {
  CatIcon,
  GridIcon,
  MedicalIcon,
  MedicineOutlineIcon,
  NoteIcon,
  PencilIcon,
} from "../../icons";
import { NavItem } from "../../layout/AppSidebar";

export default function VeterinarianSidebarLayout() {
  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/veterinarian",
    },
  ];

  const dataItems: NavItem[] = [
    {
      icon: <MedicineOutlineIcon />,
      name: "Medicines",
      path: "/veterinarian/medicines",
    },
  ];

  const medicalItems: NavItem[] = [
    {
      icon: <MedicalIcon />,
      name: "Medical records",
      path: "/veterinarian/medical-records",
    },
    {
      icon: <PencilIcon />,
      name: "Appointments",
      path: "/veterinarian/appointments",
    },
    {
      icon: <NoteIcon />,
      name: "Treatment notes",
      path: "/veterinarian/treatment-notes",
    },
    {
      icon: <CatIcon />,
      name: "Pets",
      path: "/veterinarian/pets",
    },
  ];

  return {
    navItems,
    dataItems,
    medicalItems,
    financeItems: [],
  };
}

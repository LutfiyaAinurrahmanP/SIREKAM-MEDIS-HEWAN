import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";
import AdminAnimalTypesCreate from "../pages/Admin/AnimalTypes/Create";
import AdminAnimalTypesShow from "../pages/Admin/AnimalTypes/Show";
import AdminAnimalTypesEdit from "../pages/Admin/AnimalTypes/Edit";
import AdminServiceCategoriesCreate from "../pages/Admin/ServiceCategories/Create";
import AdminServiceCategoriesShow from "../pages/Admin/ServiceCategories/Show";
import AdminServiceCategoriesEdit from "../pages/Admin/ServiceCategories/Edit";
import AdminMedicinesCreate from "../pages/Admin/Medicines/Create";
import AdminMedicinesShow from "../pages/Admin/Medicines/Show";
import AdminMedicinesEdit from "../pages/Admin/Medicines/Edit";
import AdminTransactionsShow from "../pages/Admin/Transactions/Show";
import AdminMedicalRecordsShow from "../pages/Admin/MedicalRecords/Show";
import AdminUsersCreate from "../pages/Admin/Users/Create";
import AdminUsersShow from "../pages/Admin/Users/Show";
import AdminUsersEdit from "../pages/Admin/Users/Edit";
import AdminAnimalTypesIndex from "../pages/Admin/AnimalTypes/Index";
import AdminServiceCategoriesIndex from "../pages/Admin/ServiceCategories/Index";
import AdminMedicinesIndex from "../pages/Admin/Medicines/Index";
import AdminTransactionsIndex from "../pages/Admin/Transactions/Index";
import AdminMedicalRecordsIndex from "../pages/Admin/MedicalRecords/Index";
import AdminUsersIndex from "../pages/Admin/Users/Index";
import AdminProfileIndex from "../pages/Admin/Profile/Index";
import AdminProfileEdit from "../pages/Admin/Profile/Edit";
import { AdminRoute } from "../components/auth/RoleGuards";

export default function AdminRoutes() {
  return (
    <Route path="/admin" element={<AdminRoute />}>
      <Route index element={<Home />} />
      {/* Animal types */}
      <Route path="animal-types">
        <Route index element={<AdminAnimalTypesIndex />} />
        <Route path="create" element={<AdminAnimalTypesCreate />} />
        <Route path="show/:id" element={<AdminAnimalTypesShow />} />
        <Route path="edit/:id" element={<AdminAnimalTypesEdit />} />
      </Route>
      {/* Service categories */}
      <Route path="service-categories">
        <Route index element={<AdminServiceCategoriesIndex />} />
        <Route path="create" element={<AdminServiceCategoriesCreate />} />
        <Route path="show/:id" element={<AdminServiceCategoriesShow />} />
        <Route path="edit/:id" element={<AdminServiceCategoriesEdit />} />
      </Route>
      {/* Medicines */}
      <Route path="medicines">
        <Route index element={<AdminMedicinesIndex />} />
        <Route path="create" element={<AdminMedicinesCreate />} />
        <Route path="show/:id" element={<AdminMedicinesShow />} />
        <Route path="edit/:id" element={<AdminMedicinesEdit />} />
      </Route>
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<AdminTransactionsIndex />} />
        <Route path="show/:id" element={<AdminTransactionsShow />} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<AdminMedicalRecordsIndex />} />
        <Route path="show/:id" element={<AdminMedicalRecordsShow />} />
      </Route>
      {/* Users */}
      <Route path="employees">
        <Route index element={<AdminUsersIndex />} />
        <Route path="create" element={<AdminUsersCreate />} />
        <Route path="show/:id" element={<AdminUsersShow />} />
        <Route path="edit/:id" element={<AdminUsersEdit />} />
      </Route>
      {/* Personal account */}
      <Route path="profile">
        <Route index element={<AdminProfileIndex />} />
        <Route path="edit" element={<AdminProfileEdit />} />
      </Route>
    </Route>
  );
}

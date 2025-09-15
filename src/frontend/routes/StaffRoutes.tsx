import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";
import StaffPrescriptionsCreate from "../pages/Staff/Prescriptions/Create";
import StaffPrescriptionsShow from "../pages/Staff/Prescriptions/Show";
import StaffPrescriptionsIndex from "../pages/Staff/Prescriptions/Index";
import StaffPrescriptionsEdit from "../pages/Staff/Prescriptions/Edit";
import StaffPrescriptionItemsIndex from "../pages/Staff/PrescriptionItems/Index";
import StaffPrescriptionItemsCreate from "../pages/Staff/PrescriptionItems/Create";
import StaffPrescriptionItemsShow from "../pages/Staff/PrescriptionItems/Show";
import StaffPrescriptionItemsEdit from "../pages/Staff/PrescriptionItems/Edit";
import StaffMedicalRecordsIndex from "../pages/Staff/MedicalRecords/Index";
import StaffMedicalRecordsCreate from "../pages/Staff/MedicalRecords/Create";
import StaffMedicalRecordsShow from "../pages/Staff/MedicalRecords/Show";
import StaffMedicalRecordsEdit from "../pages/Staff/MedicalRecords/Edit";
import StaffProfileIndex from "../pages/Staff/Profile/Index";
import StaffProfileEdit from "../pages/Staff/Profile/Edit";
import StaffAppointmentsIndex from "../pages/Staff/Appointments/Index";
import StaffAppointmentsCreate from "../pages/Staff/Appointments/Create";
import StaffAppointmentsShow from "../pages/Staff/Appointments/Show";
import StaffAppointmentsEdit from "../pages/Staff/Appointments/Edit";
import StaffPetsIndex from "../pages/Staff/Pets/Index";
import StaffPetsCreate from "../pages/Staff/Pets/Create";
import StaffPetsShow from "../pages/Staff/Pets/Show";
import StaffPetsEdit from "../pages/Staff/Pets/Edit";
import StaffTransactionsIndex from "../pages/Staff/Transactions/Index";
import StaffTransactionsCreate from "../pages/Staff/Transactions/Create";
import StaffTransactionsShow from "../pages/Staff/Transactions/Show";
import StaffTransactionsEdit from "../pages/Staff/Transactions/Edit";
import StaffUsersIndex from "../pages/Staff/Users/Index";
import StaffUsersCreate from "../pages/Staff/Users/Create";
import StaffUsersShow from "../pages/Staff/Users/Show";
import StaffUsersEdit from "../pages/Staff/Users/Edit";

export default function StaffRoutes() {
  return (
    <Route path="/staff">
      <Route index element={<Home />} />
      {/* Prescriptions */}
      <Route path="prescriptions">
        <Route index element={<StaffPrescriptionsIndex />} />
        <Route path="create" element={<StaffPrescriptionsCreate />} />
        <Route path="show/:id" element={<StaffPrescriptionsShow />} />
        <Route path="edit/:id" element={<StaffPrescriptionsEdit />} />
      </Route>
      {/* Prescription items */}
      <Route path="prescription-items">
        <Route index element={<StaffPrescriptionItemsIndex />} />
        <Route path="create" element={<StaffPrescriptionItemsCreate />} />
        <Route path="show/:id" element={<StaffPrescriptionItemsShow />} />
        <Route path="edit/:id" element={<StaffPrescriptionItemsEdit />} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<StaffMedicalRecordsIndex />} />
        <Route path="create" element={<StaffMedicalRecordsCreate />} />
        <Route path="show/:id" element={<StaffMedicalRecordsShow />} />
        <Route path="edit/:id" element={<StaffMedicalRecordsEdit />} />
      </Route>
      {/* Personal account */}
      <Route path="profile">
        <Route index element={<StaffProfileIndex />} />
        <Route path="edit" element={<StaffProfileEdit />} />
      </Route>
      {/* Appointments */}
      <Route path="appointments">
        <Route index element={<StaffAppointmentsIndex />} />
        <Route path="create" element={<StaffAppointmentsCreate />} />
        <Route path="show/:id" element={<StaffAppointmentsShow />} />
        <Route path="edit/:id" element={<StaffAppointmentsEdit />} />
      </Route>
      {/* Pets */}
      <Route path="pets">
        <Route index element={<StaffPetsIndex />} />
        <Route path="create" element={<StaffPetsCreate />} />
        <Route path="show/:id" element={<StaffPetsShow />} />
        <Route path="edit/:id" element={<StaffPetsEdit />} />
      </Route>
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<StaffTransactionsIndex />} />
        <Route path="create" element={<StaffTransactionsCreate />} />
        <Route path="show/:id" element={<StaffTransactionsShow />} />
        <Route path="edit/:id" element={<StaffTransactionsEdit />} />
      </Route>
      {/* Users */}
      <Route path="users">
        <Route index element={<StaffUsersIndex />} />
        <Route path="create" element={<StaffUsersCreate />} />
        <Route path="show/:id" element={<StaffUsersShow />} />
        <Route path="edit/:id" element={<StaffUsersEdit />} />
      </Route>
    </Route>
  );
}

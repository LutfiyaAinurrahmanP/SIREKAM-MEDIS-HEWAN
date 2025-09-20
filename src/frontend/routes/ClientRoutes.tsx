import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";
import ClientTreatmentNotesIndex from "../pages/Client/TreatmentNotes/Index";
import ClientTreatmentNotesShow from "../pages/Client/TreatmentNotes/Show";
import ClientProfileIndex from "../pages/Client/Profile/Index";
import ClientProfileEdit from "../pages/Client/Profile/Edit";
import ClientAppointmentsIndex from "../pages/Client/Appointments/Index";
import ClientAppointmentsCreate from "../pages/Client/Appointments/Create";
import ClientAppointmentsShow from "../pages/Client/Appointments/Show";
import ClientAppointmentsEdit from "../pages/Client/Appointments/Edit";
import ClientPetsIndex from "../pages/Client/Pets/Index";
import ClientPetsCreate from "../pages/Client/Pets/Create";
import ClientPetsShow from "../pages/Client/Pets/Show";
import ClientPetsEdit from "../pages/Client/Pets/Edit";
import ClientMedicalRecordsIndex from "../pages/Client/MedicalRecords/Index";
import ClientMedicalRecordsShow from "../pages/Client/MedicalRecords/Show";
import ClientPrescriptionsIndex from "../pages/Client/Prescriptions/Index";
import ClientPrescriptionsShow from "../pages/Client/Prescriptions/Show";
import ClientPrescriptionItemsIndex from "../pages/Client/PrescriptionItems/Index";
import ClientPrescriptionItemsShow from "../pages/Client/PrescriptionItems/Show";
import ClientTransactionsIndex from "../pages/Client/Transactions/Index";
import ClientTransactionsShow from "../pages/Client/Transactions/Show";
import { ClientRoute } from "../components/auth/RoleGuards";

export default function ClientRoutes() {
  return (
    <Route path="/client" element={<ClientRoute />}>
      <Route index element={<Home />} />
      {/* Treatment notes */}
      <Route path="treatment-notes">
        <Route index element={<ClientTreatmentNotesIndex />} />
        <Route path="show/:id" element={<ClientTreatmentNotesShow />} />
      </Route>
      {/* Personal account */}
      <Route path="profile">
        <Route index element={<ClientProfileIndex />} />
        <Route path="edit" element={<ClientProfileEdit />} />
      </Route>
      {/* Appointments */}
      <Route path="appointments">
        <Route index element={<ClientAppointmentsIndex />} />
        <Route path="create" element={<ClientAppointmentsCreate />} />
        <Route path="show/:id" element={<ClientAppointmentsShow />} />
        <Route path="edit/:id" element={<ClientAppointmentsEdit />} />
      </Route>
      {/* Pets */}
      <Route path="pets">
        <Route index element={<ClientPetsIndex />} />
        <Route path="create" element={<ClientPetsCreate />} />
        <Route path="show/:id" element={<ClientPetsShow />} />
        <Route path="edit/:id" element={<ClientPetsEdit />} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<ClientMedicalRecordsIndex />} />
        <Route path="show/:id" element={<ClientMedicalRecordsShow />} />
      </Route>
      {/* Prescriptions */}
      <Route path="prescriptions">
        <Route index element={<ClientPrescriptionsIndex />} />
        <Route path="show/:id" element={<ClientPrescriptionsShow />} />
      </Route>
      {/* Prescription items */}
      <Route path="prescription-items">
        <Route index element={<ClientPrescriptionItemsIndex />} />
        <Route path="show/:id" element={<ClientPrescriptionItemsShow />} />
      </Route>
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<ClientTransactionsIndex />} />
        <Route path="show/:id" element={<ClientTransactionsShow />} />
      </Route>
    </Route>
  );
}

import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";
import VeterinarianMedicinesIndex from "../pages/Veterinarian/Medicines/Index";
import VeterinarianMedicinesShow from "../pages/Veterinarian/Medicines/Show";
import VeterinarianTreatmentNotesIndex from "../pages/Veterinarian/TreatmentNotes/Index";
import VeterinarianTreatmentNotesCreate from "../pages/Veterinarian/TreatmentNotes/Create";
import VeterinarianTreatmentNotesShow from "../pages/Veterinarian/TreatmentNotes/Show";
import VeterinarianTreatmentNotesEdit from "../pages/Veterinarian/TreatmentNotes/Edit";
import VeterinarianPetsIndex from "../pages/Veterinarian/Pets/Index";
import VeterinarianPetsShow from "../pages/Veterinarian/Pets/Show";
import VeterinarianAppointmentsIndex from "../pages/Veterinarian/Appointments/Index";
import VeterinarianAppointmentsShow from "../pages/Veterinarian/Appointments/Show";
import VeterinarianMedicalRecordsIndex from "../pages/Veterinarian/MedicalRecords/Index";
import VeterinarianMedicalRecordsCreate from "../pages/Veterinarian/MedicalRecords/Create";
import VeterinarianMedicalRecordsShow from "../pages/Veterinarian/MedicalRecords/Show";
import VeterinarianMedicalRecordsEdit from "../pages/Veterinarian/MedicalRecords/Edit";
import VeterinarianProfileIndex from "../pages/Veterinarian/Profile/Index";
import VeterinarianProfileEdit from "../pages/Veterinarian/Profile/Edit";

export default function VeterinarianRoutes() {
  return (
    <Route path="/veterinarian">
      <Route index element={<Home />} />
      {/* Medicines */}
      <Route path="medicines">
        <Route index element={<VeterinarianMedicinesIndex />} />
        <Route path="show/:id" element={<VeterinarianMedicinesShow />} />
      </Route>
      {/* Treatment notes */}
      <Route path="treatment-notes">
        <Route index element={<VeterinarianTreatmentNotesIndex />} />
        <Route path="create" element={<VeterinarianTreatmentNotesCreate />} />
        <Route path="show/:id" element={<VeterinarianTreatmentNotesShow />} />
        <Route path="edit/:id" element={<VeterinarianTreatmentNotesEdit />} />
      </Route>
      {/* Pets */}
      <Route path="pets">
        <Route index element={<VeterinarianPetsIndex />} />
        <Route path="show/:id" element={<VeterinarianPetsShow />} />
      </Route>
      {/* Appointments */}
      <Route path="appointments">
        <Route index element={<VeterinarianAppointmentsIndex />} />
        <Route path="show/:id" element={<VeterinarianAppointmentsShow />} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<VeterinarianMedicalRecordsIndex />} />
        <Route path="create" element={<VeterinarianMedicalRecordsCreate />} />
        <Route path="show/:id" element={<VeterinarianMedicalRecordsShow />} />
        <Route path="edit/:id" element={<VeterinarianMedicalRecordsEdit />} />
      </Route>
      {/* Personal account */}
      <Route path="profile">
        <Route index element={<VeterinarianProfileIndex />} />
        <Route path="edit" element={<VeterinarianProfileEdit />} />
      </Route>
    </Route>
  );
}

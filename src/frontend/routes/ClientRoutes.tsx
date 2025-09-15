import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";

export default function ClientRoutes() {
  return (
    <Route path="/client">
      <Route index element={<Home />} />
      {/* Treatment notes */}
      <Route path="treatment-notes">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Personal account */}
      <Route path="profile">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Appointments */}
      <Route path="appointments">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Pets */}
      <Route path="pets">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Prescriptions */}
      <Route path="prescriptions">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Prescription items */}
      <Route path="prescription-items">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
    </Route>
  );
}

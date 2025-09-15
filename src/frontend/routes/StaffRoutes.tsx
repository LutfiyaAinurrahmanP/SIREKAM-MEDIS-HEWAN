import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";

export default function StaffRoutes() {
  return (
    <Route path="/staff">
      <Route index element={<Home />} />
      {/* Prescriptions */}
      <Route path="prescriptions">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Prescription items */}
      <Route path="prescription-items">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
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
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Users */}
      <Route path="users">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
    </Route>
  );
}

import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";

export default function VeterinarianRoutes() {
  return (
    <Route path="/veterinarian">
      <Route index element={<Home />} />
      {/* Medicines */}
      <Route path="medicines">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Treatment notes */}
      <Route path="treatment-notes">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Pets */}
      <Route path="pets">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Appointments */}
      <Route path="appointments">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
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
    </Route>
  );
}

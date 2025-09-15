import { Route } from "react-router";
import Home from "../pages/Dashboard/Home";

export default function AdminRoutes() {
  return (
    <Route path="/admin">
      <Route index element={<Home />} />
      {/* Animal types */}
      <Route path="animal-types">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Service categories */}
      <Route path="service-categories">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Medicines */}
      <Route path="medicines">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="create" element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
        <Route path="update/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Transactions */}
      <Route path="transactions">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
      </Route>
      {/* Medical records */}
      <Route path="medical-records">
        <Route index element={<p>Belum tersedia</p>} />
        <Route path="show/:id" element={<p>Belum tersedia</p>} />
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

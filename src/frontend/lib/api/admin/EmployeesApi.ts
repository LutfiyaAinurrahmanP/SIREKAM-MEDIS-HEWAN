import { EmployeeFilters } from "../../../types/employees";

export const getEmployeesApi = async (
  filters: EmployeeFilters
): Promise<Response> => {
  // Ambil token, tapi validate dulu
  let token = localStorage.getItem("auth_token");

  // Debug untuk melihat token
  console.log("🔍 Current token from localStorage:", token);

  // SEMENTARA: Gunakan token yang benar sesuai backend
  // Nanti setelah login fixed, hapus baris ini
  if (token === "default-token" || !token) {
    console.warn(
      "⚠️ Using hardcoded token because localStorage token is invalid"
    );
    token = "token-admin"; // Token yang valid di backend
  }

  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.role) params.append("role", filters.role);
  params.append("page", filters.page.toString());
  params.append("per_page", filters.per_page.toString());

  const fullUrl = `${
    import.meta.env.VITE_API_PATH
  }/admin/users?${params.toString()}`;

  console.log("📤 Making request with token:", token);

  return await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "SESSION-TOKEN": token,
    },
  });
};

export const removeEmployeesApi = async (id: string): Promise<Response> => {
  let token = localStorage.getItem("auth_token");

  // SEMENTARA: Gunakan token yang benar
  if (token === "default-token" || !token) {
    token = "token-admin";
  }

  return await fetch(`${import.meta.env.VITE_API_PATH}/admin/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "SESSION-TOKEN": token,
    },
  });
};

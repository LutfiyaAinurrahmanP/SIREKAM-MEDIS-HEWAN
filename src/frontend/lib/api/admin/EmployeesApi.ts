import { EmployeeFilters } from "../../../types/employees";

export const getEmployeesApi = async (
  filters: EmployeeFilters
): Promise<Response> => {
  const token = localStorage.getItem("auth_token");
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.role) params.append("role", filters.role);
  params.append("page", filters.page.toString());
  params.append("per_page", filters.per_page.toString());

  return await fetch(
    `${import.meta.env.VITE_API_PATH}/admin/users?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "SESSION-TOKEN": token || "",
      },
    }
  );
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

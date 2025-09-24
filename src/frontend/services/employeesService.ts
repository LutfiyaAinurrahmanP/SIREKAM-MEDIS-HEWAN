import { getEmployeesApi } from "../lib/api/admin/EmployeesApi";
import { EmployeeFilters, EmployeesApiResponse } from "../types/employees";

export const fetchEmployees = async (
  filters: EmployeeFilters
): Promise<EmployeesApiResponse> => {
  try {
    const response = await getEmployeesApi(filters);

    if (!response.ok) {
      let errorMessage = "Gagal mengambil data karyawan!";
      const errorBody = await response.json();
      if (response.status === 401) {
        errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
      } else if (errorBody.message) {
        errorMessage = errorBody.message;
      } else if (errorBody.errors) {
        errorMessage = errorBody.errors;
      }
      throw new Error(errorMessage);
    }

    const apiResponse: EmployeesApiResponse = await response.json();

    if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
      throw new Error("Format response tidak valid dari server");
    }

    // 🚀 Manual pagination di frontend
    const totalItems = apiResponse.data.length;
    const perPage =
      Number(filters.per_page) > 0 ? Number(filters.per_page) : totalItems;
    const totalPages = Math.ceil(totalItems / perPage);
    const currentPage = Number(filters.page) > 0 ? Number(filters.page) : 1;

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = apiResponse.data.slice(startIndex, endIndex);

    const internalResponse: EmployeesApiResponse = {
      data: paginatedData,
      pagination: {
        current_page: currentPage,
        total_pages: totalPages,
        total_items: totalItems,
        per_page: perPage,
      },
    };

    console.log(
      "🔄 Transformed response (frontend pagination):",
      internalResponse
    );
    return internalResponse;
  } catch (error: any) {
    console.error("💥 Service error:", error);
    throw error;
  }
};

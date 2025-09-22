import {
  getEmployeesApi,
  //   removeEmployeesApi,
} from "../lib/api/admin/EmployeesApi";
import {
  EmployeeFilters,
  EmployeesListResponse,
  EmployeesApiResponse,
} from "../types/employees";

export const fetchEmployees = async (
  filters: EmployeeFilters
): Promise<EmployeesListResponse> => {
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

    // Transform ke format yang diharapkan internal
    const internalResponse: EmployeesListResponse = {
      data: apiResponse.data,
      pagination: {
        current_page: filters.page,
        total_pages: 1,
        total_items: apiResponse.data.length,
        per_page: filters.per_page,
      },
    };

    console.log("🔄 Transformed response:", internalResponse);
    return internalResponse;
  } catch (error: any) {
    console.error("💥 Service error:", error);
    throw error;
  }
};

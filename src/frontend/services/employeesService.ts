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

    console.log("📥 Service - Response status:", response.status);

    if (!response.ok) {
      let errorMessage = "Gagal mengambil data karyawan!";
      try {
        const errorBody = await response.json();
        console.log("❌ Error response body:", errorBody);

        if (response.status === 401) {
          errorMessage = "Sesi Anda telah berakhir. Silakan login kembali.";
        } else if (errorBody.message) {
          errorMessage = errorBody.message;
        } else if (errorBody.errors) {
          errorMessage = errorBody.errors;
        }
      } catch (e) {
        console.log("Could not parse error response as JSON");
      }
      throw new Error(errorMessage);
    }

    // Parse sebagai response API yang actual
    const apiResponse: EmployeesApiResponse = await response.json();
    console.log("✅ Success API response:", apiResponse);

    if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
      console.error("❌ Invalid response structure:", apiResponse);
      throw new Error("Format response tidak valid dari server");
    }

    // Transform ke format yang diharapkan internal
    const internalResponse: EmployeesListResponse = {
      data: apiResponse.data,
      pagination: {
        current_page: filters.page,
        total_pages: 1, // Karena backend tidak return pagination
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

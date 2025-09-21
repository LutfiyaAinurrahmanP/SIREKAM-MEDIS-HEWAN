import { useCallback } from "react";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import {
  clearMessages,
  removeEmployee,
  removeEmployee as removeEmployeeAction,
  setCurrentPage,
  setDeleting,
  setEmployees,
  setError,
  setLoading,
  setRoleFilter,
  setSearchQuery,
  setSuccessMessage,
} from "../../store/slices/employees/employeesSlice";
import {
  fetchEmployees,
} from "../../services/employeesService";
import { UserRoleEnum } from "../../types/auth";

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const employeesState = useAppSelector((state) => state.employees);

  const loadEmployees = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(clearMessages());

    try {
      const filters = {
        search: employeesState.searchQuery,
        role: employeesState.roleFilter,
        page: employeesState.currentPage,
        per_page: 10,
      };

      console.log("🔄 Loading employees with filters:", filters);
      const result = await fetchEmployees(filters);

      console.log("✅ Employees loaded successfully:", result);

      // Validate result structure before dispatching
      if (!result || !result.data || !result.pagination) {
        throw new Error("Data tidak valid dari server");
      }

      dispatch(
        setEmployees({
          employees: result.data || [],
          totalPages: result.pagination?.total_pages || 1,
          totalEmployees: result.pagination?.total_items || 0,
          currentPage: result.pagination?.current_page || 1,
        })
      );
    } catch (error: any) {
      console.error("❌ Load employees error:", error);

      // Handle specific error types
      if (
        error.message.includes("Sesi Anda telah berakhir") ||
        error.message.includes("Token tidak ditemukan") ||
        error.message.includes("Unauthorized")
      ) {
        // Clear invalid token
        localStorage.removeItem("auth_token");
        dispatch(setError("Sesi Anda telah berakhir. Silakan login kembali."));

        // Optional: Redirect to login
        // window.location.href = "/login";
      } else {
        dispatch(setError(error.message || "Gagal memuat data employees"));
      }
    }
  }, [
    dispatch,
    employeesState.searchQuery,
    employeesState.roleFilter,
    employeesState.currentPage,
  ]);

  const deleteEmployee = useCallback(
    async (id: string) => {
      if (!window.confirm("Apakah Anda yakin ingin menghapus employee ini?")) {
        return;
      }

      dispatch(setDeleting(true));
      dispatch(clearMessages());

      try {
        // const message = await removeEmployee(id);

        dispatch(removeEmployeeAction(id));
        dispatch(setSuccessMessage("p"));
      } catch (error: any) {
        console.error("❌ Delete employee error:", error);

        if (
          error.message.includes("Sesi Anda telah berakhir") ||
          error.message.includes("Unauthorized")
        ) {
          localStorage.removeItem("auth_token");
          dispatch(
            setError("Sesi Anda telah berakhir. Silakan login kembali.")
          );
        } else {
          dispatch(setError(error.message || "Gagal menghapus employee"));
        }
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );

  const handleRoleFilter = useCallback(
    (role: UserRoleEnum | null) => {
      dispatch(setRoleFilter(role));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const clearFilters = useCallback(() => {
    dispatch(setSearchQuery(""));
    dispatch(setRoleFilter(null));
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return {
    ...employeesState,
    loadEmployees,
    deleteEmployee,
    handleSearch,
    handleRoleFilter,
    handlePageChange,
    clearFilters,
  };
};

import { useCallback } from "react";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import {
  clearMessages,
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
import { fetchEmployees } from "../../services/employeesService";
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
        per_page: employeesState.perPage ?? 10,
      };

      const result = await fetchEmployees(filters);
      if (!result || !result.data || !result.pagination) {
        throw new Error("Data tidak valid dari server");
      }

      dispatch(
        setEmployees({
          employees: result.data || [],
          totalPages: result.pagination.total_pages,
          totalEmployees: result.pagination.total_items,
          currentPage: result.pagination.current_page,
          perPage: result.pagination.per_page, // 👈 simpan juga
        })
      );
    } catch (error: any) {
      if (
        error.message.includes("Sesi Anda telah berakhir") ||
        error.message.includes("Token tidak ditemukan") ||
        error.message.includes("Unauthorized")
      ) {
        localStorage.removeItem("auth_token");
        dispatch(setError("Sesi Anda telah berakhir. Silakan login kembali."));
      } else {
        dispatch(setError(error.message || "Gagal memuat data employees"));
      }
    }
  }, [
    dispatch,
    employeesState.searchQuery,
    employeesState.roleFilter,
    employeesState.currentPage,
    employeesState.perPage,
  ]);

  const deleteEmployee = useCallback(
    async (id: string) => {
      if (!window.confirm("Apakah Anda yakin ingin menghapus employee ini?")) {
        return;
      }

      dispatch(setDeleting(true));
      dispatch(clearMessages());

      try {
        // TODO: panggil API delete employee di backend
        dispatch(removeEmployeeAction(id));
        dispatch(setSuccessMessage("Employee berhasil dihapus"));
      } catch (error: any) {
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

  // 👇 untuk ReactPaginate (page index mulai dari 0)
  const handlePageChange = useCallback(
    (selectedItem: { selected: number }) => {
      dispatch(setCurrentPage(selectedItem.selected + 1));
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

    // tambahan khusus react-paginate
    pageCount: employeesState.totalPages, // total halaman
    forcePage: employeesState.currentPage - 1, // index dimulai dari 0
  };
};

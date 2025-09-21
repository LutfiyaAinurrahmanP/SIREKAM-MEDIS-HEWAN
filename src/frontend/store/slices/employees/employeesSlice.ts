import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employees, EmployeesState } from "../../../types/employees";
import { UserRoleEnum } from "../../../types/auth";

const initialState: EmployeesState = {
  employees: [],
  selectedEmployee: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  successMessage: null,
  currentPage: 1,
  totalPages: 1,
  totalEmployees: 0,
  searchQuery: "",
  roleFilter: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setDeleting: (state, action: PayloadAction<boolean>) => {
      state.isDeleting = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // Data actions
    setEmployees: (
      state,
      action: PayloadAction<{
        employees: Employees[];
        totalPages: number;
        totalEmployees: number;
        currentPage: number;
      }>
    ) => {
      const { employees, totalPages, totalEmployees, currentPage } =
        action.payload;
      state.employees = employees;
      state.totalPages = totalPages;
      state.totalEmployees = totalEmployees;
      state.currentPage = currentPage;
      state.isLoading = false;
      state.error = null;
    },

    addEmployee: (state, action: PayloadAction<Employees>) => {
      state.employees.unshift(action.payload);
      state.totalEmployees += 1;
      state.isCreating = false;
      state.successMessage = "Employee berhasil ditambahkan!";
      state.error = null;
    },

    updateEmployee: (state, action: PayloadAction<Employees>) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      state.selectedEmployee = action.payload;
      state.isUpdating = false;
      state.successMessage = "Employee berhasil diupdate!";
      state.error = null;
    },

    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      state.totalEmployees -= 1;
      state.isDeleting = false;
      state.successMessage = "Employee berhasil dihapus!";
      state.error = null;
    },

    setSelectedEmployee: (state, action: PayloadAction<Employees | null>) => {
      state.selectedEmployee = action.payload;
    },

    // Filter & search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page
    },

    setRoleFilter: (state, action: PayloadAction<UserRoleEnum | null>) => {
      state.roleFilter = action.payload;
      state.currentPage = 1; // Reset to first page
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Message actions
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.successMessage = null;
      state.isLoading = false;
      state.isCreating = false;
      state.isUpdating = false;
      state.isDeleting = false;
    },

    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.error = null;
    },

    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    resetEmployeesState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setLoading,
  setCreating,
  setUpdating,
  setDeleting,
  setEmployees,
  addEmployee,
  updateEmployee,
  removeEmployee,
  setSelectedEmployee,
  setSearchQuery,
  setRoleFilter,
  setCurrentPage,
  setError,
  setSuccessMessage,
  clearMessages,
  resetEmployeesState,
} = employeesSlice.actions;

export default employeesSlice.reducer;

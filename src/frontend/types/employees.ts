import { UserRoleEnum } from "./auth";

export interface Employees {
  id: string;
  username: string;
  fullname: string;
  email: string;
  role: UserRoleEnum[];
  phone: string;
  created_at: string;
  updated_at: string;
}

// INTERFACE BARU: Sesuai dengan response backend actual
export interface EmployeesApiResponse {
  data: Employees[];
}

// INTERFACE LAMA: Tetap digunakan untuk internal state management
export interface EmployeesListResponse {
  data: Employees[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    per_page: number;
  };
}

export interface EmployeeFilters {
  search: string;
  role: UserRoleEnum | null;
  page: number;
  per_page: number;
}

export interface EmployeesState {
  // Data state
  employees: Employees[];
  selectedEmployee: Employees | null;

  // UI state
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // Message state
  error: string | null;
  successMessage: string | null;

  // Pagination & filters
  currentPage: number;
  totalPages: number;
  totalEmployees: number;
  searchQuery: string;
  roleFilter: UserRoleEnum | null;
}
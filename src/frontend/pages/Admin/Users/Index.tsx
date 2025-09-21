import { useEffect, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import Search from "../../../components/form/input/SearchInput";
import TableHeading from "../../../components/ui/table/TableHeading";
import { FilterIcon, PlusIcon } from "../../../icons";
import { useEmployees } from "../../../hooks/admin/useEmployees";
import { useNavigate } from "react-router";
import EmployeesTable from "../../../components/tables/EmployeesTable";
import Paginator from "../../../components/ui/pagination/Paginator";

export default function AdminUsersIndex() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const {
    employees,
    isLoading,
    isDeleting,
    error,
    successMessage,
    currentPage,
    totalPages,
    totalEmployees,
    loadEmployees,
    deleteEmployee,
    handleSearch,
    handlePageChange,
    clearFilters,
  } = useEmployees();

  // Load data on mount and whenever dependencies in the hook change
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const onSubmitSearch = (value: string) => {
    handleSearch(value);
    // loadEmployees akan otomatis terpanggil via dependency di hook
  };

  const onEditEmployee = (employee: any) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const onDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
  };

  return (
    <>
      <PageMeta title="Employees page" description="Employees page pet care" />
      <PageBreadcrumb pageTitle="Employees" />

      <div className="flex flex-col gap-4 lg:gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:justify-between lg:items-start">
          <TableHeading className="pt-2">Employees</TableHeading>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:justify-end lg:gap-4 xl:gap-6">
            <Button
              size="sm"
              variant="outline"
              startIcon={<FilterIcon />}
              onClick={clearFilters}
            >
              Filter data
            </Button>
            <Search
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={onSubmitSearch}
              className="xl:w-auto"
            />
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/employees/create")}
            >
              Create data
            </Button>
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="flex flex-col gap-3 lg:hidden">
            <Search
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={onSubmitSearch}
              placeholder="Search employees..."
              showShortcut={false}
              className="w-full"
            />

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                startIcon={<FilterIcon />}
                className="flex-1"
                onClick={clearFilters}
              >
                Filter
              </Button>
              <Button
                size="sm"
                variant="primary"
                startIcon={<PlusIcon />}
                className="flex-1"
                onClick={() => navigate("/employees/create")}
              >
                Create
              </Button>
            </div>
          </div>
        </div>

        {/* Alert messages */}
        {error && (
          <div className="px-4 py-3 bg-red-50 border-l-4 border-red-400 rounded">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="px-4 py-3 bg-green-50 border-l-4 border-green-400 rounded">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Table Section */}
        <div className="w-full overflow-hidden">
          <EmployeesTable
            data={employees}
            isLoading={isLoading || isDeleting}
            onEdit={onEditEmployee}
            onDelete={onDeleteEmployee}
          />
        </div>

        {/* Pagination Section */}
        <div className="w-full">
          {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalEmployees}
            itemsPerPage={10}
            onPageChange={(page) => {
              handlePageChange(page);
              // loadEmployees akan terpanggil oleh effect via dependency di hook
            }}
          /> */}
          <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        </div>
      </div>
    </>
  );
}

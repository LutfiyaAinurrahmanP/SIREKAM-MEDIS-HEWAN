import { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";
import Button from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import Search from "../../../components/form/input/SearchInput";
import TableHeading from "../../../components/ui/table/TableHeading";
import { FilterIcon, PlusIcon } from "../../../icons";

export default function AdminUsersIndex() {
  const [searchValue, setSearchValue] = useState("");

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
            <Button size="sm" variant="outline" startIcon={<FilterIcon />}>
              Filter data
            </Button>
            <Search
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={(value) => console.log("Search:", value)}
              className="xl:w-auto"
            />
            <Button size="sm" variant="primary">
              Create data
            </Button>
          </div>

          {/* Mobile & Tablet Actions */}
          <div className="flex flex-col gap-3 lg:hidden">
            <Search
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={(value) => console.log("Search:", value)}
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
              >
                Filter
              </Button>
              <Button
                size="sm"
                variant="primary"
                startIcon={<PlusIcon />}
                className="flex-1"
              >
                Create
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-hidden">
          <BasicTableOne />
        </div>

        {/* Pagination Section */}
        <div className="w-full">
          <Pagination
            currentPage={1}
            totalPages={10}
            totalItems={100}
            itemsPerPage={10}
            onPageChange={(page) => console.log("Page changed:", page)}
          />
        </div>
      </div>
    </>
  );
}

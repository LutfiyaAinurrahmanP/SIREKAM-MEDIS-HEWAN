import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { useState, useRef } from "react";
import {
  HorizontaLDots,
  PencilIcon,
  ShowIcon,
  TrashBinIcon,
} from "../../../icons";

import { Employees } from "../../../types/employees";
import { UserRoleEnum } from "../../../types/auth";

type Props = {
  data: Employees[];
  isLoading?: boolean;
  onEdit?: (employee: Employees) => void;
  onDelete?: (id: string) => void;
  onShow?: (employee: Employees) => void;
};

const ROLE_COLORS: Record<UserRoleEnum, string> = {
  [UserRoleEnum.ADMIN]: "success",
  [UserRoleEnum.STAFF]: "warning",
  [UserRoleEnum.VETERINARIAN]: "info",
  [UserRoleEnum.CLIENT]: "gray",
};

export default function EmployeesCompactTable({
  data,
  isLoading = false,
  onEdit,
  onDelete,
  onShow,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const toggleDropdown = (id: number) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
      return;
    }

    const buttonElement = buttonRefs.current[id];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 120;

      const currentIndex = data.findIndex((item) => item.id === id.toString());

      const shouldShowAbove =
        rect.bottom + dropdownHeight > viewportHeight ||
        currentIndex >= data.length - 2;

      setDropdownPosition(shouldShowAbove ? "top" : "bottom");
    }

    setOpenDropdown(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-gray-600">Loading employees...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No employees found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-sm text-left"
              >
                Nama lengkap
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-sm text-left"
              >
                Username
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-sm text-left"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-sm text-left"
              >
                Akses
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-sm text-left"
              >
                Nomor telepon
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-center text-sm"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="px-5 py-3.5 text-sm">
                  {employee.fullname}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm">
                  {employee.username}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm">
                  {employee.email}
                </TableCell>
                <TableCell className="px-5 py-3.5">
                  <Badge
                    size="sm"
                    color={ROLE_COLORS[employee.role as UserRoleEnum]}
                  >
                    {employee.role}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm">
                  {employee.phone}
                </TableCell>
                <TableCell className="px-5 py-3.5 text-sm text-center">
                  <div className="relative text-gray-600 dark:text-gray-400">
                    <button
                      ref={(el) => {
                        buttonRefs.current[employee.id] = el;
                      }}
                      onClick={() => toggleDropdown(employee.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <HorizontaLDots />
                    </button>

                    {openDropdown === employee.id && (
                      <div
                        className={`absolute z-40 right-0 w-40 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${
                          dropdownPosition === "top"
                            ? "bottom-full mb-2"
                            : "top-full mt-2"
                        }`}
                      >
                        <div>
                          <button
                            onClick={() => onShow?.(employee)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                          >
                            <ShowIcon /> Show
                          </button>

                          <button
                            onClick={() => onEdit?.(employee)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                          >
                            <PencilIcon /> Edit
                          </button>

                          <button
                            onClick={() => onDelete?.(employee.id)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                          >
                            <TrashBinIcon /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

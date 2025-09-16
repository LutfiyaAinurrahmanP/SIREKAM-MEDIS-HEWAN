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

interface Order {
  id: number;
  user: {
    name: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      name: "Lindsey Curtis",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      name: "Kaiya George",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      name: "Zain Geidt",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      name: "Abram Schleifer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      name: "Carla George",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
  {
    id: 6,
    user: {
      name: "Lindsey Curtis",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 7,
    user: {
      name: "Kaiya George",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 8,
    user: {
      name: "Zain Geidt",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 9,
    user: {
      name: "Abram Schleifer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 10,
    user: {
      name: "Carla George",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function CompactTableOne() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const handleShow = (id: number) => {
    console.log("Show item with id:", id);
    setOpenDropdown(null);
    // Add your show logic here
  };

  const handleEdit = (id: number) => {
    console.log("Edit item with id:", id);
    setOpenDropdown(null);
    // Add your edit logic here
  };

  const handleDelete = (id: number) => {
    console.log("Delete item with id:", id);
    setOpenDropdown(null);
    // Add your delete logic here
  };

  const toggleDropdown = (id: number) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
      return;
    }

    // Calculate dropdown position
    const buttonElement = buttonRefs.current[id];
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 120;

      // Ambil index dari data
      const currentIndex = tableData.findIndex((item) => item.id === id);

      // Kombinasi: viewport check DAN index check
      const shouldShowAbove =
        rect.bottom + dropdownHeight > viewportHeight ||
        currentIndex >= tableData.length - 2;

      setDropdownPosition(shouldShowAbove ? "top" : "bottom");
    }

    setOpenDropdown(id);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
              >
                Project Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
              >
                Team
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-start text-sm dark:text-gray-300"
              >
                Budget
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-4 font-semibold text-gray-700 text-center text-sm dark:text-gray-300"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="px-5 py-3.5 text-start">
                  <span className="font-medium text-gray-800 text-sm dark:text-white/90">
                    {order.user.name}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-600 text-start text-sm dark:text-gray-400">
                  {order.projectName}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-600 text-start text-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {order.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-600 text-start text-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order.status === "Active"
                        ? "success"
                        : order.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-600 text-sm dark:text-gray-400">
                  {order.budget}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-center">
                  <div className="relative text-gray-600 dark:text-gray-400">
                    <button
                      ref={(el) => {
                        buttonRefs.current[order.id] = el;
                      }}
                      onClick={() => toggleDropdown(order.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <HorizontaLDots />
                    </button>

                    {openDropdown === order.id && (
                      <div
                        className={`absolute z-40 right-0 w-40 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${
                          dropdownPosition === "top"
                            ? "bottom-full mb-2"
                            : "top-full mt-2"
                        }`}
                      >
                        <div>
                          <button
                            onClick={() => handleShow(order.id)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-400 first:rounded-t-xl transition-colors"
                          >
                            <ShowIcon />
                            Show
                          </button>

                          <button
                            onClick={() => handleEdit(order.id)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-400 transition-colors"
                          >
                            <PencilIcon />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(order.id)}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 last:rounded-b-xl transition-colors"
                          >
                            <TrashBinIcon />
                            Delete
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

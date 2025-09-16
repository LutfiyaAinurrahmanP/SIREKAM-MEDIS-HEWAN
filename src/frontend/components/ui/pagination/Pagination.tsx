import React from "react";
import Button from "../button/Button";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  currentPage = 1,
  totalPages = 5,
  totalItems = 100,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const [active, setActive] = React.useState(currentPage);

  // Hitung range data yang sedang ditampilkan
  const startItem = (active - 1) * itemsPerPage + 1;
  const endItem = Math.min(active * itemsPerPage, totalItems);

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "bg-brand-300",
      onClick: () => handlePageChange(index),
      className: `px-3 py-1 rounded ${
        active === index
          ? "bg-brand-500 text-white" // warna aktif
          : "bg-transparent text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-400" // warna default
      }`,
    } as any);

  const handlePageChange = (page: number) => {
    setActive(page);
    onPageChange?.(page);
  };

  const next = () => {
    if (active === totalPages) return;
    handlePageChange(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    handlePageChange(active - 1);
  };

  // Generate array of page numbers to show
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, active - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-3">
      {/* Data Info Text - Always at top */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
        Menampilkan <span className="font-medium">{startItem}</span> hingga{" "}
        <span className="font-medium">{endItem}</span> dari{" "}
        <span className="font-medium">{totalItems}</span> data
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center md:justify-start">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 px-3 py-2"
            onClick={prev}
            disabled={active === 1}
          >
            Previous
          </Button>

          {/* Desktop: Show page numbers */}
          <div className="hidden md:flex items-center gap-2">
            {/* Show first page if not in visible range */}
            {visiblePages[0] > 1 && (
              <>
                <Button size="sm" {...getItemProps(1)}>
                  1
                </Button>
                {visiblePages[0] > 2 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Show visible pages */}
            {visiblePages.map((page) => (
              <Button key={page} size="sm" {...getItemProps(page)}>
                {page}
              </Button>
            ))}

            {/* Show last page if not in visible range */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-2 py-1 text-gray-500">...</span>
                )}
                <Button size="sm" {...getItemProps(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Mobile: Show current page indicator */}
          <div className="flex md:hidden items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{active}</span>
            <span>/</span>
            <span>{totalPages}</span>
          </div>

          {/* Next Button */}
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 px-3 py-2"
            onClick={next}
            disabled={active === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

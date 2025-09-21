import React from "react";
import ReactPaginate from "react-paginate";

interface PaginatorProps {
  currentPage: number; // 1-based
  totalPages: number; // total pages from server
  onPageChange: (page: number) => void; // will receive 1-based page
  className?: string;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Safe guards to avoid react-paginate errors with 0 pages
  const safeTotalPages = Math.max(1, totalPages || 1);
  const safeCurrentPage = Math.min(
    Math.max(1, currentPage || 1),
    safeTotalPages
  );

  return (
    <nav
      className={`flex items-center justify-center ${className}`}
      aria-label="Pagination"
    >
      <ReactPaginate
        // Labels
        previousLabel={<span className="px-3 py-2">Previous</span>}
        nextLabel={<span className="px-3 py-2">Next</span>}
        breakLabel="..."
        // Counts
        pageCount={safeTotalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        // Controlled active page (react-paginate is 0-based)
        forcePage={safeCurrentPage - 1}
        // Events
        onPageChange={({ selected }) => onPageChange(selected + 1)} // convert back to 1-based
        // Classes (Tailwind)
        containerClassName="inline-flex -space-x-px rounded-md shadow-sm select-none"
        pageClassName="relative inline-flex items-center"
        pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-20"
        previousClassName="relative inline-flex items-center"
        previousLinkClassName="relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-20"
        nextClassName="relative inline-flex items-center"
        nextLinkClassName="relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-20"
        activeClassName="z-10"
        activeLinkClassName="bg-blue-50 border-blue-500 text-blue-600"
        disabledClassName="opacity-50 cursor-not-allowed"
        // Accessibility
        renderOnZeroPageCount={null}
      />
    </nav>
  );
};

export default Paginator;

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PaginationProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextUrl?: string;
  previousUrl?: string;
}

const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  nextUrl,
  previousUrl,
}: PaginationProps) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {hasPreviousPage && previousUrl && (
        <Link
          href={previousUrl}
          className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Link>
      )}

      {hasNextPage && nextUrl && (
        <Link
          href={nextUrl}
          className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;

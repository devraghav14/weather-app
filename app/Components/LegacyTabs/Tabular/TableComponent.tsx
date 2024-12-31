import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

interface Column {
  key: string;
  header: string;
}

interface TableComponentProps {
  columns: Column[];
  data: Record<string, any>[];
  caption?: string;
  entriesPerPage?: number;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  caption,
  entriesPerPage = 7,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  
  const totalPages = Math.ceil(data.length / entriesPerPage);

  
  const paginatedData = data.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {row[col.key] || "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 dark:bg-white dark:text-black bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;

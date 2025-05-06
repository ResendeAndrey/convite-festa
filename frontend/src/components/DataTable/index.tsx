import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import * as Icon from 'react-feather';
import { Button } from "../Button";
import { GuestAccordion } from "../GuestAccordion";

interface DataTableProps<TData> {
  data: DataResponse<TData[]>;
  columns: ColumnDef<TData>[];
  onChangePage?: (page: number) => void
  currentPage?: number
  expanded?: boolean
  pagination?: boolean
}

export function DataTable<TData>({ data, columns, onChangePage, currentPage = 1, expanded, pagination }: DataTableProps<TData>) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const handleExpandClick = (rowId: string) => {
    setExpandedRow((prev) => (prev === rowId ? null : rowId));
  };
  const table = useReactTable({
    data: data?.data,
    pageCount: data?.totalPages,
    state: {
      pagination: {
        pageIndex: currentPage - 1 || 0,
        pageSize: data?.limit || 10,
      },
    },
    manualPagination: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePageChange = (newPage: number) => {
    onChangePage?.(newPage);
  };

  console.log(expandedRow, "expandedRow")

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-zinc-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`px-4 py-2 border-b ${index === columns.length - 1 ? "text-center w-[250px]" : "text-left"}`}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <>
              <tr key={row.id} className="hover:bg-gray-100" onClick={() => expanded && handleExpandClick(row.id)}>
                {row.getVisibleCells().map((cell, index) => (
                  <td key={cell.id} className="px-4 py-2 border-b">
                    <div className={`flex items-center gap-3 ${index === columns.length - 1 ? "justify-end w-[250px] gap-10" : "justify-between"}`}>
                      {/* Renderiza o conteúdo da célula normalmente */}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}

                      {expanded && index === columns.length - 1 && ( // Use a condição para renderizar o ícone na coluna correta
                        <Icon.ChevronDown
                          className="cursor-pointer"

                          size={35}
                        />
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Se a linha for expandida, mostra o conteúdo abaixo */}
              {expandedRow === row.id && (
                <GuestAccordion columnsLength={columns.length} guests={(row.original as FamilyData).guests as GuestData[]} />
              )}
            </>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      {pagination && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button
              onClick={() => handlePageChange(table.getState().pagination.pageIndex)}
              disabled={!table.getCanPreviousPage()}
              className="mr-2 max-w-fit"
            >
              <Icon.ChevronLeft />
            </Button>
            <span className="flex items-center justify-center w-8 text-xl font-[400]">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <Button
              onClick={() => handlePageChange(table.getState().pagination.pageIndex + 2)}
              disabled={!table.getCanNextPage()}
              className="mr-2 max-w-fit"
            >
              <Icon.ChevronRight />
            </Button>
          </div>
          <span>
            Página
            <strong>
              {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
            </strong>
          </span>
        </div>
      )}
    </div>

  );

}


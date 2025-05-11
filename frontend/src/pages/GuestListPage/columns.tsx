// src/pages/guest-list/columns.tsx

import { Button } from "@/components/Button";
import { maskPhone } from "@/utils/functions/phone";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (onEdit: (data: GuestData) => void, onDelete: (data: GuestData) => void) => {
  return [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name || "-",
    },
    {
      accessorKey: "family.name",
      header: "Família",
      cell: ({ row }) => row.original.family?.name || "-",
    },
    {
      accessorKey: "confirmed",
      header: "Confirmado",
      cell: ({ row }) => (row.original.confirmed ? "Sim" : "Não"),
      filterFn: (row, value) => {
        if (value === "Sim") return row.original.confirmed === true;
        if (value === "Não") return row.original.confirmed === false;
        return true;
      },
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => maskPhone(row.original.phone),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {


        return (
          <div className="flex gap-2">
            <Button className="bg-gray-100 text-black font-semibold hover:bg-gray-200 rounded-md shadow" onClick={() => onEdit(row.original)}>
              Editar
            </Button>
            <Button className="bg-red-100 text-black font-semibold hover:bg-red-200 rounded-md shadow" onClick={() => onDelete(row.original)}>
              Excluir
            </Button>
          </div>
        );
      },
    },
  ] as ColumnDef<GuestData>[];
}

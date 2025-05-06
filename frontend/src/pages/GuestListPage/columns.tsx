// src/pages/guest-list/columns.tsx

import { maskPhone } from "@/utils/functions/phone";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GuestData>[] = [
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
];

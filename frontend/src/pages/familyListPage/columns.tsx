// src/pages/family/columns.ts



import { Button } from "@/components/Button";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (handleOpenInviteModal: (family: FamilyData) => void) => {
  return [
    {
      accessorKey: "name",
      header: "Família",
      cell: ({ row }) => row.original.name
    },
    {
      accessorKey: "totalGuests",
      header: "Qtd. Convidados",
      cell: ({ row }) => row.original.totalGuests,
    },
    {
      accessorKey: "confirmedGuests",
      header: "Confirmados",
      cell: ({ row }) => row.original.confirmedGuests,
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => <Button className="w-50 bg-gray-100 text-black font-semibold hover:bg-gray-200 rounded-md shadow" onClick={() => handleOpenInviteModal(row.original)}> Enviar Convite </Button>,
    }
  ] as ColumnDef<FamilyData>[]
};

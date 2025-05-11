// src/pages/family/columns.ts



import { Button } from "@/components/Button";
import { ColumnDef } from "@tanstack/react-table";

export const columns = (handleOpenInviteModal: (family: FamilyData) => void, editFamily: (family: FamilyData) => void, removeFamily: (family: FamilyData) => void) => {
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
      accessorKey: "inviteSent",
      header: "Convite Enviado",
      cell: ({ row }) => row.original.inviteSent ? "Sim" : "Não",
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) =>
        <div className="flex gap-2">
          <Button className="  bg-amber-100 text-black font-semibold hover:bg-amber-200 rounded-md shadow" onClick={() => handleOpenInviteModal(row.original)}> Enviar Convite </Button>
          <Button className="  bg-gray-100 text-black font-semibold hover:bg-gray-200 rounded-md shadow" onClick={() => editFamily(row.original)}> Editar Família </Button>
          <Button className="  bg-red-100 text-black font-semibold hover:bg-red-200 rounded-md shadow" onClick={() => removeFamily(row.original)}> Excluir Família </Button>
        </div>
      ,
    }
  ] as ColumnDef<FamilyData>[]
};

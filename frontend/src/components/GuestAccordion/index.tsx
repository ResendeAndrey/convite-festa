// src/components/FamilyAccordion.tsx

import { maskPhone } from "@/utils/functions/phone";



interface AccordionProps {
  guests: GuestData[];
  columnsLength: number
}

export function GuestAccordion({ guests, columnsLength }: AccordionProps) {
  return (
    <tr className="w-full bg-gray-100">
      <td colSpan={columnsLength} >
        <div className="p-1">
          <div className=" p-4">
            <h3 className="text-md font-semibold text-gray-700 mb-4"> Convidados</h3>


            <table className="min-w-full table-auto bg-white">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Nome</th>
                  <th className="px-4 py-2 border-b text-left">Número</th>
                  <th className="px-4 py-2 border-b text-left">Confirmado</th>
                </tr>
              </thead>
              <tbody>
                {guests?.map((guest: GuestData) => (
                  <tr key={guest.id} className="border-b">
                    <td className="px-4 py-2">{guest.name}</td>
                    <td className="px-4 py-2">{maskPhone(guest.phone)}</td>
                    <td className="px-4 py-2">{guest.confirmed ? "Sim" : "Não"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  );
}

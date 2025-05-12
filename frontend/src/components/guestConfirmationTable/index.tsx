
import api from "@/services/axios";
import { useMemo, useState } from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";


interface Props {
  guests: GuestData[];
  onConfirm: (selectedIds: string[]) => void;
  loading: boolean;
  reloadGuests: () => void
}

export function GuestConfirmationTable({ guests, onConfirm, loading, reloadGuests }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const hasAnonymous = useMemo(() => guests.some((guest) => guest.withoutName), [guests]);

  const [names, setNames] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleNameSubmit = async (id: string) => {
    setIsSubmitting(true);
    try {
      await api.patch(`/guests/${id}/guest-name`, { name: names[id] });
      reloadGuests()

    } catch (error) {
      console.error("Erro ao atualizar nome:", error);

    } finally {
      setIsSubmitting(false);
    }
  };

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (

    <div className="overflow-x-auto w-full">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 flex items-center gap-2 min-w-[50px]"> {/* Reduzir a largura da coluna do checkbox */}
              <Checkbox
                onChange={() => guests.map((guest) => {
                  toggle(guest?.id as string);
                })}
                checked={selected.length === guests.length || guests.every((guest) => guest.confirmed)}
                disabled={guests.every((guest) => guest.confirmed)}
              />
            </th>
            <th className="text-left p-3 min-w-[120px]">Nome</th> {/* Reduzir a largura da coluna "Nome" */}
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <>
              {guest.withoutName ? (
                <tr key={guest.id} className="border-b">
                  <td className="p-3 w-[50px]">
                    <Checkbox
                      checked={selected.includes(guest?.id as string) || guest.confirmed}
                      disabled
                    />
                  </td>
                  <td className="p-3 flex items-center gap-2 " >
                    <input
                      type="text"
                      placeholder="Digite o nome completo do convidado"
                      value={names[guest.id as string] || ""}
                      onChange={(e) => setNames(prev => ({ ...prev, [guest.id as string]: e.target.value }))}
                      className="p-2 rounded border border-gray-300 w-full"
                    />
                    <button
                      onClick={() => handleNameSubmit(guest.id as string)}
                      disabled={isSubmitting || !names[guest.id as string]?.trim()}
                      className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50"
                    >
                      Confirmar
                    </button>
                  </td>
                </tr>

              ) : (
                <tr key={guest.id} className="border-b" onClick={() => toggle(guest?.id as string)}>
                  <td className="p-3 w-[50px]">
                    <Checkbox
                      checked={selected.includes(guest?.id as string) || guest.confirmed}
                      disabled={guest.confirmed}
                    />
                  </td>
                  <td className="p-3 max-w-[100px] break-words">{guest.name}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <Button
          disabled={selected.length === 0 || loading || hasAnonymous}
          onClick={() => onConfirm(selected)}
        >
          {loading ? "Confirmando..." : "Confirmar Presença"}
        </Button>
      </div>
    </div>




  );
}

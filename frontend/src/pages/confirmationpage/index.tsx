
import { ConfirmPresenceModal } from "@/components/ConfirmDialog";
import { GuestConfirmationTable } from "@/components/guestConfirmationTable";
import { confirmFamily, getFamilyById } from "@/services/familyService";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


export function ConfirmPage() {
  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [guests, setGuests] = useState<GuestData[] | undefined>();
  const [loading, setLoading] = useState(false);
  const allConfirmed = guests?.every((guest) => guest.confirmed);


  const fetchGuests = useCallback(async () => {
    if (id) {
      try {
        const response = await getFamilyById(id);
        setGuests(response.data.guests);
      } catch (error) {
        console.error("Erro ao buscar convidados:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  useEffect(() => {
    if (allConfirmed) {
      setOpenModal(true);
    }
  }, [allConfirmed])

  const handleConfirm = useCallback(async (selectedIds: string[]) => {
    try {
      setLoading(true);
      await confirmFamily(
        id as string
        , selectedIds);

    } catch (error) {
      console.log(error)
      toast.error('Erro ao confirmar convidados')
    } finally {
      setLoading(false);
      setOpenModal(true)
      fetchGuests()
    }
  }, [fetchGuests, id]);



  return (
    <div className="max-w-2xl w-full mx-auto mt-10 px-4 sm:px-6 py-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Confirmação de Presença</h1>

      {guests && (
        <div className="overflow-x-auto">
          <GuestConfirmationTable guests={guests} onConfirm={handleConfirm} loading={loading} reloadGuests={fetchGuests} />
        </div>
      )}

      {openModal && (
        <ConfirmPresenceModal
          guestName={guests?.filter((guest) => guest.confirmed).map((guest) => guest.name) as string[] || []}
          onOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

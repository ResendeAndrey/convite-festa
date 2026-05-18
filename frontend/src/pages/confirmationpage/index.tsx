import { ConfirmPresenceModal } from "@/components/ConfirmDialog";
import { GuestConfirmationTable } from "@/components/guestConfirmationTable";
import LoadingConfirmationSpinner from "@/components/LoadingConfirmationPage";
import { confirmFamily, getFamilyById } from "@/services/familyService";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


function InviteSplash({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-10">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <img
          src="/conviteTueta.png"
          alt="Convite"
          className="w-full rounded-2xl shadow-2xl"
        />
        <button
          onClick={onConfirm}
          className="
            w-full
            bg-pink-500 text-white
            text-xl font-bold
            py-4 rounded-2xl
            shadow-[0_0_30px_rgba(236,72,153,0.6)]
            animate-pulse
            hover:animate-none hover:bg-pink-600 hover:scale-105
            transition-all duration-200
          "
        >
          Confirmar Presença 🎉
        </button>
      </div>
    </div>
  );
}


export function ConfirmPage() {
  const { id } = useParams();

  const [showSplash, setShowSplash] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [guests, setGuests] = useState<GuestData[] | undefined>();
  const [loading, setLoading] = useState(false);
  const allConfirmed = guests?.every((guest) => guest.confirmed);
  const guestConfirmed = useMemo(() => localStorage.getItem('guestConfirmed') === 'true', []);



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
    if (allConfirmed || guestConfirmed) {
      setOpenModal(true);
    }
  }, [allConfirmed, guestConfirmed]);

  const handleConfirm = useCallback(async (selectedIds: string[]) => {
    try {
      setLoading(true);
      await confirmFamily(id as string, selectedIds);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao confirmar convidados");
    } finally {
      setLoading(false);
      setOpenModal(true)
      fetchGuests()
      localStorage.setItem('guestConfirmed', JSON.stringify('true'));
    }
  }, [fetchGuests, id]);

  if (showSplash) {
    return <InviteSplash onConfirm={() => setShowSplash(false)} />;
  }

  return (
    <div className="max-w-2xl w-full mx-auto mt-10 px-4 sm:px-6 py-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Confirmação de Presença</h1>

      {guests ? (
        <div className="overflow-x-auto">
          <GuestConfirmationTable guests={guests} onConfirm={handleConfirm} loading={loading} reloadGuests={fetchGuests} />
        </div>
      ) : (
        <LoadingConfirmationSpinner />
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

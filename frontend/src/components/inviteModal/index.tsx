import { useState } from "react";

interface InviteModalProps {
  family: FamilyData
  isOpen: boolean
  onClose: () => void
  handleSubmit: (data: InviteData) => void

}
const InviteModal = (
  { family, isOpen, onClose, handleSubmit }: InviteModalProps
) => {
  // Estado para controlar o nome e telefone selecionados
  const [selected, setSelected] = useState<GuestData>({} as GuestData);






  // Função para preencher o telefone automaticamente ao selecionar o nome
  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    const guest = family?.guests?.find((guest) => guest.id === selected);

    setSelected(guest as GuestData);
  };

  // Função para enviar o convite
  const sendInvite = () => {
    if (selected) {
      onClose();
      handleSubmit({ name: selected.name || '', phone: selected.phone, familyId: family.id as string });

    }
  };



  return (
    <div>


      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Enviar Convite</h2>
            <h3 className="text-sm font-[400] mb-4">Selecione o nome e telefone para quem será enviado o convite dessa familia</h3>

            {/* Select para o nome */}
            <div className="mb-4">
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <select
                id="guestName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                value={selected.id}
                onChange={handleNameChange}
              >
                <option value="">Selecione o nome</option>
                {family.guests && family.guests.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.name || "Nome não informado"}
                  </option>
                ))}
              </select>


            </div>

            <div className="mb-4">
              <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <select
                id="guestPhone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                value={selected.phone}
                disabled
              >
                <option value="">Selecione o telefone</option>
                {selected.phone && <option value={selected.phone}>{selected.phone}</option>}
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={sendInvite}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 mr-2"
              >
                Enviar Convite
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default InviteModal;

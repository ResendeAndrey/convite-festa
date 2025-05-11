// src/pages/guest-list/EditGuestModal.tsx


import { updateGuest } from "@/services/guestService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import { toast } from "sonner"; // opcional para feedback
import { Button } from "../Button";
import { Input } from "../InputComponent";
import { guestFormSchema } from "./validationSchema";

interface EditGuestModalProps {
  guest: GuestData;
  isOpen: boolean;
  onClose: () => void;
  reloadGuests: () => void
}



export function EditGuestModal({
  guest,
  isOpen,
  onClose,
  reloadGuests
}: EditGuestModalProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<GuestData>({
    defaultValues: {
      name: guest.name,
      phone: guest.phone,
    },
    resolver: zodResolver(guestFormSchema)
  });



  const onSubmit = async (data: GuestData) => {
    try {
      await updateGuest(guest.id as string, data).then(() => reloadGuests());
      toast.success("Convidado atualizado com sucesso.");

      onClose();
    } catch (err) {
      toast.error("Falha ao atualizar convidado.");
      console.log(err, 'err')
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar convidado"
      className='absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 bg-white rounded-lg shadow-2xl max-h-8/10 border border-gray-400 overflow-y-auto'
      overlayClassName="fixed inset-0  bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nome" control={control} fieldName="name" placeholder="Nome" error={!!errors.name} infoText={errors?.name?.message?.toString()} />
        <Input label="Telefone" control={control} fieldName="phone" placeholder="Telefone" error={!!errors.phone} infoText={errors?.phone?.message?.toString()} />


        <div className="flex gap-4">

          <Button
            type="submit"
            disabled={isSubmitting}
            className=" w-50 mt-4 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-md"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
          <Button

            onClick={onClose}
            className=" w-50 mt-4 bg-neutral-500 hover:bg-neutral-600 text-white p-2 rounded-md"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>

  );
}

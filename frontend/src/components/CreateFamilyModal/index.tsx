import { createFamily } from "@/services/familyService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "../Button";
import { Input } from "../InputComponent";

const schema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  totalGuests: z.coerce
    .number({ invalid_type_error: "Informe um número" })
    .int()
    .min(1, "Mínimo de 1 convidado"),
});

type FormData = z.infer<typeof schema>;

interface CreateFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reloadFamilies: () => void;
}

export function CreateFamilyModal({ isOpen, onClose, reloadFamilies }: CreateFamilyModalProps) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", totalGuests: 1 },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createFamily(data);
      toast.success("Família cadastrada com sucesso!");
      reset();
      reloadFamilies();
      onClose();
    } catch {
      toast.error("Erro ao cadastrar família.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Nova Família"
      className="absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-10/12 md:w-7/12 lg:w-5/12 bg-white rounded-lg shadow-2xl border border-gray-400"
      overlayClassName="fixed inset-0 bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Nova Família</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome da família"
          control={control}
          fieldName="name"
          placeholder="Ex: Família Silva"
          error={!!errors.name}
          infoText={errors.name?.message}
        />
        <Input
          label="Total de convidados"
          control={control}
          fieldName="totalGuests"
          placeholder="Ex: 4"
          type="number"
          error={!!errors.totalGuests}
          infoText={errors.totalGuests?.message}
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-50 mt-4 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-md"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
          <Button
            onClick={onClose}
            className="w-50 mt-4 bg-neutral-500 hover:bg-neutral-600 text-white p-2 rounded-md"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

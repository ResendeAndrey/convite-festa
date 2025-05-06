

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { GuestFormData, guestFormSchema } from "./schema";

import { useFamilyContext } from "@/contexts/familyContext";
import { createGuest } from "@/services/guestService";
import { useEffect } from "react";
import * as Icon from 'react-feather';
import Modal from 'react-modal';
import { toast } from "react-toastify";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import FamilyFilter from "../FamilyFilter";
import { Input } from "../InputComponent";



interface GuestModalFormProps {
  onClose: () => void
  isOpen: boolean
}



const GuestModalForm = ({ isOpen, onClose }: GuestModalFormProps) => {
  const { families } = useFamilyContext()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { isSubmitting, errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      familyId: null,
      guests: [{ name: undefined, phone: "", withoutName: false }],
    },
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });



  const onSubmit = async (data: GuestPayload) => {
    try {
      const dataGuest = {
        familyId: data.familyId,
        guests: data.guests.map((guest) => ({
          name: guest.name == '' ? undefined : guest.name,
          phone: guest.phone,
          withoutName: !guest.name ? true : false
        }))
      }
      await createGuest(dataGuest);
      toast.success("Convidados cadastrados com sucesso!");
      reset();
      onClose()
    } catch (err) {
      toast.error("Erro ao cadastrar convidados.");
      console.error(err);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Novos convidados"
      className='absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 bg-white rounded-lg shadow-2xl max-h-8/10 border border-gray-400 overflow-y-auto'
      overlayClassName="fixed inset-0  bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Novos convidados</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={control}
          name="familyId"
          render={({ field }) => (
            <FamilyFilter
              families={families?.data || []}
              onFamilyChange={(families) => field.onChange(families?.id)}
              selectedFamilyId={watch("familyId") as string}
            />
          )}
        />

        {fields.map((field, index) => (
          <div
            key={field.id}
            className={`
              grid gap-4
              grid-cols-1
              ${errors?.guests?.[index]?.name ? "items-center" : "items-end"}
              sm:grid-cols-2
            `}
          >
            <div className="grid grid-cols-[1fr_max(110px)] items-center gap-2">

              <Input
                label="Nome"
                placeholder="Digite o nome"
                error={!!errors?.guests?.[index]?.name}
                infoText={errors?.guests?.[index]?.name?.message?.toString()}

                className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                fieldName={`guests.${index}.name`}
                control={control}
                value={watch('guests')[index]?.name as string}
              />

              <div className="h-[22px] w-[120px]">

                <Checkbox id={`guests.${index}.withoutName`} label="Ainda não sei o nome" {...register(`guests.${index}.withoutName`)} />
              </div>

            </div>



            <div className={`${index > 0 && 'grid grid-cols-[1fr_max(42px)] gap-2 items-end'}`}>
              <Input
                label="Telefone"
                mask="(99) 99999-9999"
                placeholder="Digite o telefone"
                error={!!errors?.guests?.[index]?.phone}
                infoText={errors?.guests?.[index]?.phone?.message?.toString()}
                className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                fieldName={`guests.${index}.phone`}
                control={control}
                value={watch('guests')[index].phone}
              />

              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md h-[42px] w-[42px]"
                >
                  <Icon.X />
                </Button>
              )}
            </div>
            <hr className={`${index === fields.length - 1 && 'hidden'} sm:hidden border-gray-300 my-4`} />
          </div>

        ))}

        <Button
          type="button"
          onClick={() => append({ name: "", phone: "", withoutName: false })}
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-md max-w-fit p-3"
        >
          + Adicionar Convidado
        </Button>
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
};

export default GuestModalForm;
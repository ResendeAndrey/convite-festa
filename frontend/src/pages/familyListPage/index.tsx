// src/pages/family/familyListPage.tsx

import { DataTable } from '@/components/DataTable';
import DeleteModalComponent from '@/components/DeleteModalComponent';
import { CreateFamilyModal } from '@/components/CreateFamilyModal';
import { EditFamilyModal } from '@/components/EditFamilyModal';
import FamilyFilter from '@/components/FamilyFilter';
import InviteModal from '@/components/inviteModal';
import LoadingSpinner from '@/components/Loader';
import { SearchInput } from '@/components/SearchInput';
import SidebarLayout from '@/components/sidebarLayout';
import { useEventDetails } from '@/contexts/eventDetailsContext';
import { useFamilyContext } from '@/contexts/familyContext';
import { deleteFamily, sentInvite } from '@/services/familyService';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { columns } from './columns';
import { FamilyListFilterProps } from './types';





export default function FamilyListPage() {
  const { families, getAllFamilies, loading } = useFamilyContext();
  const { eventDetails } = useEventDetails()
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setOpenDeleteModal] = useState(false);
  const [openEditFamilyModal, setOpenEditFamilyModal] = useState(false);
  const [openCreateFamilyModal, setOpenCreateFamilyModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<FamilyData | undefined>();

  const [filters, setFilters] = useState<FamilyListFilterProps | undefined>();




  useEffect(() => {
    if (filters)
      getAllFamilies(filters)
  }, [filters, getAllFamilies])

  const handleFamilyChange = (selectedFamily: FamilyData | undefined) => {
    setFilters(prev => ({
      ...prev,
      familyId: selectedFamily?.id
    }));
  };

  const handleSearch = useCallback((search: string | undefined) => {
    if (search !== '' && !search) setFilters(prev => ({ ...prev, search: undefined }));
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const renderFamilyName = () => {
    return selectedFamily?.guests?.map((guest) => guest.name).join(', ')
  }

  const handleSendInvite = async (data: InviteData) => {


    const message = `*Olá, ${renderFamilyName()}!* 🎉

    Você está convidado para a comemoração de *90 anos* de *Maria Antonieta (Tuêta)*!

    *Confirme sua presença:*
    ${import.meta.env.VITE_APP_URL}/families/${data.familyId}/confirmation

    *Endereço:*
    [${eventDetails.location}](https://waze.com/ul?q=${encodeURIComponent(eventDetails.location)})  (Spaço's Eventos)

    *Data:* 02/08/2026
    *Horário:* 12h00
    *Traje:* Esporte fino

    *${eventDetails.gift_description}*

    *Adicione ao seu calendário:*
    Acesse o link da confirmação acima e baixe o evento na página.

    *Favor confirmar até 23/07*:

    Esperamos você para comemorar conosco essa data tão especial! ✨`;



    const encodeMessage = encodeURIComponent(message);
    const url = `https://wa.me/${data.phone}?text=${encodeMessage}`;
    await sentInvite(selectedFamily?.id as string).then(() => {
      getAllFamilies(filters);
    });

    window.open(url, '_blank');
  }

  const handleOpenInviteModal = (family: FamilyData) => {
    setSelectedFamily(family);
    setOpenModal(true);

  };

  const onClickEditFamily = (family: FamilyData) => {
    setSelectedFamily(family);
    setOpenEditFamilyModal(true);
  }
  const onClickRemoveFamily = (family: FamilyData) => {
    setSelectedFamily(family);
    setOpenDeleteModal(true);
  }

  const onRemoveFamily = async () => {
    try {
      await deleteFamily(selectedFamily?.id as string).then(() => getAllFamilies());
      toast.success("Familia removida com sucesso.");

      setOpenDeleteModal(false);
    } catch (err) {
      toast.error("Falha ao remover familia.");
      console.log(err, 'err')
    }
  }

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold text-center lg:text-left">Lista de Famílias</h1>
          <button
            onClick={() => setOpenCreateFamilyModal(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            + Nova Família
          </button>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6 w-full">
              <FamilyFilter families={families?.data as FamilyData[]} onFamilyChange={handleFamilyChange} selectedFamilyId={filters?.familyId as string} />
              <SearchInput onSearch={handleSearch} />
            </div>
          </div>

          {loading || !families?.data ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={columns(handleOpenInviteModal, onClickEditFamily, onClickRemoveFamily)}
              data={families}
              onChangePage={(page) => getAllFamilies({ page })}
              currentPage={families.page || 1}
              expanded
              pagination
            />
          )}
        </div>
      </div>
      {openModal && selectedFamily && <InviteModal family={selectedFamily} isOpen={openModal} onClose={() => setOpenModal(false)} handleSubmit={handleSendInvite} />}
      {openEditFamilyModal && selectedFamily && <EditFamilyModal family={selectedFamily} isOpen={openEditFamilyModal} onClose={() => setOpenEditFamilyModal(false)} reloadFamilies={getAllFamilies} />}
      {deleteModal && selectedFamily && <DeleteModalComponent isOpen={deleteModal} onClose={() => setOpenDeleteModal(false)} onDelete={onRemoveFamily} name={selectedFamily.name as string} />}
      <CreateFamilyModal isOpen={openCreateFamilyModal} onClose={() => setOpenCreateFamilyModal(false)} reloadFamilies={getAllFamilies} />
    </SidebarLayout>
  );
}

// src/pages/family/familyListPage.tsx

import { DataTable } from '@/components/DataTable';
import FamilyFilter from '@/components/FamilyFilter';
import InviteModal from '@/components/inviteModal';
import LoadingSpinner from '@/components/Loader';
import { SearchInput } from '@/components/SearchInput';
import SidebarLayout from '@/components/sidebarLayout';
import { useEventDetails } from '@/contexts/eventDetailsContext';
import { useFamilyContext } from '@/contexts/familyContext';
import { sentInvite } from '@/services/familyService';
import { useCallback, useEffect, useState } from 'react';
import { columns } from './columns';
import { FamilyListFilterProps } from './types';





export default function FamilyListPage() {
  const { families, getAllFamilies, loading } = useFamilyContext();
  const { eventDetails } = useEventDetails()
  const [openModal, setOpenModal] = useState(false);
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

    Você está convidado para a comemoração de *60 anos de casados* de *Maria José e Tunico*!

    *Confirme sua presença:*
    ${import.meta.env.VITE_APP_URL}/families/${data.familyId}/confirmation

    *Endereço:*
    [${eventDetails.location}](https://waze.com/ul?q=${encodeURIComponent(eventDetails.location)})  (Vera Cruz de Minas)

    *Data:* 31/05/2025
    *Horário:* 12h00
    *Traje:* Esporte fino

    *${eventDetails.gift_description}*

    *Adicione ao seu calendário:*
    Acesse o link da confirmação acima e baixe o evento na página.

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

  return (
    <SidebarLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-12 text-center lg:text-left">Lista de Famílias</h1>

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
              columns={columns(handleOpenInviteModal)}
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
    </SidebarLayout>
  );
}

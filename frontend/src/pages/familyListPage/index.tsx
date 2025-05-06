// src/pages/family/familyListPage.tsx

import { DataTable } from '@/components/DataTable';
import FamilyFilter from '@/components/FamilyFilter';
import InviteModal from '@/components/inviteModal';
import { SearchInput } from '@/components/SearchInput';
import SidebarLayout from '@/components/sidebarLayout';
import { useFamilyContext } from '@/contexts/familyContext';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { FamilyListFilterProps } from './types';





export default function FamilyListPage() {
  const { families, getAllFamilies, loading } = useFamilyContext();
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

  const handleSearch = (search: string | undefined) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleSendInvite = (data: InviteData) => {


    const message = `*Olá ${data.name}!* 🎉

    Você está convidado para a comemoração de *60 anos de casados* de *Maria José e Tunico*!

    *Confirme sua presença:*
    ${import.meta.env.VITE_APP_URL}/families/${data.familyId}/confirmation

    *Endereço:*
    [R. Nossa Sra. do Rosário, 1599 - Espraiado, Pedro Leopoldo - MG](https://maps.google.com/?q=R.+Nossa+Sra.+do+Ros%C3%A1rio,+1599+-+Espraiado,+Pedro+Leopoldo+-+MG)

    *Data:* 31/05/2025
    *Horário:* 12h00
    *Traje:* Sport fino
    *Presente:* 1kg de alimento não perecível

    *Adicione ao seu calendário:*
    Acesse o link da confirmação acima e baixe o evento na página.

    Esperamos você para comemorar conosco essa data tão especial! ✨`;



    const encodeMessage = encodeURIComponent(message);
    const url = `https://wa.me/${data.phone}?text=${encodeMessage}`;
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
            <div className="flex justify-center items-center h-32">
              <div className="loader" />
            </div>
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

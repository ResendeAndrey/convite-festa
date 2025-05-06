

import ConfirmedFilter from '@/components/ConfirmedFilter';
import GuestModalForm from '@/components/CreateModal';
import FamilyFilter from '@/components/FamilyFilter';
import { SearchInput } from '@/components/SearchInput';

import { Button } from '@/components/Button';
import LoadingSpinner from '@/components/Loader';
import SidebarLayout from '@/components/sidebarLayout';
import { useFamilyContext } from '@/contexts/familyContext';
import { fetchGuests } from '@/services/guestService';
import { useCallback, useEffect, useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { columns } from './columns'; // Arquivo com definição das colunas da tabela
import { GuestListFilterProps } from './types';



export default function GuestListPage() {
  const [guests, setGuests] = useState<DataResponse<GuestData[]>>({} as DataResponse<GuestData[]>);
  const [openModal, setOpenModal] = useState(false);
  const { families, getAllFamilies } = useFamilyContext()
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<GuestListFilterProps>({} as GuestListFilterProps);



  const getGuests = useCallback(async (params?: GetAllFamiliesParams) => {
    const paramsWithDefaults: GetAllFamiliesParams = {
      ...params,
      page: params?.page || 1,
      limit: params?.limit || 30,
    }
    setLoading(true);
    try {
      const response = await fetchGuests({ ...filters, ...paramsWithDefaults });
      setGuests(response.data);
    } catch (error) {
      console.error('Erro ao buscar convidados:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    getGuests();
  }, [getGuests]);

  useEffect(() => {
    if (!families?.data) {
      getAllFamilies()
    }
  }, [families?.data, getAllFamilies])




  const handleFamilyChange = (selectedFamily: FamilyData | undefined) => {
    setFilters(prev => ({
      ...prev,
      familyId: selectedFamily?.id
    }))

  };


  const handleConfirmedChange = (confirmed: boolean) => {
    setFilters(prev => ({
      ...prev,
      confirmed: confirmed === true ? true : undefined
    }))
  };

  const handleSearch = useCallback((search: string | undefined) => {
    setFilters(prev => ({ ...prev, search }))
  }, []);


  return (
    <SidebarLayout>
      <div className="container mx-auto px-1 sm:px-6 py-10">
        <h1 className="text-2xl font-bold mb-12 text-center sm:text-left">Lista de Convidados</h1>

        <div className="p-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap w-full">
              <FamilyFilter
                families={families?.data as FamilyData[]}
                onFamilyChange={handleFamilyChange}
                selectedFamilyId={filters.familyId}
              />
              <ConfirmedFilter
                onConfirmedChange={handleConfirmedChange}
                currentValue={filters.confirmed || false}
              />
              <SearchInput onSearch={handleSearch} />
            </div>

            <Button
              onClick={() => setOpenModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-md px-4 py-2 w-full sm:w-auto lg:w-50"
            >
              Novo convidado
            </Button>
          </div>

          {loading || !guests.data ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={columns}
              data={guests}
              onChangePage={(page) => getGuests({ page })}
              currentPage={guests.page || 1}
              pagination
            />
          )}
        </div>

        <GuestModalForm
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            getGuests();
            getAllFamilies();
          }}
        />
      </div>
    </SidebarLayout>
  );
}

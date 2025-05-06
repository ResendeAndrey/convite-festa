import api from "./axios";

export const confirmFamily = async (familyId: string, guestsIds: string[]) => {
  const response = await api.patch<{
    family: string;
    confirmedGuests: string[];
  }>(`/families/${familyId}/confirm`, {
    guestsIds
  });
  return response.data;
};

export const fetchFamilies = async (params: GetAllFamiliesParams) => {
  const response: ApiResponse<FamilyData[]> = await api.get("/families", {
    params
  });

  return response.data;
};

export const getFamilyById = async (familyId: string) => {
  const response = await api.get<FamilyData>(`/families/${familyId}`);
  return response;
};

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

export const sentInvite = async (familyId: string) => {
  const response = await api.patch(`/families/${familyId}/invite`);
  return response;
};

export const updateFamily = async (familyId: string, familyName: string) => {
  const response = await api.patch(`/families/${familyId}`, {
    name: familyName
  });
  return response.data;
};

export const deleteFamily = async (familyId: string) => {
  const response = await api.delete(`/families/${familyId}`);
  return response.data;
};

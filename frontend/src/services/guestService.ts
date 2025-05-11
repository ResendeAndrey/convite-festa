import api from "./axios";

// Tipo para o retorno de lista de convidados

export const fetchGuests = async (params: GuestGetAllParams) => {
  try {
    const response: ApiResponse<GuestData[]> = await api.get("/guests", {
      params
    });
    return response;
  } catch (error) {
    console.error("Error fetching guests:", error);
    throw error;
  }
};

export const createGuest = async (guest: GuestPayload) => {
  const response = await api.post<ApiResponse<GuestPayload>>("/guests", guest);
  return response.data;
};

export const confirmGuest = async (guestId: number) => {
  const response = await api.post(`/guests/${guestId}/confirm`);
  return response.data;
};

export const updateGuest = async (guestId: string, guest: GuestData) => {
  const response = await api.patch(`/guests/${guestId}`, guest);
  return response.data;
};

export const deleteGuest = async (guestId: string) => {
  const response = await api.delete(`/guests/${guestId}`);
  return response.data;
};
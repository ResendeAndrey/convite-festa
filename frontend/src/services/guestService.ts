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

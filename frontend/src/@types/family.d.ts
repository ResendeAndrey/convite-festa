interface GetAllFamiliesParams {
  search?: string;
  order?: "asc" | "desc";
  orderBy?: "name" | "createdAt";
  page?: number;
  limit?: number;
  familyId?: string;
}

interface FamilyData {
  name: string;
  totalGuests: number;
  id?: string;
  guests?: GuestData[];
  confirmedGuests: number;
  inviteSent: boolean;
}

interface InviteData {
  name: string;
  familyId: string;
  phone: string;
}

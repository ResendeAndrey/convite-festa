interface GuestData {
  name: string;
  phone: string;
  familyId?: string;
  confirmed?: boolean;
  withoutName?: boolean;
}

interface GuestGetAllParams {
  familyId?: string;
  confirmed?: string;
  search?: string;
  order?: "asc" | "desc";
  orderBy?: "name" | "phone" | "createdAt" | "updatedAt";
  page?: number;
  limit?: number;
}

interface GuestPayload {
  familyId: string | null;
  guests: GuestData[];
}

interface GuestData {
  name?: string | undefined;
  phone: string;
  familyId?: string;
  confirmed?: boolean;
  id?: string;
  family?: FamilyData;
  withoutName?: boolean;
}

interface GuestGetAllParams {
  familyId?: string;
  confirmed?: boolean;
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

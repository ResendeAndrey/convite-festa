import { fetchFamilies } from "@/services/familyService"; // ou onde estiver sua função

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

interface FamilyContextType {
  families: DataResponse<FamilyData[]> | undefined;
  loading: boolean;
  getAllFamilies: (params?: GetAllFamiliesParams) => Promise<void>;
}

const FamilyContext = createContext<FamilyContextType | null>(null);

export const FamilyProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  const [families, setFamilies] = useState<DataResponse<FamilyData[]>>();
  const [loading, setLoading] = useState(false);

  const getFamilies = useCallback(async (params?: GetAllFamiliesParams) => {
    const paramsWithDefaults: GetAllFamiliesParams = {
      ...params,
      page: params?.page || 1,
      limit: params?.limit || 30,
    }
    setLoading(true);
    try {
      const response = await fetchFamilies({ ...paramsWithDefaults });
      setFamilies(response);
    } catch (error) {
      console.error("Erro ao buscar famílias:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getFamilies();
    }
  }, [getFamilies, isAuthenticated]);



  return (
    <FamilyContext.Provider value={{ families, loading, getAllFamilies: getFamilies }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) throw new Error("useFamilyContext deve ser usado dentro de <FamilyProvider>");
  return context;
};

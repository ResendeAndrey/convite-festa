interface ApiResponse<T> extends AxiosResponse {
  data: DataResponse<T>; // Tipagem do corpo da resposta
  message?: string;
  error?: string;
}

interface DataResponse<T = unknown> {
  data: T;
  page?: number;
  limit?: number;
  totalPages?: number;
  count?: number;
}

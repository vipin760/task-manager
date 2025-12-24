// Single Todo item
export interface IAddTodoData {
  _id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// Pagination info
export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API response for getTodos
export interface IGetTodosResponse {
  status: boolean;
  data: IAddTodoData[];
  pagination: IPagination;
}

import { API_ENDPOINTS } from "./endpoints";
// import { TodoPayload, TodoResponse } from "../types/todo.types";
import axiosInstance from "./axiosInstance";
import type { IAddTodoData } from "../types/FormPage.types";
import type { IGetTodosResponse } from "../types/hooksTypes";

export const createTodo = (payload: any) =>
  axiosInstance.post<any>(API_ENDPOINTS.TODO, payload);

export const getTodos = (page:number,limit:number) =>
  axiosInstance.get<IGetTodosResponse>(`${API_ENDPOINTS.TODO}?page=${page}&limit=${limit}`);

export const updateTodo = (id: string, payload: IAddTodoData) =>
  axiosInstance.put(`${API_ENDPOINTS.TODO}/${id}`, payload);

export const deleteTodo = (id: string) =>
  axiosInstance.delete(`${API_ENDPOINTS.TODO}/${id}`);
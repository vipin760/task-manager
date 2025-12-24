import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/todo.api";
import type { IAddTodoData } from "../types/FormPage.types";
// import { Todo, TodoPayload } from "../types/todo.types";

interface IPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const useTodo = () => {
    const [todos, setTodos] = useState<any[] | any>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 1,
    });
    const fetchTodos = async (page = 1, limit = 5) => {
        setLoading(true);
        try {
            const response = await getTodos(page, limit);
            const apiData = response.data;
            setTodos(response);
            setPagination(apiData.pagination);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (payload: IAddTodoData, pagination: IPagination) => {
        const res = await createTodo(payload);
        fetchTodos(pagination.page, pagination.limit);
        return res
    };

    const deleteTodoHook = async (id: string, pagination: IPagination) => {
        const res = await deleteTodo(id)
        const remainingTotal = pagination.total - 1;
        const newTotalPages = Math.ceil(remainingTotal / pagination.limit);
        const nextPage =
            pagination.page > newTotalPages
                ? Math.max(newTotalPages, 1)
                : pagination.page;
        fetchTodos(nextPage, pagination.limit)
        return res
    }

    const updateTodoHook = async (id: string, payload: IAddTodoData, pagination: IPagination) => {
        const res = await updateTodo(id, payload)
        fetchTodos(pagination.page,pagination.limit)
        return res
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    return { todos, loading, pagination, fetchTodos, addTodo, deleteTodoHook, updateTodoHook };
};

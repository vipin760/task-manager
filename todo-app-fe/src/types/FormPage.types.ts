import type React from "react";

export type TodoStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface IFormPageProps {
    editingId: string | null;
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
    setFormData: React.Dispatch<
        React.SetStateAction<{ title: string; description: string, status:TodoStatus }>
    >;
    formData: {
        title: string;
        description: string;
        status:TodoStatus
    };
    onClose: () => void;
    handleClose: (showForm: boolean) => void
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export interface IAddTodoData {
    _id?: string;
    title: string
    description: string
    status:TodoStatus
}

export interface IListTodoPageProps {
    expandedId: string | null;
    todo: any[]
    pagination: {
        total: number;
        page: number;
        totalPages: number;
        limit: number;
        onPageChange: (page: number) => void;
    };
    handleFormOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleDelete: (id: string) => void
    handleEdit: (item: IAddTodoData) => void
    handlePagination:(page:number) => void
}
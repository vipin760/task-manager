import { Plus, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormPage from "../../components/formData/FormPage";
import { useTodo } from "../../hooks/useTodo";
import ListTodoPage from "../../components/ListTodo/ListTodo";
import type { IAddTodoData, TodoStatus } from "../../types/FormPage.types";

function HomePage() {
    //  const [todoData, setTodoData] = useState([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [expandedId, _setExpandedId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', status: 'PENDING' as TodoStatus});
    const [showForm, setShowForm] = useState<boolean | false>(false);

    // calling endpoint
    const { todos,fetchTodos, addTodo, deleteTodoHook, updateTodoHook } = useTodo()

    const handleClose = (showForm: boolean) => {
        setShowForm(showForm)
    }
    useEffect(() => {
        console.log("showForm updated:", showForm);

    }, [showForm]);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            await addTodo(formData,todos.pagination)
            setFormData({ title: '', description: '', status:'PENDING' })
        } catch (error) {
            console.log("<><>error", error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const data = await deleteTodoHook(id,todos.pagination)
            console.log("<><>deleted", data)
        } catch (error) {
            console.log("<><>error", error)
        }
    }

    const handleEdit = async (data: IAddTodoData) => {
        try {
            if (!data._id) return;
            setEditingId(data._id);
            setFormData({
                title: data.title,
                description: data.description || "",
                status:data.status || 'PENDING'
            });
            setShowForm(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            if (!editingId) return
            await updateTodoHook(editingId, formData,todos.pagination)
            setFormData({ title: '', description: '',status:'PENDING' })
        } catch (error) {
            console.log(error)
        }
    }
    const handlePagination = async (page: number) => {
        console.log("pagination", page);
        fetchTodos(page)

    }
    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 md:p-8">
                <div className="max-w-xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-1 relative">
                        <div className="absolute inset-0 blur-3xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20"></div>
                        <h1 className="text-6xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 relative animate-pulse">
                            Todo Universe
                        </h1>
                        <div className="w-full flex justify-center items-center">
                            <p className="w-[60%] text-purple-300 text-lg relative">Where tasks become reality ✨</p>
                        </div>
                    </div>


                    {/* Form Card */}
                    {Array.isArray(todos?.data) && todos.data.length === 0 && (
                        <div className="text-center py-2">
                            <div className="inline-block p-10 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-purple-500/20">
                                <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-bounce" />
                                <p className="text-purple-300 text-xl mb-6">
                                    No tasks yet. Create your first one!
                                </p>

                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-8 py-4 rounded-xl text-white font-bold flex items-center gap-3 mx-auto hover:scale-105 transition"
                                >
                                    <Plus />
                                    Create First Task
                                </button>
                            </div>
                        </div>
                    )}

                    {
                        Array.isArray(todos?.data) && todos.data.length !== 0 && (
                            <><ListTodoPage
                                expandedId={expandedId}
                                todo={todos.data}
                                pagination={todos.pagination}
                                handleFormOpen={setShowForm}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                handlePagination={handlePagination}
                            /></>
                        )
                    }

                    {/* MODAL */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out">
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setShowForm(false)}
                            />

                            {/* Popup */}
                            <div className="relative z-50 w-full max-w-xl animate-scaleIn">

                                <FormPage
                                    editingId={editingId}
                                    setEditingId={setEditingId}
                                    setFormData={setFormData}
                                    onClose={() => setShowForm(false)}
                                    handleClose={handleClose}
                                    formData={formData}
                                    handleSubmit={handleSubmit}
                                    handleUpdate={handleUpdate}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default HomePage
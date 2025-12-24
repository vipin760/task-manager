import { ChevronDown, ChevronUp, Edit2, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { IListTodoPageProps, TodoStatus } from "../../types/FormPage.types";

const statusDotStyles: Record<TodoStatus, string> = {
    PENDING: "bg-yellow-400 shadow-yellow-400/50",
    IN_PROGRESS: "bg-blue-400 shadow-blue-400/50",
    COMPLETED: "bg-green-400 shadow-green-400/50",
};
const ListTodoPage: React.FC<IListTodoPageProps> = ({ todo, pagination, handleFormOpen, handleDelete, handleEdit, handlePagination }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(pagination.page | 1)
    useEffect(() => {
        setPageNumber(pagination.page)
    }, [pagination.page])

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const handlePrev = () => {
        if (pageNumber > 1) {
            const newPage = pageNumber - 1;
            setPageNumber(newPage);
            handlePagination(newPage);
        }
    };

    const handleNext = () => {
        if (pageNumber < pagination.totalPages) {
            const newPage = pageNumber + 1;
            setPageNumber(newPage);
            handlePagination(newPage);
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gray-900 bg-opacity-90 backdrop-blur-xl rounded-xl border border-purple-500/20 overflow-hidden">

                    <div className="flex w-full justify-between p-2 bg-black">
                        <div className="w-[70%] flex flex-wrap gap-6 items-center mx-2">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10">
                                <span className="w-3 h-3 rounded-full animate-pulse bg-yellow-400 shadow-yellow-400/50 shadow-lg" />
                                <span className="text-sm font-medium text-yellow-400">Pending</span>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10">
                                <span className="w-3 h-3 rounded-full animate-pulse bg-blue-400 shadow-blue-400/50 shadow-lg" />
                                <span className="text-sm font-medium text-blue-400">In Progress</span>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10">
                                <span className="w-3 h-3 rounded-full animate-pulse bg-green-400 shadow-green-400/50 shadow-lg" />
                                <span className="text-sm font-medium text-green-400">Completed</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                handleFormOpen(true)
                            }}
                            className="w-[30%] bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl py-2 text-white font-bold flex items-center justify-center gap-1 hover:scale-105 transition"
                        >
                            <Plus />
                            Create Task
                        </button>
                    </div>
                    {todo &&
                        todo.map((item, _idx) => {
                            const isExpanded = expandedId === item._id;
                            return (
                                <div key={item._id}>
                                    {/* Header */}
                                    <div
                                        className="p-6 flex items-center justify-between cursor-pointer hover:bg-purple-500/5 transition-all duration-300"
                                        onClick={() => toggleExpand(item._id)}
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-3 h-3 rounded-full animate-pulse ${statusDotStyles[item.status as TodoStatus]} shadow-lg`}></div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(item);
                                                }}
                                                className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item._id);
                                                }}
                                                className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            {isExpanded ? (
                                                <ChevronUp className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                                            ) : (
                                                <ChevronDown className="w-6 h-6 text-purple-400 transition-transform duration-300" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div
                                        className={`px-6 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 py-4" : "max-h-0"
                                            }`}
                                    >
                                        <div className="pl-7 border-l-2 border-purple-500/30">
                                            {item.description ? (
                                                <p className="text-purple-200 text-lg leading-relaxed pl-4">
                                                    {item.description}
                                                </p>
                                            ) : (
                                                <p className="text-purple-400/50 italic pl-4 text-lg">
                                                    No description available
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    <div className="flex justify-center items-center gap-3 py-4">
                        <button
                            disabled={pageNumber === 1}
                            onClick={handlePrev}
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-purple-300">
                            Page {pageNumber} of {pagination.totalPages}
                        </span>

                        <button
                            disabled={pagination.page === pagination.totalPages}
                            onClick={handleNext}
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListTodoPage;

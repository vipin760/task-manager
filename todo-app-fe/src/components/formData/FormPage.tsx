import { Plus, Sparkles, X } from "lucide-react";
import type { IFormPageProps, TodoStatus } from "../../types/FormPage.types";
import { useEffect, useState } from "react";


const FormPage: React.FC<IFormPageProps> = ({ editingId, setEditingId, setFormData, handleClose, formData, handleSubmit, handleUpdate }) => {
    const [isClosing, setIsClosing] = useState(false);
    console.log("<><>setEditingId", setEditingId);

    // Handle graceful close with animation
    const closeForm = () => {
        setIsClosing(true);

        // Wait for animation to complete before removing from DOM
        setTimeout(() => {
            handleClose(false);
        }, 500); // Matches transition duration below
    };

    // Reset closing state if form reopens (e.g., editing another task)
    useEffect(() => {
        if (!handleClose) return; // safety
        setIsClosing(false);
    }, [editingId]);
    return (<>
        <div data-aos="zoom-in"
            data-aos-duration="600"
            data-aos-easing="ease-out-cubic"
            className={`
          mb-8 relative group
          transition-all duration-500 ease-out
          ${isClosing
                    ? 'opacity-0 scale-90 translate-y-8'
                    : 'opacity-100 scale-100 translate-y-0'
                }
        `}>
            <div className="absolute -inset-1 bg-linear-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-gray-900 bg-opacity-90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-500/20">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-[10%] h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                    <h2 className="w-[40%] text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-purple-400">
                        {editingId ? 'Edit Your Task' : 'Create New Task'}
                    </h2>
                    <div className="w-[50%] flex justify-end -translate-1">
                        <button
                            onClick={closeForm}
                            className=" bg-gray-900 p-2 rounded-full text-white hover:bg-gray-700"
                        >
                            <X />
                        </button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Task Header"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            //   onKeyPress={handleKeyPress}
                            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 text-lg"
                        />
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    </div>

                    <div className="relative">
                        <textarea
                            placeholder="Task Description (Optional)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            //   rows="4"
                            className="w-full px-6 py-4 bg-gray-800/50 border-2 border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 resize-none text-lg"
                        />
                    </div>
                    <div className="w-full sm:w-1/2">

                        <div className="relative">
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.value as TodoStatus,
                                    })
                                }
                                className="w-full appearance-none bg-gray-800 text-white rounded-xl px-4 py-3 pr-10 text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition">
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                            </select>

                            {/* Custom dropdown icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    <button
                        onClick={async (e) => {
                            if (editingId) {
                                await handleUpdate(e)
                            } else {
                                await handleSubmit(e);
                            }
                            closeForm()
                        }}
                        className="w-full bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                    >
                        <Plus className="w-6 h-6" />
                        {editingId ? 'Update Task' : 'Add Task'}
                    </button>

                </div>
            </div>
        </div>
    </>)
}

export default FormPage
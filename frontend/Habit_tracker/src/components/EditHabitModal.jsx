import { useState } from "react";
import api from "../services/api";

const EditHabitModal = ({ habit, onClose, onHabitUpdated }) => {

    const [name, setName] = useState(habit.name);
    const [description, setDescription] = useState(habit.description);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(`/user/habits/${habit._id}`, {
                name,
                description
            });

            console.log("Habit updated:", response.data);

            onHabitUpdated(response.data.habit);

            onClose();

        } catch (error) {
            console.error("Update habit error:", error);

            if (error.response) {
                console.log("Backend message:", error.response.data.message);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">
                        Edit Habit
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-2">
                            Habit Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>
           
        </div>
    );
};

export default EditHabitModal;
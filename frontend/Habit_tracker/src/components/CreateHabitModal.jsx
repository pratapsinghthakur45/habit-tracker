import { useState } from "react";
import api from "../services/api";

const CreateHabitModal = ({ onClose, onHabitCreated }) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Habit name is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/user/habit", {
                name,
                description
            });

            console.log("Habit created:", response.data);

            // Tell Dashboard that a new habit was created
            onHabitCreated();

            // Close modal
            onClose();

        } catch (error) {
            console.error("Create habit error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create habit"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">
                        Create Habit
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 text-xl"
                    >
                        ✕
                    </button>

                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                {/* Form */}
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
                            placeholder="e.g. Exercise"
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
                            placeholder="Describe your habit..."
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
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Habit"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateHabitModal;
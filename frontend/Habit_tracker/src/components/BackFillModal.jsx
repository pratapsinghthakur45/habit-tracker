import { useState } from "react";
import api from "../services/api";

const BackfillModal = ({ habit, onClose, onBackfill }) => {

    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const today = new Date().toLocaleDateString("en-CA");

    const habitCreatedDate = new Date(habit.createdAt)
        .toLocaleDateString("en-CA");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date) {
            setError("Please select a date");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                `/user/habits/${habit._id}/checkIn`,
                {
                    date
                }
            );

            console.log("Backfill successful:", response.data);

            onBackfill();

            onClose();

        } catch (error) {

            console.error("Backfill error:", error);

            if (error.response) {
                setError(
                    error.response.data.message ||
                    "Unable to backfill habit"
                );
            } else {
                setError("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-2xl font-bold mb-2">
                    Backfill Habit
                </h2>

                <p className="text-gray-600 mb-6">
                    Mark a previous day as completed.
                </p>

                <form onSubmit={handleSubmit}>

                    <label className="block font-medium mb-2">
                        Select Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        min={habitCreatedDate}
                        max={today}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">

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
                            {loading ? "Backfilling..." : "Backfill"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default BackfillModal;
//high
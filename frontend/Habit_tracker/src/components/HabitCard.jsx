import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import EditHabitModal from "./EditHabitModal";
import BackfillModal from "./BackFillModal";

const HabitCard = ({ habit, onHabitUpdated }) => {

    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [completedToday, setCompletedToday] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBackfillModal, setShowBackfillModal] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${habit.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/user/habits/${habit._id}`);

            console.log("Habit deleted successfully");

            onHabitUpdated();

        } catch (error) {
            console.error("Delete habit error:", error);

            if (error.response) {
                console.log(
                    "Backend message:",
                    error.response.data.message
                );
            }
        }
    };

    const fetchCheckIns = async () => {
        try {
            const response = await api.get(
                `/user/habits/${habit._id}/checkIn`
            );

            console.log("CHECK-IN DATA:", response.data);

            setCurrentStreak(response.data.currentStreak);
            setLongestStreak(response.data.longestStreak);

            const checkIns = response.data.checkIns;

            const today = new Date().toLocaleDateString("en-CA");

            const todayCheckIn = checkIns.some(
                (checkIn) => checkIn.localDate === today
            );

            setCompletedToday(todayCheckIn);

        } catch (error) {
            console.error("Error fetching check-ins:", error);
        }
    };

    useEffect(() => {
        fetchCheckIns();
    }, [habit._id]);

    const handleCheckIn = async () => {
        try {
            const today = new Date().toLocaleDateString("en-CA");

            await api.post(
                `/user/habits/${habit._id}/checkIn`,
                {
                    date: today
                }
            );

            // Get updated streak information
            await fetchCheckIns();

        } catch (error) {
            console.error("Check-in failed:", error);

            if (error.response) {
                console.log(
                    "Backend message:",
                    error.response.data.message
                );
            }
        }
    };

    return (
        <div className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200">

            {/* Habit Header */}
            <div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {habit.name}
                </h3>

                <p className="text-gray-500 mt-2 leading-relaxed">
                    {habit.description}
                </p>
            </div>


            {/* Streak Information */}
            <div className="mt-6 space-y-3">

                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-gray-600">
                        🔥 Current Streak
                    </span>

                    <span className="font-bold text-gray-900">
                        {currentStreak} days
                    </span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-gray-600">
                        🏆 Longest Streak
                    </span>

                    <span className="font-bold text-gray-900">
                        {longestStreak} days
                    </span>
                </div>

            </div>


            {/* Check In */}
            <div className="mt-6">

                {completedToday ? (
                    <button
                        disabled
                        className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium cursor-not-allowed"
                    >
                        ✓ Completed Today
                    </button>
                ) : (
                    <button
                        onClick={handleCheckIn}
                        className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition"
                    >
                        ✓ Check In
                    </button>
                )}

            </div>


            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">

                <Link
                    to={`/habits/${habit._id}`}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                    History
                </Link>

                <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                >
                    Delete
                </button>

                <button
                    onClick={() => setShowBackfillModal(true)}
                    className="flex items-center justify-center px-3 py-2 text-sm font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition"
                >
                    Backfill
                </button>

            </div>


            {/* Edit Modal */}
            {showEditModal && (
                <EditHabitModal
                    habit={habit}
                    onClose={() => setShowEditModal(false)}
                    onHabitUpdated={onHabitUpdated}
                />
            )}


            {/* Backfill Modal */}
            {showBackfillModal && (
                <BackfillModal
                    habit={habit}
                    onClose={() => setShowBackfillModal(false)}
                    onBackfill={fetchCheckIns}
                />
            )}

        </div>
    );
};

export default HabitCard;
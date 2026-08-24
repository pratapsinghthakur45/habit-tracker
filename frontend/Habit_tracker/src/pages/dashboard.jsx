import { useEffect, useState } from "react";
import api from "../services/api.js";
import HabitCard from "../components/HabitCard.jsx";
import CreateHabitModal from "../components/CreateHabitModal.jsx";

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchHabits = async () => {
        try {
            const response = await api.get("/user/habits");

            setHabits(response.data.habits);

        } catch (error) {
            console.error("Error fetching habits:", error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back 👋
                </h1>

                <p className="text-gray-600 mt-2 text-lg">
                    Build better habits, one day at a time.
                </p>
            </div>

            {/* Section Controls */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Your Habits
                </h2>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-blue-700 shadow-sm transition active:scale-95 flex items-center gap-2"
                >
                    <span>+</span> Create Habit
                </button>

                {showCreateModal && (
                    <CreateHabitModal
                        onClose={() => setShowCreateModal(false)}
                        onHabitCreated={fetchHabits}
                    />
                )}
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <p className="text-gray-500 font-medium animate-pulse">Loading habits...</p>
                </div>
            ) : habits.length === 0 ? (
                /* Single-action Empty State Card */
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center max-w-lg mx-auto my-6 shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🎯
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No habits tracked yet
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed">
                        You haven't added any habits to your routine. Click the button above to create your first habit!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            onHabitUpdated={fetchHabits}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default Dashboard;
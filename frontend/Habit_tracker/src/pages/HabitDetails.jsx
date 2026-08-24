import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const HabitDetails = () => {
    const { habitId } = useParams();

    const [habit, setHabit] = useState(null);
    const [checkIns, setCheckIns] = useState([]);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    const [loading, setLoading] = useState(true);

    const getLast30Days = () => {
        const days = [];

        for (let i = 0; i < 30; i++) {
            const date = new Date();

            date.setDate(date.getDate() - i);

            const localDate = date.toLocaleDateString("en-CA");

            days.push(localDate);
        }

        return days;
    };


    const last30Days = getLast30Days();

   

    useEffect(() => {
        const fetchHabitDetails = async () => {
            try {

                // Get habit
                const habitResponse = await api.get(
                    `/user/habits/${habitId}`
                );

                setHabit(habitResponse.data.habit);

                // Get check-ins + streaks
                const checkInResponse = await api.get(
                    `/user/habits/${habitId}/checkIn`
                );

                setCheckIns(checkInResponse.data.checkIns);

                setCurrentStreak(
                    checkInResponse.data.currentStreak
                );

                setLongestStreak(
                    checkInResponse.data.longestStreak
                );

            } catch (error) {

                console.error(
                    "Error fetching habit details:",
                    error
                );

            } finally {
                setLoading(false);
            }
        };

        fetchHabitDetails();

    }, [habitId]);


    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                <p>Loading habit...</p>
            </div>
        );
    }


    if (!habit) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                <p>Habit not found.</p>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto px-6 py-10">

            <Link
                to="/dashboard"
                className="text-blue-600 hover:underline"
            >
                ← Back to Dashboard
            </Link>


            <div className="mt-6">

                <h1 className="text-4xl font-bold">
                    {habit.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    {habit.description}
                </p>

            </div>


            {/* Streak Information */}

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="border rounded-xl p-6">
                    <p className="text-gray-500">
                        Current Streak
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        🔥 {currentStreak} days
                    </p>
                </div>


                <div className="border rounded-xl p-6">
                    <p className="text-gray-500">
                        Longest Streak
                    </p>

                    <p className="text-3xl font-bold mt-2">
                        🏆 {longestStreak} days
                    </p>
                </div>

            </div>


            {/* Check-in History */}

            <div className="space-y-3">

                {last30Days.map((date) => {

                    const isCompleted = checkIns.some(
                        (checkIn) => checkIn.localDate === date
                    );

                    return (
                        <div
                            key={date}
                            className="border rounded-lg px-4 py-3 flex justify-between"
                        >

                            <span>
                                {date}
                            </span>

                            {isCompleted ? (

                                <span className="text-green-600 font-medium">
                                    ✓ Completed
                                </span>

                            ) : (

                                <span className="text-red-500 font-medium">
                                    ✗ Missed
                                </span>

                            )}

                        </div>
                    );
                })}

            </div>

        </div>

        
    );
};

export default HabitDetails;
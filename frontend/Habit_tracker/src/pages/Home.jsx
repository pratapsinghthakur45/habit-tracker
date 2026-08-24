import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-72px)]">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">

                <h1 className="text-5xl font-bold text-gray-900">
                    Build Better Habits.
                </h1>

                <p className="text-xl text-gray-600 mt-5 max-w-2xl mx-auto">
                    Track your daily habits, build streaks, and stay
                    consistent with HabitFlow.
                </p>

                <div className="mt-8 flex justify-center gap-4">

                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/login"
                        className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Login
                    </Link>

                </div>

            </section>


            {/* Features */}
            <section className="bg-gray-50 py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-center">
                        Everything You Need to Build Better Habits
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mt-10">

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold">
                                🔥 Track Streaks
                            </h3>

                            <p className="text-gray-600 mt-3">
                                Build consistency and keep track of your
                                current and longest streaks.
                            </p>
                        </div>


                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold">
                                📅 Daily Check-ins
                            </h3>

                            <p className="text-gray-600 mt-3">
                                Check in every day and never lose track
                                of your progress.
                            </p>
                        </div>


                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold">
                                📊 Monitor Progress
                            </h3>

                            <p className="text-gray-600 mt-3">
                                Review your habit history and stay
                                motivated.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="py-16 text-center">

                <h2 className="text-3xl font-bold">
                    Ready to build better habits?
                </h2>

                <p className="text-gray-600 mt-3">
                    Start your journey with HabitFlow today.
                </p>

                <Link
                    to="/register"
                    className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Create Your Account
                </Link>

            </section>

        </div>
    );
};

export default Home;
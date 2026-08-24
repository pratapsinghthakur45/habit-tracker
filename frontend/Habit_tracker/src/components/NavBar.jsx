import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-slate-950 text-white border-b border-slate-800 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to={token ? "/dashboard" : "/"}
                    className="text-2xl font-bold tracking-tight hover:text-blue-400 transition duration-200"
                >
                    Habit<span className="text-blue-500">Flow</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3">

                    {!token ? (
                        <>
                            <Link
                                to="/register"
                                className="px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:text-white hover:bg-slate-800 transition duration-200"
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 text-sm font-semibold text-slate-300 border border-slate-700 rounded-lg hover:text-white hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition duration-200"
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};
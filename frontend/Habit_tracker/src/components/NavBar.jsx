import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <Link
                    to={token ? "/dashboard" : "/"}
                    className="text-2xl text-white font-bold"
                >
                    HabitFlow
                </Link>

                <div className="flex gap-6 items-center">

                    {!token ? (
                        <>
                            <Link
                                to="/register"
                                className="hover:text-blue-400"
                            >
                                Register
                            </Link>

                            <Link
                                to="/login"
                                className="hover:text-blue-400"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hover:text-red-400"
                        >
                            Logout
                        </button>
                    )}

                </div>
            </div>
        </nav>
    );
};
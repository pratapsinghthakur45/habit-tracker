import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl text-white font-bold">HabitFlow</Link>


                <div className="flex gap-6">
                    <Link to="/register" className="hover:text-blue-400">Register</Link>
                    <Link to="/login" className="hover:text-blue-400">Login</Link>
                </div>
            </div>
        </nav>
    )
}
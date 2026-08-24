// src/components/Navbar.jsx

import { Link } from "react-router-dom";
const Dashboard = () => {


    return (
        <Link
            to="/dashboard"
            className="hover:text-blue-400"
        >
            Dashboard
        </Link>
    );
};

export default Dashboard;
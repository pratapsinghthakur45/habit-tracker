import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/NavBar";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";

function App() {
    return (
        <>
            <BrowserRouter>

                <Navbar />

                <Routes>

                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/"
                        element={<h1>Home</h1>}
                    />

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </BrowserRouter>
        </>
    );
}

export default App;
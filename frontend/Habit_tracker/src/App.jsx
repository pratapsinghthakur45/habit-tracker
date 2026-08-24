import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/NavBar";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";
import HabitDetails from "./pages/HabitDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

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
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="/" element={ <PublicRoute> <Home /> </PublicRoute>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/habits/:habitId"
            element={<HabitDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
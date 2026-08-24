import React, { useState } from "react";
import "./Register.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    timezone: "Asia/Kolkata",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.post("/user/register", formData);

      console.log("Registration successful:", response.data);

      // Get JWT token from backend response
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      setMessage("Registration successful!");

      console.log("Token stored:", token);

      navigate("/dashboard");

    } catch (error) {
      console.log("Registration error:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Registration failed"
        );
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Timezone</label>

            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
            >
              <option value="Asia/Kolkata">
                Asia/Kolkata
              </option>

              <option value="America/New_York">
                America/New_York
              </option>

              <option value="Europe/London">
                Europe/London
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
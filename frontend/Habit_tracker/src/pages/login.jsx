import React, { useState } from "react";
import "./login.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      const response = await api.post("/user/login", formData);

      console.log("Login response:", response.data);

      // Get JWT token from backend response
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      setMessage("Login successful!");

      console.log("Token stored:", token);
      navigate('/dashboard');

    } catch (error) {
      console.log("Login error:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Login failed"
        );
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Login</h2>

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
              value={formData.formData ? formData.email : formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Login
          </button>
          
          <p className="auth-footer-text">
            Don't have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
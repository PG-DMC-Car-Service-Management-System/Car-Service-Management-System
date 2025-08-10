import React ,{ useState } from "react";
import axios from "../utils/axiosConfig"; // Your configured Axios instance
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import React from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/customers/login", { email, password });

      if (res.data && res.data.customer && res.data.customer.id) {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
        if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }  
       navigate("/"); // 
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);

      // Error handling
      if (err.response) {
        // Server responded with a status other than 2xx
        alert(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        // Request was made but no response
        alert("Server not responding. Check your internet connection.");
      } else {
        // Something else went wrong
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span role="img" aria-label="account" style={{ fontSize: "50px" }}>
            👤
          </span>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {/* Email Input */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div className="input-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <button type="button" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Register Link */}
        <div className="registration-link">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/registration")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

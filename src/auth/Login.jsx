import { useState, useContext } from "react";
import { loginUser } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const redirectBasedOnRole = (role) => {
    if (role === "ADMIN") navigate("/admin");
    else if (role === "RECRUITER_ADMIN") navigate("/recruiter-admin");
    else if (role === "RECRUITER") navigate("/recruiter");
    else navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      login(res.token);

      const decoded = jwtDecode(res.token);
      redirectBasedOnRole(decoded.role);
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex justify-center items-center font-sans px-4">

      <div className="lwd-card w-full max-w-md p-8 backdrop-blur-xl">

        {/* Title */}
        <h3 className="lwd-title text-center text-2xl mb-6">
          Login
        </h3>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-center p-3 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="lwd-label block mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="lwd-label block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full lwd-btn-primary disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <div className="mt-4 text-center text-sm lwd-text">
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
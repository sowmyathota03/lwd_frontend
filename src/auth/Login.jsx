import { useState } from "react";
import { loginUser } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const navigate = useNavigate();

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

      // Save token
      localStorage.setItem("token", res.token);

      // Decode token
      const decoded = jwtDecode(res.token);
      const role = decoded.role;

      redirectBasedOnRole(role);

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

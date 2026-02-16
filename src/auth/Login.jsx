import { useState, useContext } from "react";
import { loginUser } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useContext(AuthContext); // 🔥 use context
=======
  const { login } = useContext(AuthContext); // ✅ get login from context
>>>>>>> 46735d7 (Chetan's added more admin files)

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

<<<<<<< HEAD
      // 🔥 Use context login (this updates navbar immediately)
      login(res.token);

      // Decode token for role-based redirect
=======
      // ✅ Update context + localStorage
      login(res.token);

>>>>>>> 46735d7 (Chetan's added more admin files)
      const decoded = jwtDecode(res.token);
      redirectBasedOnRole(decoded.role);

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

          <div className="register-redirect mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <span
                className="register-link text-primary"
                style={{ cursor: "pointer" }}
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

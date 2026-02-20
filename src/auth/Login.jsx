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
    <div className="min-h-[80vh] bg-gradient-to-br from-sky-100 to-blue-50 flex justify-center items-center font-sans">
      
      <div className="w-full max-w-md p-10 rounded-2xl bg-white/75 backdrop-blur-xl shadow-2xl">

        <h3 className="text-center text-2xl font-semibold text-slate-900 mb-6">
          Login
        </h3>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm text-center p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-slate-700">Password</label>
            <input type="password" name="password" placeholder="Enter password" required onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-200 transition"/>
          </div>

          {/* Button */}
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-sky-400 to-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-70">
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Redirect */}
          <div className="mt-4 text-center text-sm">
            <p>Don't have an account?{" "}<span className="text-sky-500 cursor-pointer hover:underline"
                onClick={() => navigate("/register")}>
                Register here
              </span>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
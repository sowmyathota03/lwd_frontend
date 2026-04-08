import { useState, useContext } from "react";
import { loginUser } from "../api/AuthApi";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Clean input handler
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Role-based navigation
  const redirectBasedOnRole = (role) => {
    const routes = {
      ADMIN: "/admin",
      RECRUITER_ADMIN: "/recruiter-admin",
      RECRUITER: "/recruiter",
    };
    navigate(routes[role] || "/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      login(res.token);

      const { role } = jwtDecode(res.token);
      redirectBasedOnRole(role);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="lwd-card p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 mb-6">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
            <p className="lwd-text-muted">
              Securely access your LWD dashboard.
            </p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-6 p-3 rounded bg-red-100 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="lwd-label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  autoFocus
                  onChange={handleChange}
                  className="lwd-input pl-12 h-14"
                />
              </div>
            </div>

            {/* Password (FIXED 👇) */}
            <div>
              <div className="flex justify-between">
                <label className="lwd-label">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-600">
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                {/* Lock Icon */}
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                {/* Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                  className="lwd-input pl-12 pr-12 h-14"
                />

                {/* Eye Icon FIX */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? (
                    <Eye key="show" size={20} />
                  ) : (
                    <EyeOff key="hide" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 lwd-btn-primary flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-slate-500">
                New to the platform?{" "}
                <Link to="/register" className="text-blue-600 font-bold inline-flex items-center gap-1">
                  Create an account <ChevronRight size={16} />
                </Link>
              </p>
            </div>

          </form>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 flex justify-center gap-6 text-xs text-slate-400">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

      </motion.div>
    </div>
  );
}
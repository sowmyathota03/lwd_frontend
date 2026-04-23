import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerCompanyAdmin } from "../api/AuthApi";
import {
  ShieldCheck,
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiErrorMessage } from "../utils/errorUtils";

function RegisterCompanyAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Work email is required";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (!formData.contactNumber.trim()) return "Contact number is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        contactNumber: formData.contactNumber.trim(),
      };

      const response = await registerCompanyAdmin(payload);

      setSuccessMessage(
        "Registration successful! Please verify your email before logging in."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2200);
    } catch (error) {
      setError(getApiErrorMessage(error, "Registration failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="lwd-card-glass p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm ring-1 ring-indigo-500/20">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Create Company Admin Account
            </h1>
            <p className="lwd-text-muted">
              Secure employer registration with email verification.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div
                key="success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800/50 flex items-center gap-3 overflow-hidden"
              >
                <CheckCircle size={20} className="shrink-0" />
                <span className="text-sm font-bold tracking-wide">
                  {successMessage}
                </span>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-3 overflow-hidden"
              >
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-bold tracking-wide">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="lwd-label">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="lwd-label">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="lwd-label">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="lwd-label">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="lwd-label">Contact Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Official contact number"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-200 dark:border-slate-700 bg-indigo-50/70 dark:bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                After registration, verify your email first. Then login and
                complete your company profile for approval.
              </p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || !!successMessage}
                className="w-full h-12 lwd-btn-primary bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="font-black uppercase tracking-widest text-sm">
                  {loading ? "Registering..." : "Create Secure Account"}
                </span>
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                )}
              </button>
            </div>

            <div className="pt-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
                >
                  Login here
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterCompanyAdmin;
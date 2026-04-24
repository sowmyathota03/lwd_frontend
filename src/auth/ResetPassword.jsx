import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../api/AuthApi";
import {
  Lock,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiErrorMessage } from "../utils/errorUtils";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    token: token || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      setFormData((prev) => ({ ...prev, token }));
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword" && fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }

    if (error) setError("");
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { confirmPassword: "" };

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (formData.newPassword.length < 6) {
      errors.confirmPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await resetPassword({
        token: formData.token,
        newPassword: formData.newPassword,
      });

      setSuccessMessage(
        res || "Password reset successful. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const message = getApiErrorMessage(error, "Something went wrong. Please try again.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="lwd-card-glass p-8 md:p-10">
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6 shadow-sm ring-1 ring-blue-500/20">
              <Key size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Set New Password
            </h1>
            <p className="lwd-text-muted">
              Secure your account with a fresh password.
            </p>
          </div>

          {/* Feedback Sections */}
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

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="lwd-label">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Minimum 6 characters"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                  aria-invalid={!!fieldErrors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="lwd-label">Confirm New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat new password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50 ${fieldErrors.confirmPassword ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}`}
                  aria-invalid={!!fieldErrors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider pl-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 lwd-btn-primary flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="font-black uppercase tracking-widest text-sm">
                  {loading ? "Resetting..." : "Reset Password"}
                </span>
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                )}
              </button>
            </div>

            {/* Navigation Link */}
            <div className="pt-4 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 font-black text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs uppercase tracking-widest italic group"
              >
                <ChevronLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Return to Login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

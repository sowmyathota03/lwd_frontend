import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { changePassword } from "../api/PasswordApi";
import { 
  KeyRound, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Old Password
    if (!form.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    } else if (form.oldPassword.length < 6) {
      newErrors.oldPassword = "Minimum 6 characters required";
    }

    // New Password
    if (!form.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "Minimum 8 characters required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(form.newPassword)
    ) {
      newErrors.newPassword =
        "Must contain uppercase, lowercase and number";
    }

    return newErrors;
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // remove error on typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError(null);
    setSuccess(false);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await changePassword(form);

      setSuccess(true);
      setForm({
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    } catch (err) {
      setServerError(
        err.response?.data || "Failed to change password"
      );
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm ring-1 ring-indigo-500/20">
              <KeyRound size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Security Update
            </h1>
            <p className="lwd-text-muted">
              Ensure your account stays protected.
            </p>
          </div>

          {/* Feedback Sections */}
          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border border-green-100 dark:border-green-800/50 flex items-center gap-3 overflow-hidden"
              >
                <CheckCircle size={20} className="shrink-0" />
                <span className="text-sm font-bold tracking-wide">Password updated successfully!</span>
              </motion.div>
            )}

            {serverError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-3 overflow-hidden"
              >
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-bold tracking-wide">{serverError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Field */}
            <div className="space-y-2">
              <label className="lwd-label">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className={`lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50 ${errors.email ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider pl-1">{errors.email}</p>}
            </div>

            {/* Old Password Field */}
            <div className="space-y-2">
              <label className="lwd-label">Current Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className={`lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50 ${errors.oldPassword ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.oldPassword && <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider pl-1">{errors.oldPassword}</p>}
            </div>

            {/* New Password Field */}
            <div className="space-y-2">
              <label className="lwd-label">New Secure Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className={`lwd-input pl-11 pr-12 h-12 bg-indigo-50/50 dark:bg-indigo-900/10 ${errors.newPassword ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <p className="text-red-500 text-[11px] font-bold uppercase tracking-wider pl-1">{errors.newPassword}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 lwd-btn-primary flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="font-black uppercase tracking-widest text-sm">
                  {loading ? "Verifying..." : "Update Password"}
                </span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </div>

          </form>
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-8 text-center px-4 overflow-hidden">
          <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2 italic">
            Back to Dashboard
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
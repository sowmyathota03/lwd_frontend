import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../api/AuthApi";
import { 
  Mail, 
  Key, 
  ChevronLeft, 
  CheckCircle,
  AlertCircle,
  Send,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiErrorMessage } from "../utils/errorUtils";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (error) setError("");
    if (emailError) setEmailError(validateEmail(value));
  };

  const handleBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const res = await forgotPassword(email);
      setSuccessMessage(
        res || "Password reset email sent successfully. Check your inbox."
      );
      setEmail("");
      setEmailError("");
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Failed to send reset email. Please try again later.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lwd-page flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

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
              Reset Access
            </h1>
            <p className="lwd-text-muted px-4">
              Enter your email and we'll send you a recovery link.
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
                <span className="text-sm font-bold tracking-wide">{successMessage}</span>
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

            {/* Email Field */}
            <div className="space-y-2">
              <label className="lwd-label">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleBlur}
                  required
                  className={`lwd-input pl-12 h-14 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-900 shadow-sm ${emailError ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}`}
                />
              </div>
              {emailError && (
                <p className="text-red-600 text-[11px] font-bold uppercase tracking-wider pl-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {emailError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !!emailError}
                className="w-full h-14 lwd-btn-primary flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="text-lg font-black tracking-tight uppercase">
                  {loading ? "Sending..." : "Send Reset Link"}
                </span>
                {!loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </div>

            {/* Back to Login */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-1 font-black text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all group italic text-xs uppercase tracking-widest"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </button>
            </div>

          </form>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center text-slate-400 font-medium text-sm">
          Having trouble? <Link to="/contact" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Contact Support</Link>
        </div>

      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerJobSeeker } from "../api/AuthApi";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function RegisterJobSeeker() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await registerJobSeeker(formData);
      console.log("Job Seeker Registered:", response);

      setSuccessMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(error.response?.data || "Registration Failed");
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
              <User size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Join as Talent
            </h1>
            <p className="lwd-text-muted">
              Create your account to start your journey.
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

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name Field */}
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
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="lwd-label">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            {/* Password Field */}
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
                  onChange={handleChange}
                  className="lwd-input pl-11 pr-12 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Contact Field */}
            <div className="space-y-1">
              <label className="lwd-label">Contact Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Mobile number"
                  required
                  onChange={handleChange}
                  className="lwd-input pl-11 h-12 bg-slate-50/50 dark:bg-slate-950/50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || successMessage}
                className="w-full h-12 lwd-btn-primary flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                <span className="font-black uppercase tracking-widest text-sm">
                  {loading ? "Registering..." : "Create Account"}
                </span>
                {!loading && <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />}
              </button>
            </div>

            {/* Footer Links */}
            <div className="pt-4 text-center">
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
                >
                  Login here
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </p>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterJobSeeker;
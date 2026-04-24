import { useState, useContext } from "react";
import { loginUser, resendVerificationEmail } from "../api/AuthApi";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiErrorMessage } from "../utils/errorUtils";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const redirectBasedOnRole = (role) => {
    const routes = {
      ADMIN: "/admin",
      COMPANY_ADMIN: "/company",
      RECRUITER: "/recruiter",
      JOB_SEEKER: "/",
    };

    navigate(routes[role] || "/");
  };

  const getErrorMessage = (err) => {
    if (err?.code === "ERR_NETWORK") {
      return "Server is unavailable. Please try again later.";
    }

    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data?.details ||
      err?.response?.data ||
      err?.message ||
      "Something went wrong. Please try again."
    );
  };

  const isVerificationError = (message) => {
    const normalized = String(message || "").toLowerCase();
    return (
      normalized.includes("verify your email") ||
      normalized.includes("email before logging in") ||
      normalized.includes("email not verified") ||
      normalized.includes("email verification required")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setInfoMessage("");
    setShowVerifyButton(false);
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await loginUser(payload);

      if (!res?.accessToken || !res?.refreshToken) {
        throw new Error("Login response missing tokens");
      }

      login(res);
      redirectBasedOnRole(res.role);
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err);

      const message = getErrorMessage(err);
      setError(message);
      setShowVerifyButton(isVerificationError(message));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setInfoMessage("");

    const email = formData.email?.trim().toLowerCase();

    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      setResending(true);

      const res = await resendVerificationEmail({ email });

      setInfoMessage(
        res?.message ||
          res?.data ||
          res ||
          "Verification email sent successfully."
      );

      // Keep button hidden after successful resend
      setShowVerifyButton(false);
    } catch (err) {
      
      const message =
        getApiErrorMessage(err, "Failed to resend verification email.");

      setError(message);

      // show button again if resend itself returns a verification-related flow
      setShowVerifyButton(isVerificationError(message));
    } finally {
      setResending(false);
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-600 mb-6">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-3">Welcome back</h1>
            <p className="lwd-text-muted">
              Securely access your LWD dashboard.
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-100 text-red-600 text-sm space-y-3 overflow-hidden"
              >
                <p>{error}</p>

                {showVerifyButton && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={resending}
                      className="w-full lwd-btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <RefreshCw
                        size={16}
                        className={resending ? "animate-spin" : ""}
                      />
                      {resending
                        ? "Sending..."
                        : "Resend Verification Email"}
                    </button>

                    <p className="text-xs text-red-500">
                      Didn’t receive the email? Check spam or resend it.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {infoMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-xl bg-green-100 text-green-700 text-sm overflow-hidden"
              >
                {infoMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="lwd-label">Email Address</label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  className="lwd-input pl-12 h-14"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label className="lwd-label">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-600">
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="lwd-input pl-12 pr-12 h-14"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 lwd-btn-primary flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>

            <div className="text-center">
              <p className="text-slate-500">
                New to the platform?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-bold inline-flex items-center gap-1"
                >
                  Create an account <ChevronRight size={16} />
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-6 flex justify-center gap-6 text-xs text-slate-400">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </motion.div>
    </div>
  );
}
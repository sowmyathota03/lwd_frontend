import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { verifyEmail, resendVerificationEmail } from "../api/AuthApi";
import { CheckCircle, AlertCircle, Mail, RefreshCw } from "lucide-react";
import { getApiErrorMessage } from "../utils/errorUtils";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle"); // idle | success | error | resend-success
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      setLoading(false);
      return;
    }

    handleVerify();
  }, [token]);

  const handleVerify = async () => {
    try {
      setLoading(true);

      const res = await verifyEmail({ token });

      setStatus("success");
      setMessage(
        res?.message || res?.data || res || "Email verified successfully.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        getApiErrorMessage(error, "Invalid or expired verification link."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    try {
      setResending(true);

      const res = await resendVerificationEmail({
        email: email.trim().toLowerCase(),
      });

      setStatus("success");
      setMessage(
        res?.message || res?.data || res || "Verification email sent again.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Unable to resend verification email.",
      );
    } finally {
      setResending(false);
    }
  };

  const messageClass =
    status === "success"
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className="lwd-page flex items-center justify-center py-12 px-4">
      <div className="lwd-card max-w-md w-full text-center">
        <div className="mb-6">
          {status === "success" ? (
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
        </div>

        <h1 className="lwd-title text-2xl mb-3">Email Verification</h1>

        {loading ? (
          <p className="lwd-text">Verifying your email...</p>
        ) : (
          <>
            <p className={`lwd-text mb-5 ${messageClass}`}>{message}</p>

            {status === "success" && token ? (
              <Link to="/login" className="lwd-btn-primary inline-flex">
                Go to Login
              </Link>
            ) : (
              <form onSubmit={handleResend} className="space-y-3 text-left">
                <label className="lwd-label">Resend Verification Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lwd-input"
                />
                <button
                  type="submit"
                  disabled={resending}
                  className="lwd-btn-primary w-full flex items-center justify-center gap-2"
                >
                  <RefreshCw
                    size={16}
                    className={resending ? "animate-spin" : ""}
                  />
                  {resending ? "Sending..." : "Resend Verification Email"}
                </button>
              </form>
            )}

            {status === "error" && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 p-3 text-left">
                <AlertCircle className="w-4 h-4 mt-0.5 text-red-500" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  If your link expired, enter your email above to receive a new
                  one.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;

import { useState } from "react";
import { changePassword } from "../api/PasswordApi"; // adjust path

export default function ChangePassword() {
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="lwd-card max-w-md mx-auto p-10 rounded-2xl shadow-lg">

      <h2 className="lwd-title mb-4">Change Password</h2>

      {/* SUCCESS */}
      {success && (
        <p className="text-green-600 text-sm mb-3">
          Password changed successfully ✅
        </p>
      )}

      {/* SERVER ERROR */}
      {serverError && (
        <p className="text-red-600 text-sm mb-3">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* EMAIL */}
        <div>
          <label className="lwd-text">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* OLD PASSWORD */}
        <div>
          <label className="lwd-text">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.oldPassword}
            </p>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label className="lwd-text">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
            </div>
  );
}
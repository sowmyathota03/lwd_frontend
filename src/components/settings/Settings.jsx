
import { useState } from "react";
import ToggleDarkMode from "./common/ToggleDarkMode";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">

        <h1 className="text-2xl font-bold text-slate-800 mb-8">
          Account Settings
        </h1>

        {/* Appearance (Dark Mode) */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            Appearance
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Switch between light mode and dark mode.
          </p>

          <ToggleDarkMode />
        </div>

        {/* Profile Settings */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            Profile Settings
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Update your personal information and profile details.
          </p>

          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => (window.location.href = "/profile")}
          >
            Go to Profile
          </button>
        </div>

        {/* Change Password */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            Security
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Change your password to keep your account secure.
          </p>

          <button
            className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            onClick={() => (window.location.href = "/change-password")}
          >
            Change Password
          </button>
        </div>

        {/* Notification Settings */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Notifications
          </h2>

          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Email Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-700">Job Alerts</span>

            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={() => setJobAlerts(!jobAlerts)}
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            Privacy
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Manage visibility of your profile and personal information.
          </p>

          <button className="px-5 py-2 border rounded-md hover:bg-gray-100 transition">
            Manage Privacy
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;


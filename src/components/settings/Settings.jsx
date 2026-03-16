import { useState } from "react";
import ToggleDarkMode from "./common/ToggleDarkMode";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);

  return (
    <div className="lwd-page py-10">
      <div className="lwd-card max-w-4xl mx-auto p-8">

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-8">
          Account Settings
        </h1>

        {/* Appearance */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h2 className="lwd-title mb-3">Appearance</h2>

          <p className="lwd-text mb-4">
            Switch between light mode and dark mode.
          </p>

          <ToggleDarkMode />
        </section>

        {/* Profile Settings */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h2 className="lwd-title mb-3">Profile Settings</h2>

          <p className="lwd-text mb-4">
            Update your personal information and profile details.
          </p>

          <button
            className="lwd-btn-primary"
            onClick={() => (window.location.href = "/profile")}
          >
            Go to Profile
          </button>
        </section>

        {/* Security */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h2 className="lwd-title mb-3">Security</h2>

          <p className="lwd-text mb-4">
            Change your password to keep your account secure.
          </p>

          <button
            className="lwd-btn-secondary"
            onClick={() => (window.location.href = "/change-password")}
          >
            Change Password
          </button>
        </section>

        {/* Notifications */}
        <section className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h2 className="lwd-title mb-4">Notifications</h2>

          <div className="flex items-center justify-between mb-3">
            <span className="lwd-text">Email Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-blue-600 dark:accent-blue-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="lwd-text">Job Alerts</span>

            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={() => setJobAlerts(!jobAlerts)}
              className="w-5 h-5 accent-blue-600 dark:accent-blue-400"
            />
          </div>
        </section>

        {/* Privacy */}
        <section>
          <h2 className="lwd-title mb-3">Privacy</h2>

          <p className="lwd-text mb-4">
            Manage visibility of your profile and personal information.
          </p>

          <button className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition">
            Manage Privacy
          </button>
        </section>

      </div>
    </div>
  );
}

export default Settings;

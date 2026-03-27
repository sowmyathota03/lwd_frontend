import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleDarkMode from "./common/ToggleDarkMode";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="lwd-page py-10 px-4 sm:px-6">
      <div className="lwd-card max-w-5xl mx-auto p-6 sm:p-8 md:p-10">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="lwd-page-title mb-3">Account Settings</h1>
          <p className="lwd-text text-sm sm:text-base">
            Manage your account preferences, appearance, security, and notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Appearance */}
          <section className="lwd-subcard p-5 sm:p-6">
            <h2 className="lwd-section-title">Appearance</h2>
            <p className="lwd-text mb-5">
              Switch between light mode and dark mode for a better viewing experience.
            </p>

            <div className="flex items-center justify-between gap-4">
              <ToggleDarkMode />
            </div>
          </section>

          {/* Profile */}
          <section className="lwd-subcard p-5 sm:p-6">
            <h2 className="lwd-section-title">Profile Settings</h2>
            <p className="lwd-text mb-5">
              Update your personal details and keep your profile information current.
            </p>

            <button
              className="lwd-btn-primary"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>
          </section>

          {/* Security */}
          <section className="lwd-subcard p-5 sm:p-6">
            <h2 className="lwd-section-title">Security</h2>
            <p className="lwd-text mb-5">
              Change your password regularly to keep your account secure.
            </p>

            <button
              className="lwd-btn-secondary"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          </section>

          {/* Privacy */}
          <section className="lwd-subcard p-5 sm:p-6">
            <h2 className="lwd-section-title">Privacy</h2>
            <p className="lwd-text mb-5">
              Manage visibility of your profile and personal information.
            </p>

            <button
              className="lwd-btn-outline"
              onClick={() => navigate("/privacy")}
            >
              Manage Privacy
            </button>
          </section>
        </div>

        {/* Notifications */}
        <section className="lwd-subcard p-5 sm:p-6 mt-6">
          <h2 className="lwd-section-title mb-5">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Email Notifications
                </p>
                <p className="lwd-text">
                  Receive updates and important account activity by email.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors dark:bg-gray-600"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Job Alerts
                </p>
                <p className="lwd-text">
                  Get notified when new jobs match your preferences.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={jobAlerts}
                  onChange={() => setJobAlerts(!jobAlerts)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors dark:bg-gray-600"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
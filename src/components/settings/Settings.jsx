import { useState } from "react";
import ToggleDarkMode from "./common/ToggleDarkMode";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);

  return (
    <div className="lwd-page py-10">
      <div className="lwd-card max-w-4xl mx-auto p-8">

        {/* ===== Page Title ===== */}
        <h1 className="lwd-page-title mb-8">
          Account Settings
        </h1>

        {/* ===== Appearance ===== */}
        <section className="lwd-section">
          <h2 className="lwd-section-title">Appearance</h2>

          <p className="lwd-section-text">
            Switch between light mode and dark mode.
          </p>

          <ToggleDarkMode />
        </section>

        {/* ===== Profile Settings ===== */}
        <section className="lwd-section">
          <h2 className="lwd-section-title">Profile Settings</h2>

          <p className="lwd-section-text">
            Update your personal information and profile details.
          </p>

          <button
            className="lwd-btn-primary"
            onClick={() => (window.location.href = "/profile")}
          >
            Go to Profile
          </button>
        </section>

        {/* ===== Security ===== */}
        <section className="lwd-section">
          <h2 className="lwd-section-title">Security</h2>

          <p className="lwd-section-text">
            Change your password to keep your account secure.
          </p>

          <button
            className="lwd-btn-secondary"
            onClick={() => (window.location.href = "/change-password")}
          >
            Change Password
          </button>
        </section>

        {/* ===== Notifications ===== */}
        <section className="lwd-section">
          <h2 className="lwd-section-title mb-4">Notifications</h2>

          <div className="lwd-row-between mb-3">
            <span className="lwd-text">Email Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="lwd-checkbox"
            />
          </div>

          <div className="lwd-row-between">
            <span className="lwd-text">Job Alerts</span>

            <input
              type="checkbox"
              checked={jobAlerts}
              onChange={() => setJobAlerts(!jobAlerts)}
              className="lwd-checkbox"
            />
          </div>
        </section>

        {/* ===== Privacy ===== */}
        <section>
          <h2 className="lwd-section-title">Privacy</h2>

          <p className="lwd-section-text">
            Manage visibility of your profile and personal information.
          </p>

          <button className="lwd-btn-outline">
            Manage Privacy
          </button>
        </section>

      </div>
    </div>
  );
}

export default Settings;
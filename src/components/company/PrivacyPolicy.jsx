import React from "react";

function PrivacyPolicy() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#fdf2f8",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        lineHeight: "1.7"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Privacy Policy
      </h1>

      <p>
        Welcome to <strong>LWD (Learn With Dreams)</strong>. Your privacy is
        important to us. This Privacy Policy explains how we collect, use,
        and protect your information when you use our website.
      </p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Name, Email, Phone Number</li>
        <li>Resume and Profile Details</li>
        <li>Job Preferences and Skills</li>
        <li>Usage Data (pages visited, searches)</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <ul>
        <li>To provide job search services</li>
        <li>To connect candidates with employers</li>
        <li>To improve website performance</li>
        <li>To send job alerts and updates</li>
      </ul>

      <h3>Data Security</h3>
      <p>
        We take reasonable security measures to protect your personal
        information from unauthorized access, misuse, or disclosure.
      </p>

      <h3>Sharing Information</h3>
      <p>
        We do not sell your personal data. Information may only be shared
        with trusted employers or partners for recruitment purposes.
      </p>

      <h3>Cookies</h3>
      <p>
        Our website may use cookies to enhance user experience and analyze
        traffic.
      </p>

      <h3>Your Rights</h3>
      <ul>
        <li>You can update or delete your profile anytime.</li>
        <li>You can unsubscribe from email notifications.</li>
      </ul>

      <p style={{ marginTop: "20px" }}>
        By using LWD, you agree to this Privacy Policy.
      </p>

      <p>
        <strong>Last Updated:</strong> 2026
      </p>
    </div>
  );
}

export default PrivacyPolicy;

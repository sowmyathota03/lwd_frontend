import React from "react";

function TermsAndConditions() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        lineHeight: "1.7"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Terms & Conditions
      </h1>

      <p>
        Welcome to <strong>LWD (Learn With Dreams)</strong>. By accessing or
        using our website, you agree to comply with the following Terms and
        Conditions.
      </p>

      <h3>Use of Website</h3>
      <ul>
        <li>You must provide accurate and updated information.</li>
        <li>You agree not to misuse the platform for illegal activities.</li>
        <li>Fake profiles or job postings are strictly prohibited.</li>
      </ul>

      <h3>User Accounts</h3>
      <ul>
        <li>You are responsible for maintaining account confidentiality.</li>
        <li>We reserve the right to suspend suspicious accounts.</li>
      </ul>

      <h3>Job Listings</h3>
      <p>
        LWD acts as a platform connecting job seekers and employers. We do
        not guarantee job placement or hiring decisions.
      </p>

      <h3>Intellectual Property</h3>
      <p>
        All content, logos, and design elements of LWD are owned by the
        platform and cannot be copied without permission.
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        LWD is not responsible for any loss, damages, or disputes between
        employers and job seekers.
      </p>

      <h3>Changes to Terms</h3>
      <p>
        We may update these Terms at any time. Continued use of the website
        means you accept the updated terms.
      </p>

      <p style={{ marginTop: "20px" }}>
        <strong>Last Updated:</strong> 2026
      </p>
    </div>
  );
}

export default TermsAndConditions;

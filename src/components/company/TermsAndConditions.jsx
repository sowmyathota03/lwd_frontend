import React from "react";

function TermsAndConditions() {
  return (
    <div className="lwd-page flex justify-center px-4 py-10">

      <div className="lwd-card max-w-4xl w-full p-6 space-y-6">

        {/* Title */}
        <h1 className="lwd-title text-center text-2xl">
          Terms & Conditions
        </h1>

        {/* Intro */}
        <p className="lwd-text">
          Welcome to <strong>LWD (Learn With Dreams)</strong>. By accessing or
          using our website, you agree to comply with the following Terms and
          Conditions.
        </p>

        {/* Use of Website */}
        <div>
          <h3 className="lwd-title mb-2">Use of Website</h3>
          <ul className="list-disc pl-5 space-y-1 lwd-text">
            <li>You must provide accurate and updated information.</li>
            <li>You agree not to misuse the platform for illegal activities.</li>
            <li>Fake profiles or job postings are strictly prohibited.</li>
          </ul>
        </div>

        {/* User Accounts */}
        <div>
          <h3 className="lwd-title mb-2">User Accounts</h3>
          <ul className="list-disc pl-5 space-y-1 lwd-text">
            <li>You are responsible for maintaining account confidentiality.</li>
            <li>We reserve the right to suspend suspicious accounts.</li>
          </ul>
        </div>

        {/* Job Listings */}
        <div>
          <h3 className="lwd-title mb-2">Job Listings</h3>
          <p className="lwd-text">
            LWD acts as a platform connecting job seekers and employers. We do
            not guarantee job placement or hiring decisions.
          </p>
        </div>

        {/* Intellectual Property */}
        <div>
          <h3 className="lwd-title mb-2">Intellectual Property</h3>
          <p className="lwd-text">
            All content, logos, and design elements of LWD are owned by the
            platform and cannot be copied without permission.
          </p>
        </div>

        {/* Liability */}
        <div>
          <h3 className="lwd-title mb-2">Limitation of Liability</h3>
          <p className="lwd-text">
            LWD is not responsible for any loss, damages, or disputes between
            employers and job seekers.
          </p>
        </div>

        {/* Changes */}
        <div>
          <h3 className="lwd-title mb-2">Changes to Terms</h3>
          <p className="lwd-text">
            We may update these Terms at any time. Continued use of the website
            means you accept the updated terms.
          </p>
        </div>

        {/* Footer */}
        <p className="lwd-text pt-4 border-t">
          <strong>Last Updated:</strong> 2026
        </p>

      </div>
    </div>
  );
}

export default TermsAndConditions;
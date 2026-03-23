import React from "react";

function PrivacyPolicy() {
  return (
    <div className="lwd-page px-4 py-10 flex justify-center">

      <div className="lwd-card max-w-4xl w-full p-8 space-y-6 leading-relaxed">

        {/* Title */}
        <h1 className="lwd-title text-2xl text-center">
          Privacy Policy
        </h1>

        <p className="lwd-text">
          Welcome to <strong>LWD (Learn With Dreams)</strong>. Your privacy is
          important to us. This Privacy Policy explains how we collect, use,
          and protect your information when you use our website.
        </p>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">Information We Collect</h3>
          <ul className="list-disc pl-5 space-y-1 lwd-text">
            <li>Name, Email, Phone Number</li>
            <li>Resume and Profile Details</li>
            <li>Job Preferences and Skills</li>
            <li>Usage Data (pages visited, searches)</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">How We Use Your Information</h3>
          <ul className="list-disc pl-5 space-y-1 lwd-text">
            <li>To provide job search services</li>
            <li>To connect candidates with employers</li>
            <li>To improve website performance</li>
            <li>To send job alerts and updates</li>
          </ul>
        </div>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">Data Security</h3>
          <p className="lwd-text">
            We take reasonable security measures to protect your personal
            information from unauthorized access, misuse, or disclosure.
          </p>
        </div>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">Sharing Information</h3>
          <p className="lwd-text">
            We do not sell your personal data. Information may only be shared
            with trusted employers or partners for recruitment purposes.
          </p>
        </div>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">Cookies</h3>
          <p className="lwd-text">
            Our website may use cookies to enhance user experience and analyze
            traffic.
          </p>
        </div>

        {/* Section */}
        <div>
          <h3 className="lwd-title text-lg mb-2">Your Rights</h3>
          <ul className="list-disc pl-5 space-y-1 lwd-text">
            <li>You can update or delete your profile anytime.</li>
            <li>You can unsubscribe from email notifications.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4 space-y-2">
          <p className="lwd-text">
            By using LWD, you agree to this Privacy Policy.
          </p>

          <p className="lwd-text">
            <strong>Last Updated:</strong> 2026
          </p>
        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicy;
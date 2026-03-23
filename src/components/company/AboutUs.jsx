import React from "react";

function AboutUs() {
  return (
    <div className="lwd-page py-10">
      <div className="lwd-container max-w-4xl">

        <div className="lwd-card">

          {/* Title */}
          <h1 className="lwd-heading text-center mb-6">
            About LWD
          </h1>

          {/* Content */}
          <p className="lwd-text mb-4 leading-relaxed">
            <strong>LWD (Learn With Dreams)</strong> is an online job portal
            designed to help job seekers find the right opportunities and
            employers hire the best talent. Our platform connects thousands of
            candidates with top companies across different industries.
          </p>

          <p className="lwd-text mb-6 leading-relaxed">
            We aim to simplify the job search process by providing verified job
            listings, easy applications, and career guidance. Whether you are a
            fresher or an experienced professional, LWD helps you build a
            successful career.
          </p>

          {/* Mission */}
          <h3 className="lwd-title mb-2">Our Mission</h3>
          <p className="lwd-text mb-6">
            Our mission is to bridge the gap between talent and opportunity by
            creating a reliable and user-friendly job platform.
          </p>

          {/* Why Choose */}
          <h3 className="lwd-title mb-3">Why Choose LWD?</h3>
          <ul className="list-disc list-inside space-y-2 lwd-text">
            <li>Verified Job Listings</li>
            <li>Easy Job Applications</li>
            <li>Trusted Employers</li>
            <li>Career Support & Guidance</li>
            <li>User Friendly Interface</li>
          </ul>

          {/* Footer line */}
          <p className="mt-6 text-center text-gray-700 dark:text-gray-300 font-medium">
            At LWD, we believe everyone deserves the chance to achieve their
            dream career. 🚀
          </p>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;
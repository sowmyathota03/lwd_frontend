import React from "react";

function AboutUs() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#fff0f5",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        lineHeight: "1.6"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        About LWD
      </h1>

      <p>
        <strong>LWD (Learn With Dreams)</strong> is an online job portal
        designed to help job seekers find the right opportunities and
        employers hire the best talent. Our platform connects thousands of
        candidates with top companies across different industries.
      </p>

      <p>
        We aim to simplify the job search process by providing verified job
        listings, easy applications, and career guidance. Whether you are a
        fresher or an experienced professional, LWD helps you build a
        successful career.
      </p>

      <h3>Our Mission</h3>
      <p>
        Our mission is to bridge the gap between talent and opportunity by
        creating a reliable and user-friendly job platform.
      </p>

      <h3>Why Choose LWD?</h3>
      <ul>
        <li>Verified Job Listings</li>
        <li>Easy Job Applications</li>
        <li>Trusted Employers</li>
        <li>Career Support & Guidance</li>
        <li>User Friendly Interface</li>
      </ul>

      <p style={{ marginTop: "20px" }}>
        At LWD, we believe everyone deserves the chance to achieve their
        dream career. 🚀
      </p>
    </div>
  );
}

export default AboutUs;

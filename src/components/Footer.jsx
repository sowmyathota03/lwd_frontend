import React from "react";

function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-container">

        
        <div className="footer-section">
          <h3>LWD</h3>
          <p>
            LWD is a job portal connecting job seekers with top companies
            across India.
          </p>
        </div>

        
        <div className="footer-section">
          <h4>For Job Seekers</h4>
          <ul>
            <li><a href="/">Search Jobs</a></li>
            <li><a href="/">Upload Resume</a></li>
            <li><a href="/">Job Alerts</a></li>
            <li><a href="/">Career Advice</a></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>For Employers</h4>
          <ul>
            <li><a href="/">Post a Job</a></li>
            <li><a href="/">Search Resumes</a></li>
            <li><a href="/">Employer Login</a></li>
            <li><a href="/">Pricing</a></li>
          </ul>
        </div>

        
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms & Conditions</a></li>
          </ul>
        </div>

      </div>

      
      <div className="footer-bottom">
        © {new Date().getFullYear()} LWD. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;

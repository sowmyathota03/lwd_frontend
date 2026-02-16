import React from "react";
import { Link } from "react-router-dom";

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
            <li><Link to="/JobSearchBlock">Search Jobs</Link></li>
            <li><Link to="/ResumeUpload">Upload Resume</Link></li>
            <li><Link to="/JobAlert">Job Alerts</Link></li>
            <li><Link to="/CareerAdvice">Career Advice</Link></li>
          </ul>
        </div>
         <div className="footer-section">
          <h4>For Employers</h4>
          <ul>
            <li><Link to="/PostJob">Post a Job</Link></li>
            <li><Link to="/SearchResumes">Search Resumes</Link></li>
            <li><Link to="/login">Recruiter Login</Link></li>
            <li><Link to="/Pricing">Pricing</Link></li>
          </ul>
        </div>
         <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/AboutUs">About Us</Link></li>
            <li><Link to="/ContactUs">Contact Us</Link></li>
            <li><Link to="/PrivacyPolicy">Privacy Policy</Link></li>
            <li><Link to="/TermsAndConditions">Terms & Conditions</Link></li>
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

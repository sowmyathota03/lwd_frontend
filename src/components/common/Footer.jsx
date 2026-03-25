import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 px-4 sm:px-6 py-10 sm:py-12">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left">

        {/* Brand */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-3">
            LWD
          </h3>

          <p className="lwd-text max-w-xs mx-auto sm:mx-0">
            LWD is a job portal connecting job seekers with top companies
            across India.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h4 className="lwd-title text-base sm:text-lg mb-4">
            For Job Seekers
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/JobSearchBlock" className="lwd-link">
                Search Jobs
              </Link>
            </li>
            <li>
              <Link to="/ResumeUpload" className="lwd-link">
                Upload Resume
              </Link>
            </li>
            <li>
              <Link to="/JobAlert" className="lwd-link">
                Job Alerts
              </Link>
            </li>
            <li>
              <Link to="/CareerAdvice" className="lwd-link">
                Career Advice
              </Link>
            </li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h4 className="lwd-title text-base sm:text-lg mb-4">
            For Employers
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/PostJob" className="lwd-link">
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/SearchResumes" className="lwd-link">
                Search Resumes
              </Link>
            </li>
            <li>
              <Link to="/login" className="lwd-link">
                Recruiter Login
              </Link>
            </li>
            <li>
              <Link to="/Pricing" className="lwd-link">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="lwd-title text-base sm:text-lg mb-4">
            Company
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/AboutUs" className="lwd-link">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="lwd-link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="lwd-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/TermsAndConditions" className="lwd-link">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-xs sm:text-sm lwd-text">
        © {new Date().getFullYear()} LWD. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#010711] text-white px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left">

        {/* Brand Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-3">
            LWD
          </h3>
          <p className="text-sm leading-relaxed text-gray-300 max-w-xs mx-auto sm:mx-0">
            LWD is a job portal connecting job seekers with top companies
            across India.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            For Job Seekers
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/JobSearchBlock" className="hover:text-white transition">
                Search Jobs
              </Link>
            </li>
            <li>
              <Link to="/ResumeUpload" className="hover:text-white transition">
                Upload Resume
              </Link>
            </li>
            <li>
              <Link to="/JobAlert" className="hover:text-white transition">
                Job Alerts
              </Link>
            </li>
            <li>
              <Link to="/CareerAdvice" className="hover:text-white transition">
                Career Advice
              </Link>
            </li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            For Employers
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/PostJob" className="hover:text-white transition">
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/SearchResumes" className="hover:text-white transition">
                Search Resumes
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Recruiter Login
              </Link>
            </li>
            <li>
              <Link to="/Pricing" className="hover:text-white transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/AboutUs" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/TermsAndConditions" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} LWD. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;

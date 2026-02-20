import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#010711] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl font-bold text-red-500 mb-3">LWD</h3>
          <p className="text-sm leading-relaxed text-gray-300">
            LWD is a job portal connecting job seekers with top companies
            across India.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <h4 className="text-lg font-semibold mb-4">For Job Seekers</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/JobSearchBlock" className="hover:underline hover:text-gray-300">
                Search Jobs
              </Link>
            </li>
            <li>
              <Link to="/ResumeUpload" className="hover:underline hover:text-gray-300">
                Upload Resume
              </Link>
            </li>
            <li>
              <Link to="/JobAlert" className="hover:underline hover:text-gray-300">
                Job Alerts
              </Link>
            </li>
            <li>
              <Link to="/CareerAdvice" className="hover:underline hover:text-gray-300">
                Career Advice
              </Link>
            </li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h4 className="text-lg font-semibold mb-4">For Employers</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/PostJob" className="hover:underline hover:text-gray-300">
                Post a Job
              </Link>
            </li>
            <li>
              <Link to="/SearchResumes" className="hover:underline hover:text-gray-300">
                Search Resumes
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline hover:text-gray-300">
                Recruiter Login
              </Link>
            </li>
            <li>
              <Link to="/Pricing" className="hover:underline hover:text-gray-300">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/AboutUs" className="hover:underline hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/ContactUs" className="hover:underline hover:text-gray-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/PrivacyPolicy" className="hover:underline hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/TermsAndConditions" className="hover:underline hover:text-gray-300">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} LWD. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;

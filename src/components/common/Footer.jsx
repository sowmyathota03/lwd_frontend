import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="lwd-footer">
      <div className="lwd-container px-4 sm:px-6 py-12">

        <div className="lwd-footer-grid">

          {/* Brand */}
          <div className="lwd-footer-brand">
            <h3 className="lwd-footer-logo">LWD</h3>
            <p className="lwd-footer-description">
              LWD is a modern job portal connecting job seekers with top
              companies across India and helping employers find the right talent.
            </p>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="lwd-footer-heading">For Job Seekers</h4>
            <ul className="lwd-footer-list">
              <li><Link to="/JobSearchBlock" className="lwd-footer-link">Search Jobs</Link></li>
              <li><Link to="/ResumeUpload" className="lwd-footer-link">Upload Resume</Link></li>
              <li><Link to="/JobAlert" className="lwd-footer-link">Job Alerts</Link></li>
              <li><Link to="/CareerAdvice" className="lwd-footer-link">Career Advice</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="lwd-footer-heading">For Employers</h4>
            <ul className="lwd-footer-list">
              <li><Link to="/PostJob" className="lwd-footer-link">Post a Job</Link></li>
              <li><Link to="/SearchResumes" className="lwd-footer-link">Search Resumes</Link></li>
              <li><Link to="/login" className="lwd-footer-link">Recruiter Login</Link></li>
              <li><Link to="/Pricing" className="lwd-footer-link">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="lwd-footer-heading">Company</h4>
            <ul className="lwd-footer-list">
              <li><Link to="/AboutUs" className="lwd-footer-link">About Us</Link></li>
              <li><Link to="/ContactUs" className="lwd-footer-link">Contact Us</Link></li>
              <li><Link to="/PrivacyPolicy" className="lwd-footer-link">Privacy Policy</Link></li>
              <li><Link to="/TermsAndConditions" className="lwd-footer-link">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="lwd-footer-bottom mt-10 text-center">
          <p>© {new Date().getFullYear()} LWD. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
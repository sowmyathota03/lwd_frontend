import { useNavigate } from "react-router-dom";
import "./AuthSelection.css"; // optional styling

function AuthSelection() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h2>Join Our Platform</h2>

      <div className="auth-options">
        {/* Job Seeker Card */}
        <div
          className="auth-card"
          onClick={() => navigate("/register/jobseeker")}
        >
          <h3>Register as Job Seeker</h3>
          <p>Find your dream job and apply easily.</p>
        </div>

        {/* Recruiter Card */}
        <div
          className="auth-card"
          onClick={() => navigate("/register/recruiter")}
        >
          <h3>Register as Recruiter</h3>
          <p>Post jobs and hire the best talent.</p>
        </div>
      </div>
    </div>
  );
}

export default AuthSelection;

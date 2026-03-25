import { useNavigate } from "react-router-dom";

function AuthSelection() {
  const navigate = useNavigate();

  return (
    <div className="lwd-page flex flex-col items-center justify-center px-5">

      {/* Title */}
      <h2 className="lwd-title text-3xl mb-10 text-center">
        Join Our Platform
      </h2>

      {/* Cards Wrapper */}
      <div className="flex gap-10 flex-wrap justify-center max-md:flex-col max-md:gap-6">

        {/* Job Seeker Card */}
        <div
          onClick={() => navigate("/register/jobseeker")}
          className="lwd-card lwd-card-hover w-80 p-10 text-center cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
            Register as Job Seeker
          </h3>

          <p className="lwd-text leading-relaxed">
            Find your dream job and apply easily.
          </p>
        </div>

        {/* Recruiter Card */}
        <div
          onClick={() => navigate("/register/recruiter")}
          className="lwd-card lwd-card-hover w-80 p-10 text-center cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
            Register as Recruiter
          </h3>

          <p className="lwd-text leading-relaxed">
            Post jobs and hire the best talent.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AuthSelection;
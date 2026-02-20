import { useNavigate } from "react-router-dom";

function AuthSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-sky-100 to-blue-50 flex flex-col items-center justify-center font-sans px-5">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-slate-800 mb-10">
        Join Our Platform
      </h2>

      {/* Cards Wrapper */}
      <div className="flex gap-10 flex-wrap justify-center max-md:flex-col max-md:gap-6">

        {/* Job Seeker Card */}
        <div
          onClick={() => navigate("/register/jobseeker")}
          className="w-80 p-10 rounded-2xl bg-white/70 backdrop-blur-lg text-center cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-900">
            Register as Job Seeker
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Find your dream job and apply easily.
          </p>
        </div>

        {/* Recruiter Card */}
        <div
          onClick={() => navigate("/register/recruiter")}
          className="w-80 p-10 rounded-2xl bg-white/70 backdrop-blur-lg text-center cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-slate-900">
            Register as Recruiter
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Post jobs and hire the best talent.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AuthSelection;
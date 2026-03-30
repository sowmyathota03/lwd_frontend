import { useNavigate } from "react-router-dom";

function Career() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Immediate Joiner Jobs",
      desc: "Jobs for candidates who can join within 0–15 days.",
      query: "?noticePreference=IMMEDIATE_JOINER",
    },
    {
      title: "Notice Period Friendly Jobs",
      desc: "Companies accepting candidates with notice period.",
      query: "?noticePreference=SERVING_NOTICE",
    },
    {
      title: "Remote Jobs",
      desc: "Work from anywhere opportunities.",
      query: "?jobType=REMOTE",
    },
    {
      title: "Internships",
      desc: "Opportunities for students and freshers.",
      query: "?minExp=0&maxExp=1",
    },
    {
      title: "Startup Jobs",
      desc: "Fast growing startup company openings.",
      query: "?industry=startup",
    },
    {
      title: "Experienced Professionals",
      desc: "Roles for professionals with 3+ years experience.",
      query: "?minExp=3",
    },
  ];

  const lwdJobs = [
    { title: "Immediate Joiners", query: "?noticePreference=IMMEDIATE_JOINER" },
    { title: "15 Days Joiners", query: "?noticePreference=15_DAYS" },
    { title: "30 Days Notice Period", query: "?noticePreference=30_DAYS" },
    { title: "60 Days Notice Period", query: "?noticePreference=60_DAYS" },
  ];

  const roles = [
    "Java Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "DevOps Engineer",
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-16 px-6 font-sans transition-colors duration-300">
      
      {/* HERO */}
      <section className="text-center max-w-4xl mx-auto mb-20 mt-8">
        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-semibold mb-6 tracking-wide uppercase shadow-sm">
          Career Hub
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
          Find the Right Career <br className="hidden md:block"/> Opportunity <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Faster</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Discover jobs based on your skills, experience, and Last Working Day (LWD). 
          Our platform helps you connect with employers who are ready to hire fast.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="mt-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Job Categories</h2>
          <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700/60 shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 group"
              onClick={() => navigate(`/jobs${item.query}`)}
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LWD SECTION */}
      <section className="mt-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Jobs by Last Working Day</h2>
          <div className="w-16 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {lwdJobs.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(`/jobs${item.query}`)}
              className="bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-800/50 dark:text-indigo-300 dark:hover:bg-indigo-600 dark:hover:text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 text-center w-full"
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mt-24 max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-xl text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose LWD</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">We streamline the hiring process for immediate impact.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              title: "Faster Hiring",
              desc: "Find companies that need candidates immediately.",
              icon: "⚡",
            },
            {
              title: "One-Click Apply",
              desc: "Apply instantly using your saved profile.",
              icon: "👆",
            },
            {
              title: "Smart Job Matching",
              desc: "AI suggests jobs based on your skills.",
              icon: "🧠",
            },
            {
              title: "Transparent Hiring",
              desc: "Clear joining timelines and hiring stages.",
              icon: "🔍",
            },
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex gap-5 hover:bg-white/20 transition-colors duration-300">
              <div className="text-4xl">{item.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-blue-50 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER ADVICE */}
      <section className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Career Advice</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/60 p-8 md:p-10">
          <ul className="text-left md:text-center space-y-4 inline-block">
            {[
              "Keep your resume updated with recent achievements.",
              "Complete your detailed profile for better visibility.",
              "Apply selectively to jobs matching your exact skills.",
              "Set smart job alerts to catch fast opportunities immediately."
            ].map((advice, idx) => (
              <li key={idx} className="flex items-center md:justify-center text-slate-600 dark:text-slate-300 font-medium">
                <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                {advice}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ROLES */}
      <section className="mt-24 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">Popular Job Roles</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => navigate(`/jobs?keyword=${encodeURIComponent(role)}`)}
              className="bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-600/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:border-slate-500 px-6 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm"
            >
              {role}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-28 text-center pb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          Start Your Career Journey Today
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto">
          Create your profile securely and start applying to companies waiting for your skills.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6">
          <button
            onClick={() => navigate("/jobs")}
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 font-bold rounded-xl shadow-sm transition-colors duration-200"
          >
            Browse Jobs
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Create Free Profile
          </button>
        </div>
      </section>
      
    </div>
  );
}

export default Career;
import { useNavigate } from "react-router-dom";

function Career() {
  const navigate = useNavigate();

  const careerPaths = [
    {
      id: 1,
      title: "Immediate Joiner Jobs",
      desc: "Jobs for candidates who can join within 0–15 days.",
      query: "?noticePreference=IMMEDIATE_JOINER",
    },
    {
      id: 2,
      title: "Notice Period Friendly Jobs",
      desc: "Companies accepting 30–90 day notice period candidates.",
      query: "?noticePreference=SERVING_NOTICE",
    },
    {
      id: 3,
      title: "Bench Candidate Hiring",
      desc: "Special openings for employees currently on bench.",
      query: "?lwdPreferred=true",
    },
    {
      id: 4,
      title: "Skill Upgrade Opportunities",
      desc: "Roles that allow learning React, Java, and Full Stack.",
      query: "?industry=software",
    },
    {
      id: 5,
      title: "Freshers & Internships",
      desc: "Entry-level jobs and internships for graduates.",
      query: "?minExp=0&maxExp=1",
    },
    {
      id: 6,
      title: "Remote & Contract Jobs",
      desc: "Work-from-home and short-term contract roles.",
      query: "?jobType=REMOTE",
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 md:py-10 min-h-screen bg-gray-50 text-slate-900">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-700">
        LWD Careers
      </h1>

      <p className="text-center max-w-3xl mx-auto mt-3 mb-8 md:mb-10 text-sm sm:text-base text-gray-600 leading-relaxed">
        LWD (Last Working Day) portal helps bench and notice-period candidates
        find quick and relevant job opportunities based on skills,
        availability, and last working day timeline.
      </p>

      {/* WHY LWD */}
      <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-10 md:mb-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-4">
          Why Use LWD Career Portal?
        </h2>

        <ul className="space-y-2 text-sm sm:text-base text-gray-600">
          <li>✔ Jobs for Immediate Joiners</li>
          <li>✔ Notice Period Friendly Companies</li>
          <li>✔ Bench Employee Opportunities</li>
          <li>✔ Quick Apply & Faster Hiring</li>
          <li>✔ Resume & Career Support Tools</li>
        </ul>
      </section>

      {/* CAREER PATHS */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-blue-600">
          Explore Opportunities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mt-6 md:mt-8">
          {careerPaths.map((career) => (
            <div
              key={career.id}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <h3 className="text-base sm:text-lg font-semibold text-blue-700">
                {career.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                {career.desc}
              </p>

              <button
                onClick={() => navigate(`/jobs${career.query}`)}
                className="w-full sm:w-auto mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="mt-14 md:mt-16 bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-4">
          Career Support Tools
        </h2>

        <ul className="space-y-2 text-sm sm:text-base text-gray-600">
          <li>📄 Resume Building Tips</li>
          <li>🧮 Last Working Day Calculator</li>
          <li>🎯 Interview Preparation Guides</li>
          <li>📢 Immediate Job Alerts</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center mt-14 md:mt-16">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700">
          Restart Your Career Faster
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Create your profile and apply for jobs aligned with your LWD.
        </p>

        <button
          onClick={() => navigate("/profile")}
          className="w-full sm:w-auto mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base sm:text-lg transition"
        >
          Create Profile
        </button>
      </section>
    </div>
  );
}

export default Career;
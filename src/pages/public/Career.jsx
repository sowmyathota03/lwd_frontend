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
    {
      title: "Immediate Joiners",
      query: "?noticePreference=IMMEDIATE_JOINER",
    },
    {
      title: "15 Days Joiners",
      query: "?noticePreference=15_DAYS",
    },
    {
      title: "30 Days Notice Period",
      query: "?noticePreference=30_DAYS",
    },
    {
      title: "60 Days Notice Period",
      query: "?noticePreference=60_DAYS",
    },
  ];

  const roles = [
    "Java Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "DevOps Engineer",
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700">
          Find the Right Career Opportunity Faster
        </h1>

        <p className="text-gray-600 mt-4">
          Discover jobs based on your skills, experience, and Last Working Day
          (LWD). Our platform helps you connect with employers who are ready
          to hire fast.
        </p>
      </section>

      {/* CAREER CATEGORIES */}
      <section className="mt-14 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Job Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/jobs${item.query}`)}
            >
              <h3 className="font-semibold text-lg text-blue-600">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LWD SPECIAL SECTION */}
      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Jobs by Last Working Day
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {lwdJobs.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/jobs${item.query}`)}
              className="bg-blue-600 text-white text-center p-5 rounded-lg cursor-pointer hover:bg-blue-700"
            >
              {item.title}
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE LWD */}
      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Why Choose LWD
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600">
              Faster Hiring
            </h3>
            <p className="text-gray-500 mt-2">
              Find companies that need candidates immediately.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600">
              One-Click Apply
            </h3>
            <p className="text-gray-500 mt-2">
              Apply instantly using your saved profile.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600">
              Smart Job Matching
            </h3>
            <p className="text-gray-500 mt-2">
              AI suggests jobs based on your skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-600">
              Transparent Hiring
            </h3>
            <p className="text-gray-500 mt-2">
              Clear joining timelines and hiring stages.
            </p>
          </div>
        </div>
      </section>

      {/* CAREER TIPS */}
      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Career Advice
        </h2>

        <ul className="mt-6 space-y-3 text-gray-600 text-center">
          <li>Keep your resume updated</li>
          <li>Complete your profile details</li>
          <li>Apply to jobs matching your skills</li>
          <li>Set job alerts for faster opportunities</li>
        </ul>
      </section>

      {/* POPULAR ROLES */}
      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Popular Job Roles
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => navigate(`/jobs?role=${role}`)}
              className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-blue-600 hover:text-white"
            >
              {role}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-blue-700">
          Start Your Career Journey Today
        </h2>

        <p className="text-gray-600 mt-2">
          Create your profile and apply for jobs that match your skills.
        </p>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Create Profile
          </button>
        </div>
      </section>
    </div>
  );
}

export default Career;
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
    <div className="lwd-page px-6 py-10">

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="lwd-title text-3xl md:text-4xl mb-4">
          Find the Right Career Opportunity Faster
        </h1>

        <p className="lwd-text">
          Discover jobs based on your skills, experience, and Last Working Day
          (LWD). Our platform helps you connect with employers who are ready
          to hire fast.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="mt-14 max-w-6xl mx-auto">
        <h2 className="lwd-title text-center mb-8">Job Categories</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="lwd-card p-6 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/jobs${item.query}`)}
            >
              <h3 className="lwd-title text-base">
                {item.title}
              </h3>

              <p className="lwd-text mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* LWD SECTION */}
      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="lwd-title text-center mb-6">
          Jobs by Last Working Day
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {lwdJobs.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/jobs${item.query}`)}
              className="lwd-btn-primary text-center cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mt-16 max-w-6xl mx-auto">
        <h2 className="lwd-title text-center mb-6">
          Why Choose LWD
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Faster Hiring",
              desc: "Find companies that need candidates immediately.",
            },
            {
              title: "One-Click Apply",
              desc: "Apply instantly using your saved profile.",
            },
            {
              title: "Smart Job Matching",
              desc: "AI suggests jobs based on your skills.",
            },
            {
              title: "Transparent Hiring",
              desc: "Clear joining timelines and hiring stages.",
            },
          ].map((item, index) => (
            <div key={index} className="lwd-card p-6">
              <h3 className="lwd-title text-base">
                {item.title}
              </h3>
              <p className="lwd-text mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER ADVICE */}
      <section className="mt-16 max-w-5xl mx-auto text-center">
        <h2 className="lwd-title mb-6">Career Advice</h2>

        <ul className="space-y-3">
          <li className="lwd-text">Keep your resume updated</li>
          <li className="lwd-text">Complete your profile details</li>
          <li className="lwd-text">Apply to jobs matching your skills</li>
          <li className="lwd-text">Set job alerts for faster opportunities</li>
        </ul>
      </section>

      {/* ROLES */}
      <section className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="lwd-title mb-6">Popular Job Roles</h2>

        <div className="flex flex-wrap justify-center gap-4">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() =>
                navigate(`/jobs?keyword=${encodeURIComponent(role)}`)
              }
              className="lwd-btn-secondary"
            >
              {role}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center">
        <h2 className="lwd-title text-2xl">
          Start Your Career Journey Today
        </h2>

        <p className="lwd-text mt-2">
          Create your profile and apply for jobs that match your skills.
        </p>

        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/jobs")}
            className="lwd-btn-primary"
          >
            Browse Jobs
          </button>

          <button
            onClick={() => navigate("/register")}
            className="lwd-btn-secondary"
          >
            Create Profile
          </button>
        </div>
      </section>
    </div>
  );
}

export default Career;
import { useNavigate } from "react-router-dom";
import { 
  Zap, 
  MousePointerClick, 
  Brain, 
  Search, 
  Briefcase, 
  Clock, 
  Globe, 
  GraduationCap, 
  Rocket, 
  Award, 
  CheckCircle,
  ChevronRight,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

function Career() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Immediate Joiner Jobs",
      desc: "Jobs for candidates who can join within 0–15 days.",
      query: "?noticePreference=IMMEDIATE_JOINER",
      icon: <Zap className="text-orange-500" size={24} />,
      bg: "bg-orange-50 dark:bg-orange-900/20 group-hover:bg-orange-500"
    },
    {
      title: "Notice Period Friendly",
      desc: "Companies accepting candidates currently serving notice.",
      query: "?noticePreference=SERVING_NOTICE",
      icon: <Clock className="text-blue-500" size={24} />,
      bg: "bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-500"
    },
    {
      title: "Remote Jobs",
      desc: "Work from anywhere opportunities.",
      query: "?jobType=REMOTE",
      icon: <Globe className="text-emerald-500" size={24} />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-500"
    },
    {
      title: "Internships",
      desc: "Opportunities for students and freshers.",
      query: "?minExp=0&maxExp=1",
      icon: <GraduationCap className="text-indigo-500" size={24} />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20 group-hover:bg-indigo-500"
    },
    {
      title: "Startup Jobs",
      desc: "Fast growing startup company openings.",
      query: "?industry=startup",
      icon: <Rocket className="text-purple-500" size={24} />,
      bg: "bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-500"
    },
    {
      title: "Experienced Professionals",
      desc: "Roles for professionals with 3+ years experience.",
      query: "?minExp=3",
      icon: <Award className="text-amber-500" size={24} />,
      bg: "bg-amber-50 dark:bg-amber-900/20 group-hover:bg-amber-500"
    },
  ];

  const lwdJobs = [
    { title: "Immediate Joiners", query: "?noticePreference=IMMEDIATE_JOINER" },
    { title: "15 Days Notice", query: "?noticePreference=15_DAYS" },
    { title: "30 Days Notice", query: "?noticePreference=30_DAYS" },
    { title: "60 Days Notice", query: "?noticePreference=60_DAYS" },
  ];

  const roles = [
    "Java Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "DevOps Engineer",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" }
    })
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HERO */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24 md:py-32">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="lwd-container relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="lwd-section-tag text-blue-300 border-blue-400/30 bg-blue-500/20 mb-6">
              <TrendingUp size={14} /> Career Hub
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          >
            Find the Right Career <br className="hidden md:block" />
            Opportunity{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Faster</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Discover high-impact roles based on your skills, experience, and Last Working Day (LWD).
            Our platform helps you connect with employers ready to hire fast.
          </motion.p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CATEGORIES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24">
        <div className="lwd-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="lwd-h2 mb-3">Browse by Category</h2>
              <div className="lwd-divider" />
            </div>
            <p className="lwd-text-muted max-w-sm">
              Handpicked opportunities across diverse sectors and experience levels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.5}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/jobs${item.query}`)}
              >
                <div className={`mb-5 p-4 w-fit rounded-xl ${item.bg} transition-colors duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  {item.desc}
                </p>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  View Jobs <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LWD SECTION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="lwd-container">
          <div className="lwd-section-header mb-10">
            <h2 className="lwd-h2">Jobs by Last Working Day</h2>
            <p className="lwd-text-muted max-w-xl mx-auto">
              Filter by your availability and match with companies ready to hire immediately.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {lwdJobs.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(`/jobs${item.query}`)}
                className="group bg-white dark:bg-slate-800 hover:bg-blue-600 text-slate-700 dark:text-slate-200 hover:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-600 px-6 py-5 rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-center"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* THE LWD EDGE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24">
        <div className="lwd-container">
          <div className="lwd-section-header">
            <h2 className="lwd-h2">The LWD Advantage</h2>
            <div className="lwd-divider" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Faster Hiring", desc: "Find companies that need candidates immediately.", icon: <Zap className="text-blue-600" size={28} /> },
              { title: "One-Click Apply", desc: "Apply instantly using your saved profile.", icon: <MousePointerClick className="text-indigo-600" size={28} /> },
              { title: "Smart Matching", desc: "AI suggests jobs based on your skills.", icon: <Brain className="text-purple-600" size={28} /> },
              { title: "Transparent Hiring", desc: "Clear joining timelines and hiring stages.", icon: <Search className="text-emerald-600" size={28} /> },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.5}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-5 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CAREER ADVICE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="lwd-container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <span className="lwd-section-tag mb-4">
                <TrendingUp size={14} /> Career Tips
              </span>
              <h2 className="lwd-h2 mb-4">Master Your Next Move</h2>
              <p className="lwd-text-muted mb-8">Expert tips to accelerate your professional growth and visibility in the market.</p>
              <button
                onClick={() => navigate("/jobs")}
                className="lwd-btn-primary flex items-center gap-2"
              >
                Browse Jobs <ArrowRight size={16} />
              </button>
            </div>

            <div className="md:w-1/2 space-y-4">
              {[
                "Keep your resume updated for deep AI indexing.",
                "Complete your profile to unlock 100% visibility.",
                "Apply selectively to jobs that match your skillset.",
                "Set job alerts to catch opportunities the moment they drop.",
              ].map((advice, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 text-slate-700 dark:text-slate-200 font-medium bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700"
                >
                  <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{advice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* POPULAR ROLES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 text-center">
        <div className="lwd-container">
          <div className="lwd-section-header">
            <h2 className="lwd-h2">Search by Role</h2>
            <p className="lwd-text-muted max-w-lg mx-auto">Find roles that match your specialization.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {roles.map((role, index) => (
              <button
                key={index}
                onClick={() => navigate(`/jobs?keyword=${encodeURIComponent(role)}`)}
                className="lwd-btn-outline hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 transition-all"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* CTA */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20">
        <div className="lwd-container">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Ready to Level Up Your Career?</h2>
              <p className="text-blue-100 text-lg font-medium leading-relaxed">
                Create your professional profile today and connect with thousands of active recruiters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
                <button
                  onClick={() => navigate("/jobs")}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:-translate-y-0.5 transition-all"
                >
                  Browse Jobs
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Create Free Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-8" />
    </div>
  );
}

export default Career;
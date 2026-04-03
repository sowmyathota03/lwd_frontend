import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import PopularJobs from "../../components/jobs/PopularJobs";
import JobSearchBlock from "../../components/jobs/JobSearchBlock";
import { getTopCategories } from "../../api/JobApi";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  Bell,
  ArrowRight,
  Briefcase,
  Users,
  Star,
  CheckCircle,
  Search,
  FileText,
  Award,
  Zap,
  MapPin,
  Clock,
  ChevronRight,
  UserCheck,
  Upload,
  MousePointerClick,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getTopCategories();
        setCategories(
          response.data.map((cat) => ({
            name: cat,
            slug: cat.toLowerCase(),
          }))
        );
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const stats = [
    { value: "50K+", label: "Active Jobs", icon: <Briefcase size={18} /> },
    { value: "10K+", label: "Companies", icon: <Building2 size={18} /> },
    { value: "1M+", label: "Job Seekers", icon: <Users size={18} /> },
    { value: "4.8★", label: "User Rating", icon: <Star size={18} /> },
  ];

  const features = [
    {
      title: "Verified Job Listings",
      icon: <ShieldCheck size={24} className="text-blue-600" />,
      desc: "Every posting is reviewed and authenticated. No spam, no fake listings.",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-100 dark:border-blue-800/40",
    },
    {
      title: "Top Employers",
      icon: <Building2 size={24} className="text-indigo-600" />,
      desc: "We partner with India's leading companies and innovative startups.",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-100 dark:border-indigo-800/40",
    },
    {
      title: "Career Guidance",
      icon: <TrendingUp size={24} className="text-emerald-600" />,
      desc: "Expert tips, resume advice, and resources to grow your career faster.",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-100 dark:border-emerald-800/40",
    },
    {
      title: "Instant Job Alerts",
      icon: <Bell size={24} className="text-amber-600" />,
      desc: "Get notified the moment a matching job is posted. Never miss an opportunity.",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-100 dark:border-amber-800/40",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Profile",
      desc: "Sign up and build your professional profile with your skills, experience, and resume.",
      icon: <UserCheck size={28} className="text-blue-600" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      step: "02",
      title: "Upload Your Resume",
      desc: "Upload your resume so recruiters can find you and match you to the right roles.",
      icon: <Upload size={28} className="text-indigo-600" />,
      color: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      step: "03",
      title: "Apply in One Click",
      desc: "Browse curated job listings and apply instantly with your saved profile.",
      icon: <MousePointerClick size={28} className="text-emerald-600" />,
      color: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  const companies = [
    "Arah Infotech", "Google", "TCS", "Infosys",
    "Wipro", "Amazon", "Accenture", "Microsoft",
    "Meta", "Cognizant",
  ];

  const popularSearches = [
    "Java Developer", "React Developer", "Data Analyst",
    "DevOps Engineer", "Python Developer", "Full Stack",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.09, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* ════════════════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        {/* decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-3xl pointer-events-none" />

        <div className="lwd-container relative z-10 pt-20 pb-44 text-center">

          {/* Eyebrow tag */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-bold
              uppercase tracking-widest mb-6">
              <CheckCircle size={13} /> India's Leading Job Portal
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-5"
          >
            Find Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Dream Job
            </span>{" "}
            Today
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
          >
            Discover top opportunities, connect with trusted companies, and take
            the next step in your career with LWD Portal.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {user?.role === "JOB_SEEKER" ? (
              <button
                onClick={() => navigate("/jobs")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white
                  px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-blue-500/25
                  hover:-translate-y-0.5 transition-all"
              >
                Browse Jobs <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white
                  px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-blue-500/25
                  hover:-translate-y-0.5 transition-all"
              >
                Create Free Profile <ArrowRight size={18} />
              </button>
            )}
            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white
                  px-8 py-3.5 rounded-full font-bold text-base hover:-translate-y-0.5 transition-all"
              >
                Sign In
              </button>
            )}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i}
                className="flex flex-col items-center gap-1 px-3 py-4
                  bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="text-blue-400 mb-0.5">{stat.icon}</div>
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* SEARCH BLOCK — lifted over hero bottom */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="lwd-container -mt-16 relative z-20">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 md:p-6">
          <JobSearchBlock />
          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Zap size={12} className="text-blue-500" /> Popular:
            </span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => navigate(`/jobs?keyword=${encodeURIComponent(term)}`)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-300
                  bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20
                  hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded-full
                  border border-slate-200 dark:border-slate-700 hover:border-blue-200
                  transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

    
      {/* ════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="lwd-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                onClick={() => {
                  if (step.title.includes("Resume")) navigate("/resume-upload");
                  if (step.title.includes("Profile")) navigate("/profile");
                  if (step.title.includes("Apply")) navigate("/jobs");
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.5}
                className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-slate-900
                  rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-8
                  hover:shadow-md hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-5 shadow-sm`}>
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">{step.title}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ════════════════════════════════════════════════════════ */}
      {/* POPULAR CATEGORIES */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="">
          <div className="lwd-section-header pt-12">
            <span className="lwd-section-tag">
              <TrendingUp size={13} /> Trending
            </span>
            <h2 className="lwd-h2">Popular Job Categories</h2>
            <p className="lwd-text-muted max-w-xl mx-auto">
              Explore thousands of opportunities across specialized fields tailored to your expertise.
            </p>
          </div>

          {categories.length > 0 ? (
            <PopularJobs title="" categories={categories} />
          ) : (
            <div className="flex justify-center items-center">
              <div className="animate-pulse text-slate-400 font-medium text-sm">Loading categories...</div>
              <Link
                to="/career"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600
                dark:text-blue-400 hover:text-blue-700 transition-colors"
              >
                <h1>Browse all categories</h1> <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

     
      {/* ════════════════════════════════════════════════════════ */}
      {/* WHY CHOOSE US */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="lwd-container">
          <div className="lwd-section-header">
            <span className="lwd-section-tag">
              <ShieldCheck size={13} /> Trusted Platform
            </span>
            <h2 className="lwd-h2">Why Professionals Choose LWD</h2>
            <p className="lwd-text-muted max-w-xl mx-auto">
              We provide the best tools and connections to help you succeed in today's competitive job market.
            </p>
          </div>

          <div className=" p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={idx * 0.4}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl
                  border border-slate-100 dark:border-slate-800 shadow-sm
                  hover:shadow-lg hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border}
                  flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      

      {/* ════════════════════════════════════════════════════════ */}
      {/* TOP COMPANIES */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="lwd-container">
          <div className="text-center mb-10">
            <span className="lwd-section-tag mb-3">
              <Building2 size={13} /> Top Employers
            </span>
            <h2 className="lwd-h2 mb-2">Top Companies Hiring Now</h2>
            <p className="lwd-text-muted max-w-lg mx-auto">
              Join the teams of industry-leading organizations looking for talent just like you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {companies.map((company, index) => (
              <motion.button
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.15}
                onClick={() => navigate(`/jobs?companyName=${encodeURIComponent(company)}`)}
                className="group flex items-center gap-2 bg-slate-50 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700 hover:border-blue-400/50
                  hover:bg-blue-50 dark:hover:bg-blue-900/20 px-5 py-3 rounded-xl
                  font-semibold text-sm text-slate-700 dark:text-slate-200
                  hover:text-blue-700 dark:hover:text-blue-400
                  shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-black">{company.charAt(0)}</span>
                </div>
                {company}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600
                dark:text-blue-400 hover:text-blue-700 transition-colors"
            >
              View all companies <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* DUAL CTA BANNER */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="lwd-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Job Seeker CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800
                rounded-2xl p-8 md:p-10 text-white shadow-xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                  <Search size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight">Looking for a Job?</h3>
                <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6">
                  Access thousands of verified job listings, get personalized recommendations,
                  and apply with one click.
                </p>
                <ul className="space-y-2 mb-7">
                  {["Free profile & resume upload", "Personalized job matches", "One-click apply"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-blue-100 font-medium">
                      <CheckCircle size={14} className="text-blue-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(user ? "/jobs" : "/register")}
                  className="inline-flex items-center gap-2 bg-white text-blue-700
                    hover:bg-blue-50 px-6 py-3 rounded-full font-bold text-sm
                    shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {user ? "Browse Jobs" : "Get Started Free"} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Recruiter CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900
                rounded-2xl p-8 md:p-10 text-white shadow-xl border border-slate-700"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <FileText size={24} className="text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight">Hiring Talent?</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-6">
                  Post jobs, manage applications, and connect with thousands of qualified
                  candidates ready to join your team.
                </p>
                <ul className="space-y-2 mb-7">
                  {["Post jobs in minutes", "Smart candidate filtering", "Application tracking dashboard"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/register/recruiter")}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500
                    text-white px-6 py-3 rounded-full font-bold text-sm
                    shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Post a Job <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* TRUST BADGES */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="lwd-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck size={22} className="text-blue-600" />, label: "100% Verified Jobs", sub: "Authenticated by our team" },
              { icon: <Clock size={22} className="text-indigo-600" />, label: "24/7 Support", sub: "Always here to help" },
              { icon: <Award size={22} className="text-emerald-600" />, label: "Industry Leader", sub: "Trusted since 2020" },
              { icon: <MapPin size={22} className="text-amber-600" />, label: "Pan-India Reach", sub: "Jobs in 50+ cities" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 py-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-1 shadow-sm border border-slate-100 dark:border-slate-700">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-white">{item.label}</p>
                <p className="text-xs font-medium text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* FINAL CTA */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="lwd-container">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700
            rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Ready to Take the Next Step?
              </h2>
              <p className="text-blue-100 text-base font-medium leading-relaxed">
                Join over a million professionals who found their dream jobs through LWD Portal.
                Your next chapter starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5
                    rounded-full font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Get Started Free
                </button>
                <Link
                  to="/jobs"
                  className="flex items-center gap-2 border border-white/35 hover:bg-white/10
                    text-white px-8 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all"
                >
                  Browse Jobs <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-8" />
    </div>
  );
}

export default Home;   



import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MousePointer2,
  Building2,
  Sparkles,
  Layers,
  Rocket,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="text-emerald-500" size={24} />,
    title: "Verified Listings",
    desc: "Every job listing undergoes a thorough review process for your safety.",
  },
  {
    icon: <MousePointer2 className="text-blue-500" size={24} />,
    title: "Easy Applications",
    desc: "Apply to jobs with a single click using your saved profile.",
  },
  {
    icon: <Building2 className="text-indigo-500" size={24} />,
    title: "Trusted Employers",
    desc: "Partnerships with industry leaders and innovative startups.",
  },
  {
    icon: <Sparkles className="text-amber-500" size={24} />,
    title: "Career Support",
    desc: "Expert guidance and resources for your professional growth.",
  },
  {
    icon: <Layers className="text-rose-500" size={24} />,
    title: "Tailored Experience",
    desc: "Personalized search matching your unique skills and goals.",
  },
];

function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="lwd-page min-h-screen py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="lwd-container max-w-6xl space-y-24 relative z-10"
      >
        {/* HERO HEADER */}
        <motion.div variants={itemVariants} className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="lwd-section-tag">
            <Rocket size={13} /> About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Bridging the Gap Between{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Dreams and Reality
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Welcome to <span className="text-blue-600 font-bold">Learn With Dreams (LWD)</span>.
            We are more than a job portal — we are a launchpad for the next generation of talent.
          </p>
        </motion.div>

        {/* MISSION & PHILOSOPHY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={itemVariants}
            className="lwd-card p-8 space-y-5 group hover:border-blue-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Bridging the gap between ambitious talent and game-changing opportunity. We are
              building the most reliable, secure, and user-centric job ecosystem for the modern
              workforce.
            </p>
            <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-blue-600 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle2 size={14} /> Built for reliability
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lwd-card p-8 space-y-5 group hover:border-indigo-500/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Our Philosophy</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Simplifying the complex. Whether you are a fresher or a seasoned expert, LWD
              eliminates friction, providing verified resources and expert career guidance at
              every step.
            </p>
            <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-indigo-600 border-t border-slate-100 dark:border-slate-800">
              <CheckCircle2 size={14} /> Efficiency first
            </div>
          </motion.div>
        </div>

        {/* FEATURE GRID */}
        <div className="space-y-10">
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Choose <span className="text-blue-600">LWD?</span>
            </h3>
            <p className="text-sm font-medium text-slate-400">The platform advantage</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="lwd-card p-6 rounded-2xl text-center space-y-4"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                  {feature.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA FOOTER */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-2xl text-center space-y-5 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <h2 className="text-3xl font-bold text-white relative z-10 leading-tight">
            Empowering Every Career Journey
          </h2>
          <p className="text-blue-100 text-sm font-medium max-w-xl mx-auto relative z-10 leading-relaxed">
            At LWD, we believe everyone deserves the chance to achieve their dream career.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AboutUs;
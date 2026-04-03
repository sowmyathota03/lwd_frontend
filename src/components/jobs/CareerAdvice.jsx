import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  UserCheck,
  FileText,
  Linkedin,
  Terminal,
  Users,
  Sparkles,
  Rocket,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";

function CareerAdvice() {
  const tips = [
    { text: "Build a strong resume with clear skills and projects.", icon: <FileText className="w-5 h-5 text-blue-500" /> },
    { text: "Practice coding and technical interview questions daily.", icon: <Terminal className="w-5 h-5 text-emerald-500" /> },
    { text: "Improve communication and English speaking skills.", icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { text: "Create LinkedIn and GitHub profiles.", icon: <Linkedin className="w-5 h-5 text-blue-600" /> },
    { text: "Apply for internships to gain real-time experience.", icon: <Rocket className="w-5 h-5 text-rose-500" /> },
    { text: "Learn trending technologies like React, Java, Python.", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { text: "Attend webinars and tech workshops.", icon: <Target className="w-5 h-5 text-violet-500" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="lwd-page min-h-screen py-24 px-6 bg-white dark:bg-slate-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-12 relative z-10"
      >
        {/* HEADING */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <span className="lwd-section-tag">
            <Trophy size={13} /> Career Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Career Advice Hub
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Practical guidance to help you build a strong profile and land your dream job faster.
          </p>
        </motion.div>

        {/* ADVICE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-12">
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="lwd-card p-6 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                  Tip {idx + 1}
                </p>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {tip.text}
                </h3>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 p-8 rounded-2xl bg-blue-600 text-white relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <Lightbulb size={24} className="text-amber-300" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Keep Your Profile Updated</h4>
                  <p className="text-sm font-medium text-blue-100 leading-relaxed">
                    Regularly updating your profile increases visibility to recruiters by up to 45%.
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-50 transition-colors flex-shrink-0">
                Update Profile <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default CareerAdvice;
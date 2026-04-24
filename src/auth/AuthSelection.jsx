import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

function AuthSelection() {
  const navigate = useNavigate();

  return (
    <div className="lwd-page flex flex-col justify-center items-center py-12 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold mb-6 uppercase tracking-widest shadow-sm">
          <Sparkles size={14} />
          Join Our Platform
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Choose your path to{" "}
          <span className="text-blue-600 dark:text-blue-500 italic underline decoration-blue-600/20 underline-offset-8">
            success
          </span>
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Whether you're looking for your next career move or searching for top talent,
          we've got the tools to help you reach your goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10 px-2 lg:px-0">
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => navigate("/register/jobseeker")}
          className="lwd-card-glass p-10 cursor-pointer group flex flex-col items-center text-center border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="w-20 h-20 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 ring-1 ring-blue-500/20">
            <User size={40} />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase tracking-wider">
            Join as Talent
          </h3>

          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
            Discover premium opportunities and accelerate your professional growth.
          </p>

          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-black rounded-xl text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
            Get Started
            <ArrowRight
              size={18}
              className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
            />
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => navigate("/register/recruiter")}
          className="lwd-card-glass p-10 cursor-pointer group flex flex-col items-center text-center border-slate-200/50 dark:border-slate-800/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300"
        >
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-8 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ring-1 ring-indigo-500/20">
            <Building2 size={40} />
          </div>

          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase tracking-wider">
            Join as Recruiter
          </h3>

          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
            Build your team with India's most innovative and prepared professionals.
          </p>

          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 dark:shadow-white/10 group-hover:bg-black dark:group-hover:bg-slate-100 transition-colors">
            Get Started
            <ArrowRight
              size={18}
              className="translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
            />
          </button>
        </motion.div>
      </div>

      {/* Secure Company Admin Section */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="w-full max-w-4xl relative z-10 mt-10"
      >
        <div className="rounded-2xl border border-amber-200/70 dark:border-amber-800/40 bg-amber-50/80 dark:bg-slate-900/70 backdrop-blur-sm px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                Register Company Admin
                <LockKeyhole size={16} className="text-amber-600 dark:text-amber-400" />
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                This account type is protected with email verification and company approval.
                Employer features are enabled only after review.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/register/company-admin")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 bg-white/80 dark:bg-slate-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/20 font-bold text-sm tracking-wide transition-colors"
          >
            Request Access
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthSelection;
import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Globe, 
  Shield, 
  Briefcase, 
  Copyright, 
  AlertTriangle, 
  RefreshCcw, 
  History,
  Scale
} from "lucide-react";

function TermsAndConditions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const sections = [
    {
      title: "Use of Website",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      content: [
        "You must provide accurate and updated information.",
        "You agree not to misuse the platform for illegal activities.",
        "Fake profiles or job postings are strictly prohibited."
      ]
    },
    {
      title: "User Accounts",
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      content: [
        "You are responsible for maintaining account confidentiality.",
        "We reserve the right to suspend suspicious accounts."
      ]
    },
    {
      title: "Job Listings",
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />,
      text: "LWD acts as a platform connecting job seekers and employers. We do not guarantee job placement or hiring decisions. All listed positions are subject to validation."
    },
    {
      title: "Intellectual Property",
      icon: <Copyright className="w-5 h-5 text-amber-500" />,
      text: "All content, logos, and design elements of LWD are owned by the platform and cannot be copied or distributed without explicit platform permission."
    },
    {
      title: "Limitation of Liability",
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      text: "LWD is not responsible for any loss, damages, or disputes between employers and job seekers. Our role is solely as an interaction layer."
    },
    {
      title: "Changes to Terms",
      icon: <RefreshCcw className="w-5 h-5 text-violet-500" />,
      text: "We may update these Terms at any time. Continued use of the website means you accept the updated terms. Please check this document periodically."
    }
  ];

  return (
    <div className="lwd-page min-h-screen py-20 px-6 relative overflow-hidden bg-white dark:bg-slate-900">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-12 relative z-10"
      >
        
        {/* HEADING SECTION */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm border border-slate-200/50 dark:border-slate-800/30">
             <Scale size={12} />
             Legal Protocol
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Terms & <span className="text-indigo-600 italic">Conditions</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <History size={12} />
             Last Updated: October 2026 Registry
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lwd-card-glass p-8 border-l-4 border-l-indigo-500">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
            Welcome to LWD (Learn With Dreams). By accessing or using our platform, you agree to comply with the following Terms and Conditions. These protocols govern your interaction with our services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {sections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants} className="lwd-card bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner">
                       {section.icon}
                    </div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none">{section.title}</h3>
                 </div>
                 
                 {section.text && (
                   <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed tabular-nums">
                     {section.text}
                   </p>
                 )}

                 {section.content && (
                   <ul className="space-y-3">
                     {section.content.map((item, i) => (
                       <li key={i} className="flex gap-2 items-start text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-normal italic">
                         <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div>
                         {item}
                       </li>
                     ))}
                   </ul>
                 )}
              </motion.div>
           ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <motion.div variants={itemVariants} className="pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6">
           <div className="p-4 rounded-[2rem] bg-indigo-900 dark:bg-indigo-950 text-white w-full max-w-xl shadow-2xl shadow-indigo-500/10 flex items-center gap-4 border border-indigo-800/30">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                 <ShieldCheck size={18} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                 Continued interaction with LWD signifies your acceptance of these Terms and Conditions in their current registry state.
              </p>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default TermsAndConditions;
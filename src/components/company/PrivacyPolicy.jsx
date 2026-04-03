import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Database, 
  Activity, 
  Lock, 
  Share2, 
  Cookie, 
  UserCheck, 
  History,
  FileText
} from "lucide-react";

function PrivacyPolicy() {
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
      title: "Information We Collect",
      icon: <Database className="w-5 h-5 text-blue-500" />,
      content: [
        "Identity metadata: Name, Email, Phone Number",
        "Professional Dossier: Resume and Profile Details",
        "Talent DNA: Job Preferences and Skills",
        "Operational Ingress: Usage Data (pages visited, searches)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Activity className="w-5 h-5 text-indigo-500" />,
      content: [
        "To provide high-frequency job search services",
        "To synthesize candidate-employer mapping",
        "To improve platform performance metrics",
        "To distribute real-time job alerts and updates"
      ]
    },
    {
      title: "Data Security Protocol",
      icon: <Lock className="w-5 h-5 text-emerald-500" />,
      text: "We implement elite security measures to protect your personal information from unauthorized access, misuse, or disclosure. All data is encrypted and stored according to industry standards."
    },
    {
      title: "Sharing Information",
      icon: <Share2 className="w-5 h-5 text-amber-500" />,
      text: "We prioritize your data integrity. Your personal data is never sold. Information is only shared with trusted employers or partners for specific recruitment synthesis."
    },
    {
      title: "Cookie Governance",
      icon: <Cookie className="w-5 h-5 text-violet-500" />,
      text: "Our platform uses cookies to enhance user experience, preserve session state, and analyze traffic patterns for optimization."
    },
    {
      title: "Your Rights & Sovereignty",
      icon: <UserCheck className="w-5 h-5 text-rose-500" />,
      content: [
        "Profile Autonomy: Update or delete your identity anytime.",
        "Communication Control: Unsubscribe from signal notifications."
      ]
    }
  ];

  return (
    <div className="lwd-page min-h-screen py-20 px-6 relative overflow-hidden bg-white dark:bg-slate-900">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-12 relative z-10"
      >
        
        {/* HEADING SECTION */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm border border-blue-200/50 dark:border-blue-800/30">
             <ShieldCheck size={12} />
             Compliance Center
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Privacy <span className="text-blue-600 italic">Policy</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <History size={12} />
             Last Updated: October 2026 Protocol
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lwd-card-glass p-8 border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
            Welcome to LWD (Learn With Dreams). Your privacy is the core of our partnership. This Privacy Policy explains our data synthesis protocols and how we protect your information when you engage with our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {sections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants} className="lwd-card bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all space-y-4">
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
                         <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
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
           <div className="p-4 rounded-[2rem] bg-slate-900 dark:bg-slate-800 text-white w-full max-w-xl shadow-2xl shadow-blue-500/10 flex items-center gap-4 border border-slate-800">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                 <FileText size={18} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                 By interacting with LWD, you acknowledge your integration with our data encryption and privacy protocols.
              </p>
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default PrivacyPolicy;
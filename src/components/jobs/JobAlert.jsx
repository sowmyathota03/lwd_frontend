import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Target, MapPin, Zap, Sparkles, ArrowRight } from "lucide-react";

function JobAlert() {
  const [alertData, setAlertData] = useState({
    role: "",
    location: "",
    experience: "",
  });

  const handleChange = (e) => {
    setAlertData({
      ...alertData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Alert Saved:", alertData);
    alert("✅ Job Alert protocol synchronized successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-500">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl relative z-10"
      >
        <div className="lwd-card-glass p-10 border border-slate-100 dark:border-slate-800 space-y-10 shadow-2xl">
          
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm border border-blue-500/20">
                <Bell size={12} className="animate-bounce" />
                Alert Protocol
             </div>
             <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Set <span className="text-blue-600 italic font-black">Registry</span> Alert
             </h2>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Configure your opportunity discovery synthesis.
             </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Role */}
               <motion.div variants={itemVariants} className="space-y-3 group/field">
                  <div className="flex items-center gap-2">
                     <Target size={14} className="text-slate-400 group-focus-within/field:text-blue-500 transition-colors" />
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within/field:text-blue-500 transition-colors">Job Role</label>
                  </div>
                  <input
                    type="text"
                    name="role"
                    value={alertData.role}
                    onChange={handleChange}
                    placeholder="e.g. Lead Engineer"
                    required
                    className="lwd-input h-14 bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 font-bold tracking-tight transition-all"
                  />
               </motion.div>

               {/* Location */}
               <motion.div variants={itemVariants} className="space-y-3 group/field">
                  <div className="flex items-center gap-2">
                     <MapPin size={14} className="text-slate-400 group-focus-within/field:text-blue-500 transition-colors" />
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within/field:text-blue-500 transition-colors">Location</label>
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={alertData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, IN"
                    required
                    className="lwd-input h-14 bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 font-bold tracking-tight transition-all"
                  />
               </motion.div>
            </div>

            {/* Experience */}
            <motion.div variants={itemVariants} className="space-y-3 group/field">
               <div className="flex items-center gap-2">
                  <Zap size={14} className="text-slate-400 group-focus-within/field:text-blue-500 transition-colors" />
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within/field:text-blue-500 transition-colors">Experience Protocol</label>
               </div>
               <div className="relative">
                  <select
                    name="experience"
                    value={alertData.experience}
                    onChange={handleChange}
                    required
                    className="lwd-input h-14 appearance-none bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 focus:ring-blue-500/20 px-6 font-bold tracking-tight transition-all"
                  >
                    <option value="">Select Threshold</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                     </svg>
                  </div>
               </div>
            </motion.div>

            {/* Button */}
            <motion.div variants={itemVariants} className="pt-4">
               <button
                 type="submit"
                 className="w-full relative group overflow-hidden bg-blue-600 text-white h-16 rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95"
               >
                 <div className="relative z-10 flex items-center gap-3">
                    <Sparkles size={20} className="text-blue-200" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronize Alert protocol</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </div>
                 <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out pointer-events-none"></div>
               </button>
            </motion.div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default JobAlert;
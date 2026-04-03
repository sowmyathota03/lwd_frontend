import { motion } from "framer-motion";

function JobSkeleton() {
  return (
    <div className="lwd-card p-6 flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden">
      
      {/* Shimmer overlay */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent pointer-events-none"
      />

      {/* LEFT CONTENT */}
      <div className="flex-1 min-w-0 space-y-5">
        
        {/* Title and Meta */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 w-full">
               <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-lg w-3/4 animate-pulse" />
               <div className="flex items-center gap-3">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-24 animate-pulse" />
                  <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-32 animate-pulse" />
               </div>
            </div>
            <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-20 animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Detail pills */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-slate-50 dark:bg-slate-800/70 rounded-lg w-24 animate-pulse border border-slate-100 dark:border-slate-700" />
          ))}
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-slate-50 dark:bg-slate-800/70 rounded-md w-16 animate-pulse border border-slate-100 dark:border-slate-700" />
          ))}
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:w-44 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
        <div className="flex items-center md:flex-col gap-3 w-full">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          <div className="flex-1 md:w-full h-11 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="hidden md:flex flex-col items-end gap-2 text-right">
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-24 animate-pulse" />
          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-lg w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default JobSkeleton;
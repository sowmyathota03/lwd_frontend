import { motion } from "framer-motion";
import { Activity } from "lucide-react";

/**
 * Modern LWD Premium Loader
 * Features a multi-layered pulse and spin animation for a high-end administrative feel.
 */
function Loader({
  fullScreen = false,
  size = 48,
  message = "Loading...",
}) {
  return (
    <div
      className={`
        w-full flex flex-col items-center justify-center gap-6
        ${fullScreen ? "fixed inset-0 z-[200] lwd-page bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl" : "py-16"}
      `}
    >
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* Outer Pulsing Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Middle Spinning Border */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Branded Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
           <Activity size={size * 0.5} strokeWidth={2.5} className="animate-pulse" />
        </div>

      </div>

      {/* Professional Loading State label */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
          LWD Portal
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
             {message}
          </span>
          <span className="flex gap-1">
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1 h-1 rounded-full bg-blue-500"></motion.span>
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} className="w-1 h-1 rounded-full bg-blue-500"></motion.span>
             <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }} className="w-1 h-1 rounded-full bg-blue-500"></motion.span>
          </span>
        </div>
      </motion.div>

    </div>
  );
}

export default Loader;
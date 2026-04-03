import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Code,
  Database,
  Layout,
  Terminal,
  Cpu,
  Globe,
  Smartphone,
  Cloud,
  ChevronRight,
  Sparkles
} from "lucide-react";

const categoryIcons = {
  "software": <Code size={20} />,
  "java": <Terminal size={20} />,
  "react": <Layout size={20} />,
  "data": <Database size={20} />,
  "cloud": <Cloud size={20} />,
  "mobile": <Smartphone size={20} />,
  "web": <Globe size={20} />,
  "python": <Terminal size={20} />,
  "fullstack": <Cpu size={20} />,
};

function PopularJobs({ title, categories }) {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-10 w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="lwd-container">

        {/* HEADER */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto text-sm md:text-base">
              Discover trending job categories and explore opportunities tailored to your skills.
            </p>
          </motion.div>
        )}

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {categories?.map((cat) => (
            <motion.button
              key={cat.slug}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/jobs/${cat.slug}`)}
              className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                  {categoryIcons[cat.slug] || <Sparkles size={20} />}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 tracking-wide uppercase">
                    Explore Roles
                  </p>
                </div>
              </div>

              {/* RIGHT ICON */}
              <ChevronRight
                size={18}
                className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-medium">
            <Zap size={14} />
            Updated daily with latest hiring trends
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default PopularJobs;
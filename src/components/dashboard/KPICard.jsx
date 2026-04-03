// ./src/components/dashboard/common/KPICard.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const KPICard = ({
  title,
  value = 0,
  icon: Icon,
  color = "text-blue-600",
  borderColor = "border-blue-500",
  prefix = "",
  suffix = "",
  navigateTo,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      onClick={handleClick}
      className={`
        lwd-card
        relative group
        ${navigateTo ? "cursor-pointer" : ""}
      `}
    >


      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">
            {title}
          </p>
          <h3 className={`text-3xl font-bold tracking-tight ${color}`}>
            {prefix}{value?.toLocaleString?.() ?? 0}{suffix}
          </h3>
        </div>

        {Icon && (
          <div className={`p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 group-hover:shadow-md transition-all`}>
            <Icon size={28} className={color} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {navigateTo && (
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          View Details
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </div>
      )}
    </motion.div>
  );
};

export default KPICard;
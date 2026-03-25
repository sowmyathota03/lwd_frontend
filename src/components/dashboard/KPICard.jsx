// ./src/components/dashboard/common/KPICard.jsx
import { useNavigate } from "react-router-dom";

const KPICard = ({
  title,
  value = 0,
  icon: Icon,
  color,
  borderColor,
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
    <div
      onClick={handleClick}
      className={`
        lwd-card
        border-2 ${borderColor}
        rounded-xl p-5
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        ${navigateTo ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex items-center justify-between">

        {/* Left Content */}
        <div>
          <p className={`text-sm font-medium ${color} opacity-80`}>
            {title}
          </p>

          <p className={`text-2xl font-bold mt-1 ${color}`}>
            {prefix}
            {value?.toLocaleString?.() ?? 0}
            {suffix}
          </p>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={`
              p-3 rounded-lg border ${borderColor} shadow-sm
              bg-white dark:bg-slate-700
            `}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
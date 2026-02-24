// ./src/components/dashboard/common/KPICard.jsx
import { useNavigate } from "react-router-dom";

const KPICard = ({
  title,
  value = 0,
  icon: Icon,
  color,
  bgColor,
  borderColor,
  prefix = "",
  suffix = "",
  navigateTo, // 🔥 pass route here
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
        ${bgColor}
        border-2 ${borderColor}
        rounded-xl shadow-md p-5
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        ${navigateTo ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex items-center justify-between">
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

        {Icon && (
          <div
            className={`p-3 rounded-lg bg-white border ${borderColor} shadow-sm`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;

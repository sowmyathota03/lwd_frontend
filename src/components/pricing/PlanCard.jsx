// src/components/plans/PlanCard.jsx
export default function PlanCard({ plan, onSubscribe, currentPlan }) {
  const isCurrent = currentPlan?.planName === plan.planName;

  // 🔤 Format feature name nicely
  const formatFeatureName = (code) =>
    code
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // Helper to display feature value
  const getFeatureDisplay = (feature) => {
    if (!feature.enabled) {
      return {
        icon: "❌",
        text: "Not included",
        className: "text-gray-400",
      };
    }
    if (feature.limitValue == null) {
      return {
        icon: "∞",
        text: "Unlimited",
        className: "text-green-600",
      };
    }
    return {
      icon: "✓",
      text: `${feature.limitValue} / ${feature.limitType?.toLowerCase()}`,
      className: "text-blue-600",
    };
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-lg border overflow-hidden 
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
        flex flex-col h-full p-6
        ${isCurrent ? "ring-2 ring-green-500 ring-offset-2" : "border-gray-200"}
      `}
    >
      {/* Current Plan Badge - positioned absolutely */}
      {isCurrent && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Current Plan
          </span>
        </div>
      )}

      {/* Card Header with subtle gradient */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{plan.planName}</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-blue-600">₹{plan.price}</span>
          <span className="ml-2 text-gray-500">/{plan.durationDays} days</span>
        </div>
      </div>

      {/* Features List */}
      <div className="px-6 py-5 grow">
        <ul className="space-y-3">
          {plan.features?.map((feature, idx) => {
            const display = getFeatureDisplay(feature);
            return (
              <li key={idx} className="flex items-start text-sm">
                <span className={`mr-3 text-base ${display.className}`}>
                  {display.icon}
                </span>
                <span className="flex-1 text-gray-700">
                  {formatFeatureName(feature.featureCode)}
                </span>
                <span className={`ml-2 text-xs font-medium ${display.className}`}>
                  {display.text}
                </span>
              </li>
            );
          })}
        </ul>

        {/* If no features, show placeholder */}
        {(!plan.features || plan.features.length === 0) && (
          <p className="text-sm text-gray-400 italic">No features listed</p>
        )}
      </div>

      {/* Action Button */}
      <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
        <button
          disabled={isCurrent}
          onClick={() => onSubscribe(plan.planId)}
          className={`
            w-full py-3 px-4 rounded-xl font-semibold text-sm
            transition-all duration-200 transform
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              isCurrent
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:scale-95"
            }
          `}
        >
          {isCurrent ? "Current Plan" : "Choose Plan"}
        </button>
      </div>
    </div>
  );
}
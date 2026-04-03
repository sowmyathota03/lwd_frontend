export default function PlanCard({
  plan,
  onSubscribe,
  onCancel,
  currentPlan,
  loading = false,
  cancelLoading = false,
}) {
  const isCurrent = currentPlan?.planName === plan.planName;

  const formatFeatureName = (code) =>
    code
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const getFeatureDisplay = (feature) => {
    if (!feature.enabled) {
      return {
        icon: "❌",
        text: "Not included",
        className: "text-slate-400 dark:text-slate-500",
      };
    }

    if (feature.limitValue == null) {
      return {
        icon: "∞",
        text: "Unlimited",
        className: "text-green-600 dark:text-green-400",
      };
    }

    return {
      icon: "✓",
      text: `${feature.limitValue} / ${feature.limitType?.toLowerCase()}`,
      className: "text-blue-600 dark:text-blue-400",
    };
  };

  return (
    <div
      className={`
        relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 shadow-lg
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        dark:bg-slate-900 dark:border-slate-800
        ${
          isCurrent
            ? "ring-2 ring-green-500 ring-offset-2 dark:ring-offset-slate-950 border-green-200 dark:border-green-700/50"
            : "border-slate-200"
        }
      `}
    >
      {isCurrent && (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Current Plan
          </span>
        </div>
      )}

      <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-5 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900">
        <h3 className="mb-1 text-2xl font-bold text-slate-800 dark:text-slate-100">
          {plan.planName}
        </h3>

        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            ₹{plan.price}
          </span>
          <span className="ml-2 text-slate-500 dark:text-slate-400">
            /{plan.durationDays} days
          </span>
        </div>
      </div>

      <div className="grow px-6 py-5">
        <ul className="space-y-3">
          {plan.features?.map((feature, idx) => {
            const display = getFeatureDisplay(feature);

            return (
              <li key={idx} className="flex items-start text-sm">
                <span className={`mr-3 text-base ${display.className}`}>
                  {display.icon}
                </span>

                <span className="flex-1 text-slate-700 dark:text-slate-300">
                  {formatFeatureName(feature.featureCode)}
                </span>

                <span className={`ml-2 text-xs font-medium ${display.className}`}>
                  {display.text}
                </span>
              </li>
            );
          })}
        </ul>

        {(!plan.features || plan.features.length === 0) && (
          <p className="text-sm italic text-slate-400 dark:text-slate-500">
            No features listed
          </p>
        )}
      </div>

      <div className="space-y-3 border-t border-slate-100 bg-slate-50 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/60">
        {isCurrent ? (
          <>
            <button
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            >
              Current Plan
            </button>

            <button
              onClick={onCancel}
              disabled={cancelLoading}
              className={`
                w-full rounded-xl px-4 py-3 text-sm font-semibold
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                dark:focus:ring-offset-slate-900
                ${
                  cancelLoading
                    ? "cursor-not-allowed bg-red-300 text-white dark:bg-red-400/70"
                    : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:scale-95"
                }
              `}
            >
              {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
            </button>
          </>
        ) : (
          <button
            disabled={loading}
            onClick={() => onSubscribe(plan.planId)}
            className={`
              w-full rounded-xl px-4 py-3 text-sm font-semibold
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              dark:focus:ring-offset-slate-900
              ${
                loading
                  ? "cursor-not-allowed bg-blue-300 text-white dark:bg-blue-400/70"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:scale-95"
              }
            `}
          >
            {loading ? "Processing..." : "Choose Plan"}
          </button>
        )}
      </div>
    </div>
  );
}
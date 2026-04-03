import { useEffect, useState } from "react";
import {
  getCandidatePlans,
  subscribePlan,
  getCurrentSubscription,
  cancelSubscription,
} from "../../api/pricingApi";
import PlanCard from "../../components/pricing/PlanCard";

export default function CandidatePlans() {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
    fetchCurrent();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getCandidatePlans();
      setPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setPlans([]);
    }
  };

  const fetchCurrent = async () => {
    try {
      const data = await getCurrentSubscription();
      setCurrentPlan(data || null);
    } catch (error) {
      setCurrentPlan(null);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      setLoadingPlanId(planId);
      await subscribePlan(planId);
      await fetchCurrent();
      alert("Subscribed successfully!");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert(error?.response?.data?.message || "Failed to subscribe.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your current subscription?",
    );

    if (!confirmed) return;

    try {
      setCancelLoading(true);
      await cancelSubscription();
      await fetchCurrent();
      alert("Subscription cancelled successfully!");
    } catch (error) {
      console.error("Cancel subscription failed:", error);
      alert(error?.response?.data?.message || "Failed to cancel subscription.");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="lwd-page min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Candidate Plans
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Choose the best plan for your job search journey.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {plans.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No plans available right now.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {plans.map((plan) => (
                <div key={plan.planId} className="w-full sm:w-[320px]">
                  <PlanCard
                    plan={plan}
                    currentPlan={currentPlan}
                    onSubscribe={handleSubscribe}
                    onCancel={handleCancelSubscription}
                    loading={loadingPlanId === plan.planId}
                    cancelLoading={cancelLoading}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

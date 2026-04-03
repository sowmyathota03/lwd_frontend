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
      setPlans(data);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  const fetchCurrent = async () => {
    try {
      const data = await getCurrentSubscription();
      setCurrentPlan(data);
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
    try {
      const confirmed = window.confirm(
        "Are you sure you want to cancel your current subscription?"
      );

      if (!confirmed) return;

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
    <div className="flex justify-center p-4">
      <div className="p-6 gap-6 justify-items-center flex flex-wrap">
        {plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            currentPlan={currentPlan}
            onSubscribe={handleSubscribe}
            onCancel={handleCancelSubscription}
            loading={loadingPlanId === plan.planId}
            cancelLoading={cancelLoading}
          />
        ))}
      </div>
    </div>
  );
}
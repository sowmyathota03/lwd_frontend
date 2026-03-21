import { useEffect, useState } from "react";
import {
  getRecruiterPlans,
  subscribePlan,
  getCurrentSubscription,
} from "../../api/pricingApi";
import PlanCard from "../../components/pricing/PlanCard";

export default function RecruiterPlans() {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
    fetchCurrent();
  }, []);

  const fetchPlans = async () => {
    const data = await getRecruiterPlans();
    setPlans(data);
  };

  const fetchCurrent = async () => {
    try {
      const data = await getCurrentSubscription();
      setCurrentPlan(data);
    } catch {
      setCurrentPlan(null);
    }
  };

  const handleSubscribe = async (planId) => {
    await subscribePlan(planId);
    fetchCurrent();
    alert("Subscribed successfully!");
  };

  return (
    <div className="flex justify-center p-4">
      <div className="flex p-6 gap-6 justify-items-center">
        {plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            currentPlan={currentPlan}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import AdminPlanFeatures from "../../components/pricing/AdminPlanFeatures";

export default function AdminPlanFeaturesPage() {
  const { planId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Manage Plan Features
      </h1>

      <AdminPlanFeatures planId={planId} />
    </div>
  );
}


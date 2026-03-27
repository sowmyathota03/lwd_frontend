import { useParams } from "react-router-dom";
import AdminPlanFeatures from "../../components/pricing/AdminPlanFeatures";

export default function AdminPlanFeaturesPage() {
  const { planId } = useParams();

  return (
    <div className="lwd-page p-6">
      <div className="lwd-container">
        <h1 className="lwd-page-title mb-6">Manage Plan Features</h1>
        <AdminPlanFeatures planId={planId} />
      </div>
    </div>
  );
}
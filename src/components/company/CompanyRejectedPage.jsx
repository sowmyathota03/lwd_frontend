import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCompany } from "../../api/CompanyApi";
import Loader from "../common/Loader";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function CompanyRejectedPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const data = await getMyCompany();
      setCompany(data);
    } catch (err) {
      console.error("Failed to load company", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="lwd-page flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
          <p className="lwd-text mt-4">Loading company status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page py-10">
      <div className="lwd-container max-w-3xl">
        <div className="lwd-card text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <XCircleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="lwd-title text-2xl mt-5">Company Rejected</h1>

          <p className="lwd-text mt-3">
            Your company profile was rejected. Please review the information,
            update it, and submit again.
          </p>

          {company && (
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {company.companyName}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Status: Rejected
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => navigate("/company/profile")}
              className="lwd-btn-primary flex items-center gap-2"
            >
              <PencilSquareIcon className="w-4 h-4" />
              Update Company Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
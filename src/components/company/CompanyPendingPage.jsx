import { useEffect, useState } from "react";
import { getMyCompany } from "../../api/CompanyApi";
import Loader from "../common/Loader";
import { ClockIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function CompanyPendingPage() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <ClockIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>

          <h1 className="lwd-title text-2xl mt-5">Company Under Review</h1>

          <p className="lwd-text mt-3">
            Your company profile has been submitted successfully and is currently
            waiting for admin approval.
          </p>

          {company && (
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left">
              <div className="flex items-center gap-3">
                <BuildingOffice2Icon className="w-5 h-5 text-slate-500" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {company.companyName}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Status: Pending Approval
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center gap-3">
            <button onClick={loadCompany} className="lwd-btn-primary">
              Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
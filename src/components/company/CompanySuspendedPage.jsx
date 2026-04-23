import { useEffect, useState } from "react";
import { getMyCompany } from "../../api/CompanyApi";
import Loader from "../common/Loader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CompanySuspendedPage() {
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
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <ExclamationTriangleIcon className="w-8 h-8 text-slate-700 dark:text-slate-300" />
          </div>

          <h1 className="lwd-title text-2xl mt-5">Company Suspended</h1>

          <p className="lwd-text mt-3">
            Your company account has been suspended. Some features are currently
            disabled. Please contact support or the platform administrator.
          </p>

          {company && (
            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {company.companyName}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Status: Suspended
              </p>
            </div>
          )}

          <div className="mt-6">
            <button className="lwd-btn-secondary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
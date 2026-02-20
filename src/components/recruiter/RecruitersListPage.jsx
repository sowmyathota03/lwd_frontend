import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  approveRecruiter,
  blockRecruiter,
  getRecruitersByCompanyId
} from "../api/AdminApi";
import Loader from "../common/Loader";

export default function RecruitersListPage() {
  const { companyId } = useParams();

  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [confirm, setConfirm] = useState({
    open: false,
    recruiter: null,
    action: null,
  });

  useEffect(() => {
    fetchRecruiters();
  }, [companyId]);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const data = await getRecruitersByCompanyId(companyId);
      setRecruiters(data || []);
    } catch (err) {
      console.error("Failed to load recruiters", err);
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (recruiter, action) => {
    setConfirm({ open: true, recruiter, action });
  };

  const closeConfirm = () => {
    setConfirm({ open: false, recruiter: null, action: null });
  };

  const handleAction = async () => {
    const { recruiter, action } = confirm;
    if (!recruiter) return;

    try {
      setActionLoadingId(recruiter.id);

      let updated;

      if (action === "APPROVE") {
        updated = await approveRecruiter(recruiter.id);
      } else if (action === "BLOCK") {
        updated = await blockRecruiter(recruiter.id, true);
      } else if (action === "UNBLOCK") {
        updated = await blockRecruiter(recruiter.id, false);
      }

      setRecruiters(prev =>
        prev.map(r => (r.id === updated.id ? updated : r))
      );
    } catch (err) {
      console.error("Action failed", err);
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Company Recruiters
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Company ID: {companyId}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            <Loader fullScreen={false} />
          </div>
        ) : recruiters.length === 0 ? (
          <div className="p-10 text-center text-gray-500 dark:text-gray-400">
            No recruiters found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              
              {/* Table Head */}
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recruiters.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                      {r.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {r.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            r.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : r.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex flex-wrap gap-2">

                      {r.status === "PENDING" && (
                        <button
                          onClick={() => openConfirm(r, "APPROVE")}
                          disabled={actionLoadingId === r.id}
                          className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-sm hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                      )}

                      {r.status === "ACTIVE" && (
                        <button
                          onClick={() => openConfirm(r, "BLOCK")}
                          disabled={actionLoadingId === r.id}
                          className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                        >
                          Block
                        </button>
                      )}

                      {r.status === "BLOCKED" && (
                        <button
                          onClick={() => openConfirm(r, "UNBLOCK")}
                          disabled={actionLoadingId === r.id}
                          className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
                        >
                          Unblock
                        </button>
                      )}

                      <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
                        View Jobs
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Confirm Action
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to{" "}
              <span className="font-bold">{confirm.action}</span>{" "}
              recruiter{" "}
              <span className="font-bold">{confirm.recruiter.name}</span>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleAction}
                disabled={actionLoadingId === confirm.recruiter.id}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {actionLoadingId ? "Processing..." : "Confirm"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

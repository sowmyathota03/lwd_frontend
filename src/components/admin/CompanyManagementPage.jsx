import { useEffect, useState } from "react";
import {
  getAllCompanies,
  blockCompany,
  unblockCompany,
} from "../../api/AdminApi";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [confirmCompany, setConfirmCompany] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const navigate = useNavigate();

  const loadCompanies = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNumber, size);
      setCompanies(data.content);
      setTotalPages(data.totalPages);
      setPage(data.pageNumber);
    } catch (err) {
      console.error("Failed to load companies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleNext = () => {
    if (page < totalPages - 1) {
      loadCompanies(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      loadCompanies(page - 1);
    }
  };

  const openConfirm = (company) => setConfirmCompany(company);

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmCompany(null);
  };

  const confirmAction = async () => {
    if (!confirmCompany) return;

    try {
      setActionLoadingId(confirmCompany.id);

      if (confirmCompany.isActive) {
        await blockCompany(confirmCompany.id);
      } else {
        await unblockCompany(confirmCompany.id);
      }

      setCompanies((prev) =>
        prev.map((c) =>
          c.id === confirmCompany.id
            ? { ...c, isActive: !c.isActive }
            : c
        )
      );
    } catch (err) {
      console.error("Company action failed", err);
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  return (
    <div className="lwd-page min-h-screen p-6">

      {/* Heading */}
      <h1 className="lwd-title text-2xl mb-6">
        Company Management
      </h1>

      {/* Table */}
      <div className="lwd-card overflow-hidden overflow-x-auto">

        {loading ? (
          <Loader fullScreen={false} />
        ) : (
          <table className="lwd-table text-sm">

            <thead className="lwd-table-header">
              <tr>
                <th className="px-6 py-3 text-left">Company</th>
                <th className="px-6 py-3 text-left">Created By</th>
                <th className="px-6 py-3 text-left">Recruiters</th>
                <th className="px-6 py-3 text-left">Jobs</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 lwd-text">
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr key={company.id} className="lwd-table-row hover:bg-slate-100 dark:hover:bg-slate-800 transition">

                    <td
                      className="px-4 py-2 font-medium cursor-pointer lwd-link"
                      onClick={() =>
                        navigate(`/admin/${company.id}/companyprofile`)
                      }
                    >
                      {company.companyName}
                    </td>

                    <td className="px-4 py-2 lwd-text">
                      {company.createdByName || "N/A"}
                    </td>

                    <td className="px-4 py-2">
                      <span className="lwd-badge">
                        {company.totalRecruiters ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <span className="lwd-badge">
                        {company.totalJobs ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${company.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {company.isActive ? "ACTIVE" : "BLOCKED"}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <button
                        disabled={actionLoadingId === company.id}
                        onClick={() => openConfirm(company)}
                        className={`text-sm font-medium disabled:opacity-50 ${company.isActive
                            ? "lwd-btn-secondary"
                            : "lwd-btn-primary"
                          }`}
                      >
                        {actionLoadingId === company.id
                          ? "Processing..."
                          : company.isActive
                            ? "Block"
                            : "Unblock"}
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">

        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="lwd-btn-secondary disabled:opacity-50"
        >
          Previous
        </button>

        <span className="lwd-text font-semibold">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="lwd-btn-primary disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}
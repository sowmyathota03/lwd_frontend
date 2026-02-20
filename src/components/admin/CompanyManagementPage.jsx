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

  // ================= FETCH COMPANIES =================
  const loadCompanies = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNumber, size);

      setCompanies(data.content);        // ✅ FIX
      setTotalPages(data.totalPages);    // ✅ store total pages
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

  // ================= PAGINATION =================
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

  // ================= CONFIRM MODAL =================
  const openConfirm = (company) => {
    setConfirmCompany(company);
  };

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmCompany(null);
  };

  // ================= BLOCK / UNBLOCK =================
  const confirmAction = async () => {
    if (!confirmCompany) return;

    try {
      setActionLoadingId(confirmCompany.id);

      if (confirmCompany.isActive) {
        await blockCompany(confirmCompany.id);
      } else {
        await unblockCompany(confirmCompany.id);
      }

      // Update only that company
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
    <div className=" bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-blue-900 mb-6">
        Company Management
      </h1>

      <div className="bg-white shadow-md overflow-hidden">
        {loading ? (
          <Loader fullScreen={false} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-blue-50">
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
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td
                      className="px-4 py-2 font-medium text-gray-800 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/admin/${company.id}/companyprofile`)
                      }
                    >
                      {company.companyName}
                    </td>

                    <td className="px-4 py-2 text-gray-600">
                      {company.createdByName || "N/A"}
                    </td>

                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                        {company.totalRecruiters ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                        {company.totalJobs ?? 0}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          company.isActive
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
                        className={`px-3 py-1.5 rounded text-sm font-medium text-white transition disabled:opacity-50 ${
                          company.isActive
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-600 hover:bg-green-700"
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

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

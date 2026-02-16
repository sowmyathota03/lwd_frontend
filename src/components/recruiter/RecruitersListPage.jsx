import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecruitersListPage.css";
import {
  approveRecruiter,
  blockRecruiter,
  getRecruitersByCompanyId
} from "../api/AdminApi";


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

  // ================= FETCH RECRUITERS =================
  useEffect(() => {
    fetchRecruiters();
  }, [companyId]);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const data = await getRecruitersByCompanyId(companyId);
      console.log("Fetched recruiters:", data);
      setRecruiters(data || []);
    } catch (err) {
      console.error("Failed to load recruiters", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= MODAL =================
  const openConfirm = (recruiter, action) => {
    setConfirm({ open: true, recruiter, action });
  };

  const closeConfirm = () => {
    setConfirm({ open: false, recruiter: null, action: null });
  };

  // ================= ACTION HANDLER =================
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

  // ================= UI =================
  return (
    <div className="recruiters-page">
      <div className="recruiters-header">
        <h1>Company Recruiters</h1>
        <p>Company ID: {companyId}</p>
      </div>

      <div className="recruiters-card">
        {loading ? (
          <p className="loading">Loading recruiters...</p>
        ) : recruiters.length === 0 ? (
          <p className="no-data">No recruiters found</p>
        ) : (
          <table className="recruiters-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recruiters.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>
                    <span className={`status ${r.status.toLowerCase()}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      {r.status === "PENDING" && (
                        <button
                          className="approve"
                          onClick={() => openConfirm(r, "APPROVE")}
                          disabled={actionLoadingId === r.id}
                        >
                          Approve
                        </button>
                      )}

                      {r.status === "ACTIVE" && (
                        <button
                          className="block"
                          onClick={() => openConfirm(r, "BLOCK")}
                          disabled={actionLoadingId === r.id}
                        >
                          Block
                        </button>
                      )}

                      {r.status === "BLOCKED" && (
                        <button
                          className="unblock"
                          onClick={() => openConfirm(r, "UNBLOCK")}
                          disabled={actionLoadingId === r.id}
                        >
                          Unblock
                        </button>
                      )}

                      <button className="view">View Jobs</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= CONFIRM MODAL ================= */}
      {confirm.open && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to{" "}
              <strong>{confirm.action}</strong> recruiter{" "}
              <strong>{confirm.recruiter.name}</strong>?
            </p>

            <div className="confirm-actions">
              <button className="btn cancel" onClick={closeConfirm}>
                Cancel
              </button>
              <button
                className="btn confirm"
                onClick={handleAction}
                disabled={actionLoadingId === confirm.recruiter.id}
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

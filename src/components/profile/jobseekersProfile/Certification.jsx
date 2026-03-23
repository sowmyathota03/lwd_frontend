import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import {
  getMyCertifications,
  getCertificationsByUserId,
} from "../../../api/CertificationApi";
import CertificationForm from "./CertificationForm";

function Certification({ userId, editable }) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const canEdit = editable && !userId;

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = userId
          ? await getCertificationsByUserId(userId)
          : await getMyCertifications();
        setCertifications(data || []);
      } catch (err) {
        console.error("Error fetching certifications", err);
        setError("Failed to load certifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [userId]);

  const certToEdit =
    editingId === "new"
      ? null
      : certifications.find((c) => c.id === editingId);

  const handleSave = (savedCert) => {
    if (editingId === "new") {
      setCertifications([savedCert, ...certifications]);
    } else {
      setCertifications(
        certifications.map((c) =>
          c.id === savedCert.id ? savedCert : c
        )
      );
    }
    setEditingId(null);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="lwd-card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="lwd-title">Certifications</h2>
          {canEdit && <div className="lwd-skeleton h-9 w-20" />}
        </div>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="lwd-skeleton p-4 space-y-2">
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-slate-700 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title mb-2">Certifications</h2>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Certifications</h2>

        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary flex items-center gap-1"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        )}
      </div>

      {/* Empty */}
      {certifications.length === 0 && (
        <div className="text-center py-6">
          <p className="lwd-text">
            {canEdit
              ? "No certifications added yet. Click 'Add' to get started."
              : "No certifications listed."}
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="lwd-card lwd-card-hover relative bg-gray-50 dark:bg-slate-800"
          >
            {/* Edit */}
            {canEdit && (
              <button
                onClick={() => setEditingId(cert.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 pr-8">
                {cert.certificateName}
              </h3>

              {cert.issuingOrganization && (
                <p className="lwd-text font-medium">
                  {cert.issuingOrganization}
                </p>
              )}

              {(cert.issueDate || cert.expiryDate) && (
                <p className="lwd-text">
                  {cert.issueDate} — {cert.expiryDate || "Present"}
                </p>
              )}

              {cert.credentialId && (
                <p className="lwd-text">
                  <span className="font-medium">Credential ID:</span>{" "}
                  {cert.credentialId}
                </p>
              )}

              {cert.skillTag && (
                <p className="lwd-text">
                  <span className="font-medium">Skill:</span>{" "}
                  {cert.skillTag}
                </p>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lwd-link flex items-center gap-1 text-sm"
                >
                  Credential URL
                </a>
              )}

              {cert.certificateFile && (
                <p className="lwd-text">
                  <span className="font-medium">File:</span>{" "}
                  {cert.certificateFile}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingId && (
        <CertificationForm
          certification={certToEdit}
          onClose={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Certification;
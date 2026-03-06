import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyCertifications, getCertificationsByUserId } from "../../api/CertificationApi";
import CertificationForm from "./CertificationForm";

function Certification({ userId, editable }) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | certification.id

  /* ================= LOAD DATA ON MOUNT ================= */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = userId
          ? await getCertificationsByUserId(userId)
          : await getMyCertifications();
        setCertifications(data);
      } catch (err) {
        console.error("Error fetching certifications", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  /* ================= GET CURRENT EDIT ================= */
  const certToEdit =
    editingId === "new"
      ? null
      : certifications.find((c) => c.id === editingId);

  /* ================= HANDLE SAVE (CREATE / UPDATE) ================= */
  const handleSave = (savedCert) => {
    if (editingId === "new") {
      setCertifications([savedCert, ...certifications]);
    } else {
      setCertifications(
        certifications.map((c) => (c.id === savedCert.id ? savedCert : c))
      );
    }
    setEditingId(null);
  };

  if (loading) return <p>Loading certifications...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        {editable && (
          <button
            className="text-white bg-blue-500 px-3 py-1 rounded"
            onClick={() => setEditingId("new")}
          >
            + Add
          </button>
        )}
      </div>

      {/* List */}
      {certifications.length === 0 && (
        <p className="text-gray-500">No certifications added.</p>
      )}

      {certifications.map((c) => (
        <div key={c.id} className="py-3 flex justify-between items-start hover:shadow transition rounded-lg">
          <div className="p-4 rounded-lg ">
            <h3 className="font-semibold">{c.certificateName}</h3>
            <p className="text-sm text-gray-600 mt-1">{c.issuingOrganization}</p>
            {(c.issueDate || c.expiryDate) && (
              <p className="text-sm text-gray-500 mt-1">
                {c.issueDate} - {c.expiryDate || "Present"}
              </p>
            )}
            {c.credentialId && <p className="text-sm text-gray-500 mt-1">Credential ID: {c.credentialId}</p>}
            {c.credentialUrl && (
              <p className="text-sm text-blue-500 mt-1">
                <a href={c.credentialUrl} target="_blank" rel="noreferrer">
                  Credential URL
                </a>
              </p>
            )}
            {c.skillTag && <p className="text-sm text-gray-500 mt-1">Skill: {c.skillTag}</p>}
            {c.certificateFile && (
              <p className="text-sm text-gray-500 mt-1">
                File: {c.certificateFile}
              </p>
            )}
          </div>

          {editable && (
            <button
              onClick={() => setEditingId(c.id)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 transition"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      ))}

      {/* Modal Form */}
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

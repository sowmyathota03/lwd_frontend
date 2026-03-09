import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyCertifications, getCertificationsByUserId } from "../../api/CertificationApi";
import CertificationForm from "./CertificationForm";

function Certification({ userId, editable }) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Load certifications
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

  const certToEdit = editingId === "new" ? null : certifications.find(c => c.id === editingId);

  const handleSave = (savedCert) => {
    if (editingId === "new") {
      setCertifications([savedCert, ...certifications]);
    } else {
      setCertifications(certifications.map(c => (c.id === savedCert.id ? savedCert : c)));
    }
    setEditingId(null);
  };

  if (loading) return <p className="p-3 text-gray-500">Loading certifications...</p>;

  return (
    <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Certifications</h2>
        {editable && (
          <button
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setEditingId("new")}
          >
            + Add
          </button>
        )}
      </div>

      {/* No certifications */}
      {certifications.length === 0 && (
        <p className="text-gray-500">No certifications added.</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {certifications.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition"
          >
            <div className="flex-1 space-y-1">
              {/* Heading + edit button same line */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-base">
                  {c.certificateName}
                </h3>
                {editable && (
                  <button
                    onClick={() => setEditingId(c.id)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>

              {c.issuingOrganization && (
                <p className="text-gray-700">{c.issuingOrganization}</p>
              )}
              {(c.issueDate || c.expiryDate) && (
                <p className="text-gray-600">{c.issueDate} - {c.expiryDate || "Present"}</p>
              )}
              {c.credentialId && <p className="text-gray-600">Credential ID: {c.credentialId}</p>}
              {c.skillTag && <p className="text-gray-600">Skill: {c.skillTag}</p>}
              {c.credentialUrl && (
                <p className="text-blue-600">
                  <a href={c.credentialUrl} target="_blank" rel="noreferrer">Credential URL</a>
                </p>
              )}
              {c.certificateFile && <p className="text-gray-600">File: {c.certificateFile}</p>}
            </div>
          </div>
        ))}
      </div>

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
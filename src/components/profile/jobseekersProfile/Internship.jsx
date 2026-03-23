import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyInternships, getInternshipsByUserId } from "../../../api/InternshipApi";
import InternshipForm from "./InternshipForm";

function Internship({ userId, editable }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const canEdit = editable && !userId;

  useEffect(() => {
    const fetchInternships = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = userId
          ? await getInternshipsByUserId(userId)
          : await getMyInternships();
        setInternships(data || []);
      } catch (err) {
        console.error("Error fetching internships", err);
        setError("Failed to load internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [userId]);

  const internshipToEdit =
    editingId === "new"
      ? null
      : internships.find((i) => i.id === editingId);

  const handleSave = (savedInternship) => {
    if (editingId === "new") {
      setInternships([savedInternship, ...internships]);
    } else {
      setInternships(
        internships.map((i) =>
          i.id === savedInternship.id ? savedInternship : i
        )
      );
    }
    setEditingId(null);
  };

  // Loading
  if (loading) {
    return (
      <div className="lwd-card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="lwd-title">Internships</h2>
          {canEdit && <div className="h-9 w-20 lwd-skeleton" />}
        </div>

        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="lwd-skeleton p-4 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title mb-2">Internships</h2>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">Internships</h2>

        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary flex items-center gap-1"
          >
            +
            Add
          </button>
        )}
      </div>

      {/* Empty */}
      {internships.length === 0 && (
        <div className="text-center py-8">
          <p className="lwd-text">
            {canEdit
              ? "No internships added yet. Click 'Add' to get started."
              : "No internships listed."}
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {internships.map((internship) => (
          <div
            key={internship.id}
            className="group relative bg-gray-50 dark:bg-slate-800 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {canEdit && (
              <button
                onClick={() => setEditingId(internship.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition"
              >
                <Pencil size={18} />
              </button>
            )}

            <div className="space-y-2">
              <h3 className="font-semibold text-base pr-8 dark:text-white">
                {internship.role}
              </h3>

              <div className="text-sm flex flex-wrap items-center gap-x-2">
                <span className="font-medium">
                  {internship.companyName}
                </span>

                {internship.location && (
                  <>
                    <span>•</span>
                    <span>{internship.location}</span>
                  </>
                )}

                {internship.employmentType && (
                  <>
                    <span>•</span>
                    <span>{internship.employmentType}</span>
                  </>
                )}
              </div>

              {(internship.startDate || internship.endDate) && (
                <p className="lwd-text">
                  {internship.startDate} — {internship.endDate || "Present"}
                </p>
              )}

              {internship.description && (
                <p className="lwd-text">
                  {internship.description}
                </p>
              )}

              {internship.skills && (
                <p className="lwd-text">
                  <span className="font-medium">Skills:</span>{" "}
                  {internship.skills}
                </p>
              )}

              {internship.stipend && (
                <p className="lwd-text">
                  <span className="font-medium">Stipend:</span> ₹
                  {internship.stipend}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingId && (
        <InternshipForm
          internship={internshipToEdit}
          onClose={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Internship;
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyInternships, getInternshipsByUserId } from "../../api/InternshipApi";
import InternshipForm from "./InternshipForm";

function Internship({ userId, editable }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | internship.id

  // ================= LOAD DATA ON MOUNT =================
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = userId
          ? await getInternshipsByUserId(userId)
          : await getMyInternships();
        setInternships(data || []);
      } catch (err) {
        console.error("Error fetching internships", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
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

  if (loading) return <p className="p-3 text-gray-500">Loading internships...</p>;

  return (
    <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Internships</h2>
        {editable && (
          <button
            onClick={() => setEditingId("new")}
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            + Add
          </button>
        )}
      </div>

      {/* No internships */}
      {internships.length === 0 && (
        <p className="text-gray-500">No internships added.</p>
      )}

      {/* List */}
      <div className="space-y-3">
        {internships.map((i) => (
          <div
            key={i.id}
            className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition"
          >
            <div className="flex-1 space-y-1">
              {/* Heading + edit button same line */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-base">{i.role}</h3>
                {editable && (
                  <button
                    onClick={() => setEditingId(i.id)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>

              <div className="text-gray-700 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span>{i.companyName}</span>
                {i.location && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span>{i.location}</span>
                  </>
                )}
              </div>

              {(i.startDate || i.endDate) && (
                <p className="text-gray-600 text-sm">
                  {i.startDate} - {i.endDate || "Present"}
                </p>
              )}

              {i.description && <p className="text-gray-600 text-sm">{i.description}</p>}
              {i.skills && <p className="text-gray-600 text-sm">Skills: {i.skills}</p>}
              {i.stipend && <p className="text-gray-600 text-sm">Stipend: ₹{i.stipend}</p>}
              {i.employmentType && <p className="text-gray-600 text-sm">Type: {i.employmentType}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
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
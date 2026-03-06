import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyInternships, getInternshipsByUserId } from "../../api/InternshipApi";
import InternshipForm from "./InternshipForm";

function Internship({ userId, editable }) {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | internship.id

  /* ================= LOAD DATA ON MOUNT ================= */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = userId
          ? await getInternshipsByUserId(userId)
          : await getMyInternships();
        setInternships(data);
      } catch (err) {
        console.error("Error fetching internships", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  /* ================= GET CURRENT EDIT ================= */
  const internshipToEdit =
    editingId === "new"
      ? null
      : internships.find((i) => i.id === editingId);

  /* ================= HANDLE SAVE (CREATE / UPDATE) ================= */
  const handleSave = (savedInternship) => {
    if (editingId === "new") {
      // Add to top of list
      setInternships([savedInternship, ...internships]);
    } else {
      // Update existing
      setInternships(
        internships.map((i) =>
          i.id === savedInternship.id ? savedInternship : i
        )
      );
    }
    setEditingId(null);
  };

  if (loading) return <p>Loading internships...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Internships</h2>
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
      {internships.length === 0 && (
        <p className="text-gray-500">No internships added.</p>
      )}

      {internships.map((i) => (
        <div key={i.id} className="py-3 flex justify-between items-start hover:shadow transition rounded-lg">
          <div className="p-4 rounded-lg ">
            <h3 className="font-semibold">{i.role}</h3>
            <div className="text-sm flex items-center text-gray-600">
              <span>{i.companyName}</span>
              {i.location && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span>{i.location}</span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {i.startDate} - {i.endDate || "Present"}
            </p>
            {i.description && <p className="text-sm text-gray-600 mt-1">{i.description}</p>}
            {i.skills && <p className="text-sm text-gray-500 mt-1">Skills: {i.skills}</p>}
            {i.stipend && <p className="text-sm text-gray-500 mt-1">Stipend: ₹{i.stipend}</p>}
            {i.employmentType && <p className="text-sm text-gray-500 mt-1">Type: {i.employmentType}</p>}
          </div>

          {editable && (
            <button
              onClick={() => setEditingId(i.id)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 transition"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      ))}

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

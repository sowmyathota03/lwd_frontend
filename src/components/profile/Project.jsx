import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyProjects, getProjectsByUserId } from "../../api/ProjectApi";
import ProjectForm from "./ProjectForm";

function Project({ userId, editable }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null | "new" | project.id

  /* ================= LOAD DATA ON MOUNT ================= */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = userId
          ? await getProjectsByUserId(userId)
          : await getMyProjects();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  /* ================= GET CURRENT EDIT ================= */
  const projectToEdit =
    editingId === "new"
      ? null
      : projects.find((p) => p.id === editingId);

  /* ================= HANDLE SAVE (CREATE / UPDATE) ================= */
  const handleSave = (savedProject) => {
    if (editingId === "new") {
      setProjects([savedProject, ...projects]); // add new project
    } else {
      setProjects(
        projects.map((p) => (p.id === savedProject.id ? savedProject : p))
      ); // update existing
    }
    setEditingId(null);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
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
      {projects.length === 0 && (
        <p className="text-gray-500">No projects added.</p>
      )}

      {projects.map((p) => (
        <div key={p.id} className="py-3 flex justify-between items-start hover:shadow transition rounded-lg">
          <div className="p-4 rounded-lg">
            <h3 className="font-semibold">{p.projectTitle}</h3>
            {p.role && (
              <p className="text-sm text-gray-600 mt-1">Role: {p.role}</p>
            )}
            {p.teamSize != null && (
              <p className="text-sm text-gray-600 mt-1">Team Size: {p.teamSize}</p>
            )}
            {p.description && (
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
            )}
            {p.technologiesUsed && (
              <p className="text-sm text-gray-500 mt-1">
                Technologies: {p.technologiesUsed}
              </p>
            )}
            {p.projectUrl && (
              <p className="text-sm text-blue-500 mt-1">
                <a href={p.projectUrl} target="_blank" rel="noreferrer">
                  Project URL
                </a>
              </p>
            )}
            {p.githubUrl && (
              <p className="text-sm text-blue-500 mt-1">
                <a href={p.githubUrl} target="_blank" rel="noreferrer">
                  GitHub URL
                </a>
              </p>
            )}
            {(p.startDate || p.endDate) && (
              <p className="text-sm text-gray-500 mt-1">
                {p.startDate} - {p.endDate || "Present"}
              </p>
            )}
          </div>

          {editable && (
            <button
              onClick={() => setEditingId(p.id)}
              className="p-1.5 rounded-lg text-gray-600 hover:bg-blue-50 transition"
            >
              <Pencil size={16} />
            </button>
          )}
        </div>
      ))}

      {/* Modal Form */}
      {editingId && (
        <ProjectForm
          project={projectToEdit}
          onClose={() => setEditingId(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Project;

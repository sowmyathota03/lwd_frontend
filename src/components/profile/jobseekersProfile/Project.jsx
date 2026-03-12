import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyProjects, getProjectsByUserId } from "../../../api/ProjectApi";
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
    editingId === "new" ? null : projects.find((p) => p.id === editingId);

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

  if (loading)
    return <p className="p-3 text-gray-500 text-sm">Loading projects...</p>;

  return (
    <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Projects</h2>
        {editable && (
          <button
            className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => setEditingId("new")}
          >
            + Add
          </button>
        )}
      </div>

      {/* No projects */}
      {projects.length === 0 && (
        <p className="text-gray-500 text-sm">No projects added.</p>
      )}

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-start bg-white rounded-md p-4 hover:shadow transition"
          >
            <div className="flex-1 space-y-1">
              {/* Heading + Edit button same line */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 text-base">{p.projectTitle}</h3>
                {editable && (
                  <button
                    onClick={() => setEditingId(p.id)}
                    className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    <Pencil size={18} />
                  </button>
                )}
              </div>

              {p.role && <p className="text-gray-700 text-sm">Role: {p.role}</p>}
              {p.teamSize != null && (
                <p className="text-gray-700 text-sm">Team Size: {p.teamSize}</p>
              )}
              {p.description && <p className="text-gray-700 text-sm">{p.description}</p>}
              {p.technologiesUsed && (
                <p className="text-gray-600 text-sm">Technologies: {p.technologiesUsed}</p>
              )}
              {p.projectUrl && (
                <p className="text-blue-600 text-sm">
                  <a href={p.projectUrl} target="_blank" rel="noreferrer">
                    Project URL
                  </a>
                </p>
              )}
              {p.githubUrl && (
                <p className="text-blue-600 text-sm">
                  <a href={p.githubUrl} target="_blank" rel="noreferrer">
                    GitHub URL
                  </a>
                </p>
              )}
              {(p.startDate || p.endDate) && (
                <p className="text-gray-600 text-sm">
                  {p.startDate} - {p.endDate || "Present"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

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
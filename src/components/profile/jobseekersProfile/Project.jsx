import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyProjects, getProjectsByUserId } from "../../../api/ProjectApi";
import ProjectForm from "./ProjectForm";

/**
 * Project component – displays a list of projects.
 * Supports viewing own or other user's projects, with add/edit for own profile.
 */
function Project({ userId, editable }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // null | "new" | project.id

  const canEdit = editable && !userId;

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = userId
          ? await getProjectsByUserId(userId)
          : await getMyProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [userId]);

  const projectToEdit =
    editingId === "new" ? null : projects.find((p) => p.id === editingId);

  const handleSave = (savedProject) => {
    if (editingId === "new") {
      setProjects([savedProject, ...projects]);
    } else {
      setProjects(
        projects.map((p) => (p.id === savedProject.id ? savedProject : p))
      );
    }
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="lwd-card space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="lwd-title text-lg">Projects</h2>
          {canEdit && <div className="h-9 w-20 lwd-skeleton" />}
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="lwd-skeleton p-4 space-y-2">
              <div className="h-5 w-1/3 rounded" />
              <div className="h-4 w-1/2 rounded" />
              <div className="h-4 w-1/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lwd-card">
        <h2 className="lwd-title text-lg mb-2">Projects</h2>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="lwd-card space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title text-lg">Projects</h2>
        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="lwd-btn-primary flex items-center gap-1 px-3 py-1.5"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </button>
        )}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {canEdit
              ? "No projects added yet. Click 'Add' to get started."
              : "No projects listed."}
          </p>
        </div>
      )}

      {/* Project list */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="lwd-card-hover relative bg-gray-50 dark:bg-slate-800 p-5 rounded-lg transition-shadow"
          >
            {/* Edit button */}
            {canEdit && (
              <button
                onClick={() => setEditingId(project.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:ring-2 focus:ring-blue-500"
                aria-label="Edit project"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2 pr-8">
              <h3 className="lwd-title text-base">{project.projectTitle}</h3>

              {project.role && (
                <p className="lwd-text">
                  <span className="font-medium">Role:</span> {project.role}
                </p>
              )}
              {project.teamSize != null && (
                <p className="lwd-text">
                  <span className="font-medium">Team Size:</span> {project.teamSize}
                </p>
              )}
              {project.description && (
                <p className="lwd-text mt-2 leading-relaxed">{project.description}</p>
              )}
              {project.technologiesUsed && (
                <p className="lwd-text">
                  <span className="font-medium">Technologies:</span> {project.technologiesUsed}
                </p>
              )}
              {(project.startDate || project.endDate) && (
                <p className="lwd-text">
                  {project.startDate} — {project.endDate || "Present"}
                </p>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-1">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lwd-link flex items-center gap-1 text-sm"
                  >
                    Project URL
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lwd-link flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300"
                  >
                    GitHub
                  </a>
                )}
              </div>
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
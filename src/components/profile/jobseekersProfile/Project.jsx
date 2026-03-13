import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getMyProjects, getProjectsByUserId } from "../../../api/ProjectApi";
import ProjectForm from "./ProjectForm";

/**
 * Project component – displays a list of projects.
 * Supports viewing own or other user's projects, with add/edit for own profile.
 *
 * @param {Object} props
 * @param {string|number} [props.userId] - ID of the user whose projects are being viewed
 * @param {boolean} props.editable - Whether the current user can edit (if own profile)
 */
function Project({ userId, editable }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // null | "new" | project.id

  // Determine if the current user can add/edit (own profile and editable)
  const canEdit = editable && !userId;

  // Fetch projects data
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

  // Get project data for editing
  const projectToEdit =
    editingId === "new" ? null : projects.find((p) => p.id === editingId);

  // Handle save from form (optimistic update)
  const handleSave = (savedProject) => {
    if (editingId === "new") {
      setProjects([savedProject, ...projects]); // add new project at top
    } else {
      setProjects(
        projects.map((p) => (p.id === savedProject.id ? savedProject : p))
      );
    }
    setEditingId(null);
  };

  // Loading state with skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
          {canEdit && <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />}
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-2 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Projects</h2>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      {/* Header with add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
        {canEdit && (
          <button
            onClick={() => setEditingId("new")}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
          <p className="text-gray-500 text-sm">
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
            className="group relative bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            {/* Edit button (visible on hover) */}
            {canEdit && (
              <button
                onClick={() => setEditingId(project.id)}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Edit project"
              >
                <Pencil size={18} />
              </button>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 text-base pr-8">
                {project.projectTitle}
              </h3>

              {project.role && (
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Role:</span> {project.role}
                </p>
              )}

              {project.teamSize != null && (
                <p className="text-gray-700 text-sm">
                  <span className="font-medium">Team Size:</span> {project.teamSize}
                </p>
              )}

              {project.description && (
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {project.description}
                </p>
              )}

              {project.technologiesUsed && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Technologies:</span> {project.technologiesUsed}
                </p>
              )}

              {(project.startDate || project.endDate) && (
                <p className="text-gray-600 text-sm">
                  {project.startDate} — {project.endDate || "Present"}
                </p>
              )}

              <div className="flex flex-wrap gap-4 pt-1">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Project URL
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-1"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
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
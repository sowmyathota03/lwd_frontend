import { useState, useEffect } from "react";
import { createProject, updateProject } from "../../api/ProjectApi";

function ProjectForm({ project, onClose, onSave }) {
  const isEdit = !!project?.id;

  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    technologiesUsed: "",
    projectUrl: "",
    githubUrl: "",
    startDate: "",
    endDate: "",
    teamSize: "",
    role: "",
  });

  /* ================= LOAD DATA FOR EDIT ================= */
  useEffect(() => {
    if (project) {
      setFormData({
        projectTitle: project.projectTitle || "",
        description: project.description || "",
        technologiesUsed: project.technologiesUsed || "",
        projectUrl: project.projectUrl || "",
        githubUrl: project.githubUrl || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        teamSize: project.teamSize || "",
        role: project.role || "",
      });
    }
  }, [project]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let saved;
      if (isEdit) {
        saved = await updateProject(project.id, formData);
      } else {
        saved = await createProject(formData);
      }
      onSave(saved); // instant UI update
      onClose();
    } catch (error) {
      console.error("Error saving project", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-125">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="technologiesUsed"
            placeholder="Technologies Used"
            value={formData.technologiesUsed}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="projectUrl"
            placeholder="Project URL"
            value={formData.projectUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="url"
            name="githubUrl"
            placeholder="GitHub URL"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded">
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;


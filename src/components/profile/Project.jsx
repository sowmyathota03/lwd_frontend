import { useState, useEffect } from "react";
import {
  getMyProjects,
  getProjectsByUserId,
  createProject,
  updateProject
} from "../../api/ProjectApi";

import { Section, Grid, Input, Buttons } from "./Helpers";

const Project = ({ userId, editable }) => {

  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [forms, setForms] = useState([]);

  const initialForm = {
    projectTitle: "",
    technologies: "",
    startDate: "",
    endDate: "",
    description: "",
    githubLink: "",
    liveLink: ""
  };

  /* LOAD PROJECTS */

  useEffect(() => {
    const loadProjects = async () => {
      try {

        const res = !userId
          ? await getMyProjects()
          : await getProjectsByUserId(userId);

        setProjectList(res || []);

      } catch (err) {
        console.error("Project load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [userId]);

  /* EDIT ALL */

  const handleEditAll = () => {

    const allForms = projectList.map((proj) => ({
      id: proj.id,
      data: { ...proj }
    }));

    setForms(allForms);
    setEditing(true);
  };

  /* ADD FORM */

  const handleAddForm = () => {

    setForms([
      ...forms,
      { id: Date.now(), data: initialForm }
    ]);

    setEditing(true);
  };

  /* INPUT CHANGE */

  const handleChange = (id, e) => {

    setForms(
      forms.map((f) =>
        f.id === id
          ? { ...f, data: { ...f.data, [e.target.name]: e.target.value } }
          : f
      )
    );
  };

  /* SAVE */

  const handleSave = async (id) => {

    const form = forms.find((f) => f.id === id);
    if (!form) return;

    try {

      const exists = projectList.find((proj) => proj.id === id);

      if (exists) {

        await updateProject(id, form.data);

        setProjectList(
          projectList.map((proj) =>
            proj.id === id ? { ...proj, ...form.data } : proj
          )
        );

      } else {

        const res = await createProject(form.data);

        setProjectList([...projectList, res]);
      }

      const remainingForms = forms.filter((f) => f.id !== id);
      setForms(remainingForms);

      if (remainingForms.length === 0) {
        setEditing(false);
      }

    } catch (err) {
      console.error("Save project error:", err);
    }
  };

  /* CANCEL */

  const handleCancel = (id) => {

    const remainingForms = forms.filter((f) => f.id !== id);
    setForms(remainingForms);

    if (remainingForms.length === 0) {
      setEditing(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading projects...</div>;
  }

  return (
    <Section
      title="Projects"
      editable={editable}
      editing={editing}
      onEdit={handleEditAll}
    >

      {editable && (
        <button
          onClick={handleAddForm}
          className="mb-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Project
        </button>
      )}

      <div className="space-y-4">

        {/* FORMS */}

        {forms.map((f) => (

          <div key={f.id} className="p-4 border rounded-lg bg-gray-50">

            <Grid mdCols={2} lgCols={2} className="gap-4">

              <Input
                label="Project Title"
                name="projectTitle"
                value={f.data.projectTitle}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="Technologies"
                name="technologies"
                value={f.data.technologies}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={f.data.startDate}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={f.data.endDate}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="GitHub Link"
                name="githubLink"
                value={f.data.githubLink}
                onChange={(e) => handleChange(f.id, e)}
              />

              <Input
                label="Live Demo Link"
                name="liveLink"
                value={f.data.liveLink}
                onChange={(e) => handleChange(f.id, e)}
              />

            </Grid>

            <div className="mt-3">
              <Input
                label="Description"
                name="description"
                value={f.data.description}
                onChange={(e) => handleChange(f.id, e)}
              />
            </div>

            <Buttons
              onCancel={() => handleCancel(f.id)}
              onSave={() => handleSave(f.id)}
              loading={false}
            />

          </div>
        ))}

        {/* PROJECT CARDS */}

        {projectList
          .filter((proj) => !forms.some((f) => f.id === proj.id))
          .map((proj) => (

            <div
              key={proj.id}
              className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
            >

              <h3 className="text-lg font-semibold text-gray-800">
                {proj.projectTitle}
              </h3>

              {proj.technologies && (
                <p className="text-indigo-600 font-medium">
                  {proj.technologies}
                </p>
              )}

              <p className="text-sm text-gray-500 mt-1">
                {proj.startDate} - {proj.endDate || "Ongoing"}
              </p>

              {proj.description && (
                <p className="text-sm text-gray-500 mt-2">
                  {proj.description}
                </p>
              )}

              <div className="flex gap-4 mt-2">

                {proj.githubLink && (
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}

              </div>

            </div>
          ))}

      </div>

      {projectList.length === 0 && forms.length === 0 && (
        <p className="text-gray-500 text-sm">
          No project details added.
        </p>
      )}

    </Section>
  );
};

export default Project;
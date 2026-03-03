import { useEffect, useState } from "react";
// import { getProjectsByUserId, getMyProjects } from "../../../api/ProjectApi";

const Project = ({ userId, editable }) => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        let res;

        if (!userId) {
          res = await getMyProjects();
        } else {
          res = await getProjectsByUserId(userId);
        }

        setProjectList(res?.data || []);
      } catch (error) {
        console.error("Project load error", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [userId]);

  if (loading) return <p className="p-4 text-gray-500">Loading projects...</p>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">
        Projects
      </h3>

      {projectList.length === 0 ? (
        <p className="text-gray-500">No projects added.</p>
      ) : (
        <div className="relative border-l-2 border-indigo-200 pl-6 space-y-8">
          {projectList.map((project, index) => (
            <div key={index} className="relative">

              {/* Timeline Dot */}
              <span className="absolute -left-[11px] top-2 w-4 h-4 bg-indigo-600 rounded-full"></span>

              <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">

                {/* Project Title */}
                <h4 className="text-lg font-semibold text-gray-800">
                  {project.projectTitle}
                </h4>

                {/* Tech Stack */}
                {project.technologies && (
                  <p className="text-indigo-600 font-medium mt-1">
                    {project.technologies}
                  </p>
                )}

                {/* Duration */}
                <p className="text-sm text-gray-500 mt-1">
                  {project.startDate} - {project.endDate || "Ongoing"}
                </p>

                {/* Description */}
                {project.description && (
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Links */}
                <div className="flex gap-4 mt-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {editable && (
        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          + Add Project
        </button>
      )}
    </div>
  );
};

export default Project;
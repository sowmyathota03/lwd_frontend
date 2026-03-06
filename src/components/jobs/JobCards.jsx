import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { Bookmark } from "lucide-react";

function JobCards({ job, recentlyOpened = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleSaveJob = (e) => {
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const alreadySaved = savedJobs.find((j) => j.id === job.id);
    if (alreadySaved) {
      alert("Job already saved");
      return;
    }
    savedJobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    alert("Job saved successfully");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex justify-between items-start px-5 py-4 gap-4 w-full min-h-25"
    >
      {/* Left side: Job info */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {/* Title & Company */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">{job.title}</h3>
        <p className="text-sm text-gray-600 truncate">{job.company?.companyName}</p>

        {/* Location + Experience + Salary */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
          {job.location && <span>{job.location}</span>}
          {job.minExperience !== null && job.maxExperience !== null && (
            <span>{job.minExperience} - {job.maxExperience} yrs</span>
          )}
          <span>{job.salary ? `₹${job.salary.toLocaleString()} LPA` : "Salary Not Disclosed"}</span>
        </div>

        {/* Skills / Tags */}
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right side: Recently Opened + Save */}
      <div className="flex flex-col justify-between items-end gap-2">
        {recentlyOpened && (
          <span className="text-xs text-blue-600 font-medium">Recently Opened</span>
        )}

        {/* Save button with icon + text */}
        <button
          onClick={handleSaveJob}
          className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 text-gray-600 text-sm"
        >
          <Bookmark size={16} />
          <span>Save</span>
        </button>

        <span className="text-xs text-gray-400">{job.createdAt && `Posted ${timeAgo(job.createdAt)}`}</span>
      </div>
    </div>
  );
}

export default JobCards;
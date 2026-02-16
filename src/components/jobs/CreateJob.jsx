import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobAsAdmin, createJobAsRecruiter } from "../../api/JobApi";

export default function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    industry: "",
    minExperience: "",
    maxExperience: "",
    jobType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...job,
      salary: job.salary ? Number(job.salary) : null,
      minExperience: job.minExperience ? Number(job.minExperience) : null,
      maxExperience: job.maxExperience ? Number(job.maxExperience) : null,
    };

    try {
      await createJobAsRecruiter(payload);

      alert("✅ Job created successfully");
      navigate("/recruiter/managejob");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 transition-all">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create New Job
        </h2>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-2">
            Job Title *
          </label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700  mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>

        {/* Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Location
            </label>
            <input
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Industry & Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Industry
            </label>
            <input
              name="industry"
              value={job.industry}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Min Experience (Years)
            </label>
            <input
              type="number"
              name="minExperience"
              value={job.minExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700  mb-2">
              Max Experience (Years)
            </label>
            <input
              type="number"
              name="maxExperience"
              value={job.maxExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}

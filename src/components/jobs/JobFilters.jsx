import React, { useState } from "react";

const JobFilters = ({ onFilterChange }) => {
  // State for each filter
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [company, setCompany] = useState("");

  // Handle filter change
  const handleChange = (filterName, value) => {
    switch (filterName) {
      case "location":
        setLocation(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "jobType":
        setJobType(value);
        break;
      case "company":
        setCompany(value);
        break;
      default:
        break;
    }

    // Send updated filters to parent component
    onFilterChange({
      location,
      experience,
      salary,
      jobType,
      company,
      [filterName]: value, // make sure latest change is included
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-3">Filter Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter location"
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* Experience Filter */}
        <div>
          <label className="block mb-1 font-medium">Experience</label>
          <select
            value={experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Any</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        {/* Salary Filter */}
        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <select
            value={salary}
            onChange={(e) => handleChange("salary", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Any</option>
            <option value="0-3">0-3 LPA</option>
            <option value="3-6">3-6 LPA</option>
            <option value="6-10">6-10 LPA</option>
            <option value="10+">10+ LPA</option>
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => handleChange("jobType", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Any</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Company Filter */}
        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Company name"
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
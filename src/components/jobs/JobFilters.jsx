import React, { useState } from "react";

const JobFilters = ({ onFilterChange }) => {
  const [location, setLocation] = useState("");
  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [noticeStatus, setNoticeStatus] = useState("");
  const [maxNoticePeriod, setMaxNoticePeriod] = useState("");
  const [lwdPreferred, setLwdPreferred] = useState(false);

  const handleChange = (name, value) => {
    switch (name) {
      case "location": setLocation(value); break;
      case "minExp": setMinExp(value); break;
      case "maxExp": setMaxExp(value); break;
      case "salary": setSalary(value); break;
      case "jobType": setJobType(value); break;
      case "noticeStatus": setNoticeStatus(value); break;
      case "maxNoticePeriod": setMaxNoticePeriod(value); break;
      case "lwdPreferred": setLwdPreferred(value); break;
      default: break;
    }

    onFilterChange({
      location,
      minExp,
      maxExp,
      salary,
      jobType,
      noticeStatus,
      maxNoticePeriod,
      lwdPreferred,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Filter Jobs</h3>

      <input
        type="text"
        value={location}
        placeholder="Location"
        onChange={(e) => handleChange("location", e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <input
          type="number"
          value={minExp}
          placeholder="Min Exp"
          onChange={(e) => handleChange("minExp", e.target.value)}
          className="w-1/2 px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="number"
          value={maxExp}
          placeholder="Max Exp"
          onChange={(e) => handleChange("maxExp", e.target.value)}
          className="w-1/2 px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <input
        type="number"
        value={salary}
        placeholder="Salary (LPA)"
        onChange={(e) => handleChange("salary", e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <select
        value={jobType}
        onChange={(e) => handleChange("jobType", e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Job Type</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="internship">Internship</option>
        <option value="contract">Contract</option>
      </select>

      <select
        value={noticeStatus}
        onChange={(e) => handleChange("noticeStatus", e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Notice Status</option>
        <option value="immediate">Immediate Joiner</option>
        <option value="serving">Serving Notice</option>
        <option value="any">Any</option>
      </select>

      <input
        type="number"
        value={maxNoticePeriod}
        placeholder="Max Notice Period (days)"
        onChange={(e) => handleChange("maxNoticePeriod", e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={lwdPreferred}
          onChange={(e) => handleChange("lwdPreferred", e.target.checked)}
        />
        LWD Preferred
      </label>
    </div>
  );
};

export default JobFilters;
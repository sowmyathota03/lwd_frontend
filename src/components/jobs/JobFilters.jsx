import React, { useState } from "react";

const JobFilters = ({ onFilterChange }) => {

  const [minExp, setMinExp] = useState("");
  const [maxExp, setMaxExp] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [noticeStatus, setNoticeStatus] = useState("");
  const [maxNoticePeriod, setMaxNoticePeriod] = useState("");
  const [lwdPreferred, setLwdPreferred] = useState(false);

  const handleApplyFilters = () => {

    onFilterChange({
      minExp,
      maxExp,
      salary,
      jobType,
      noticeStatus,
      maxNoticePeriod,
      lwdPreferred,
    });

  };

  return (
    <div className="space-y-4 w-68 bg-white p-4 rounded-lg shadow-md">

      <h3 className="text-lg font-semibold">Filter Jobs</h3>

      {/* EXPERIENCE */}
      <div className="flex gap-2">

        <input
          type="number"
          value={minExp}
          placeholder="Min Exp"
          onChange={(e) => setMinExp(e.target.value)}
          className="w-1/2 px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="number"
          value={maxExp}
          placeholder="Max Exp"
          onChange={(e) => setMaxExp(e.target.value)}
          className="w-1/2 px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

      </div>

      {/* SALARY */}
      <input
        type="number"
        value={salary}
        placeholder="Salary (LPA)"
        onChange={(e) => setSalary(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* JOB TYPE */}
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Job Type</option>
        <option value="full_time">Full-time</option>
        <option value="part_time">Part-time</option>
        <option value="internship">Internship</option>
        <option value="contract">Contract</option>
      </select>

      {/* NOTICE STATUS */}
      <select
        value={noticeStatus}
        onChange={(e) => setNoticeStatus(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Notice Status</option>
        <option value="immediate">Immediate Joiner</option>
        <option value="serving">Serving Notice</option>
        <option value="any">Any</option>
      </select>

      {/* NOTICE PERIOD */}
      <input
        type="number"
        value={maxNoticePeriod}
        placeholder="Max Notice Period (days)"
        onChange={(e) => setMaxNoticePeriod(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* LWD */}
      <label className="flex items-center gap-2">

        <input
          type="checkbox"
          checked={lwdPreferred}
          onChange={(e) => setLwdPreferred(e.target.checked)}
        />

        LWD Preferred

      </label>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Filters
      </button>

    </div>
  );
};

export default JobFilters;
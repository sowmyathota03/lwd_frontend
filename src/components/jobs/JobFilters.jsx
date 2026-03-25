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
    <div className="lwd-card space-y-4 w-68 p-4">

      <h3 className="lwd-title">Filter Jobs</h3>

      {/* EXPERIENCE */}
      <div className="flex gap-2">
        <input
          type="number"
          value={minExp}
          placeholder="Min Exp"
          onChange={(e) => setMinExp(e.target.value)}
          className="lwd-input-sm"
        />
        <input
          type="number"
          value={maxExp}
          placeholder="Max Exp"
          onChange={(e) => setMaxExp(e.target.value)}
          className="lwd-input-sm"
        />
      </div>

      {/* SALARY */}
      <input
        type="number"
        value={salary}
        placeholder="Salary (LPA)"
        onChange={(e) => setSalary(e.target.value)}
        className="lwd-input-sm w-full"
      />

      {/* JOB TYPE */}
      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="lwd-input-sm w-full"
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
        className="lwd-input-sm w-full"
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
        className="lwd-input-sm w-full"
      />

      {/* LWD */}
      <label className="flex items-center gap-2 lwd-text">
        <input
          type="checkbox"
          checked={lwdPreferred}
          onChange={(e) => setLwdPreferred(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        LWD Preferred
      </label>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApplyFilters}
        className="lwd-btn-primary w-full"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilters;
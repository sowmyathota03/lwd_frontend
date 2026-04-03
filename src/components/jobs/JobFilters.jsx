import React, { useState } from "react";
import {
  Filter,
  Banknote,
  Briefcase,
  Clock,
  History,
  Search,
  RotateCcw
} from "lucide-react";
import { motion } from "framer-motion";

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

  const handleReset = () => {
    setMinExp("");
    setMaxExp("");
    setSalary("");
    setJobType("");
    setNoticeStatus("");
    setMaxNoticePeriod("");
    setLwdPreferred(false);
    onFilterChange({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lwd-card-glass space-y-6 w-full"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-blue-600" />
          <h2 className="lwd-h2">Job Filters</h2>
        </div>

        <button
          onClick={handleReset}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors duration-200"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* EXPERIENCE */}
      <div>
        <label className="lwd-label flex items-center gap-2 mb-2">
          <Briefcase size={16} /> Experience (Years)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minExp}
            onChange={(e) => setMinExp(e.target.value)}
            className="lwd-input"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxExp}
            onChange={(e) => setMaxExp(e.target.value)}
            className="lwd-input"
          />
        </div>
      </div>

      {/* SALARY */}
      <div>
        <label className="lwd-label flex items-center gap-2 mb-2">
          <Banknote size={16} /> Expected Salary (LPA)
        </label>
        <input
          type="number"
          placeholder="e.g. 10"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="lwd-input"
        />
      </div>

      {/* JOB TYPE */}
      <div>
        <label className="lwd-label flex items-center gap-2 mb-2">
          <Briefcase size={16} /> Job Type
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="lwd-input"
        >
          <option value="">All</option>
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* NOTICE STATUS */}
      <div>
        <label className="lwd-label flex items-center gap-2 mb-2">
          <Clock size={16} /> Notice Period
        </label>
        <select
          value={noticeStatus}
          onChange={(e) => setNoticeStatus(e.target.value)}
          className="lwd-input"
        >
          <option value="">Any</option>
          <option value="immediate">Immediate</option>
          <option value="serving">Serving Notice</option>
        </select>
      </div>

      {/* MAX NOTICE */}
      <div>
        <label className="lwd-label flex items-center gap-2 mb-2">
          <History size={16} /> Max Notice Period (Days)
        </label>
        <input
          type="number"
          placeholder="e.g. 30"
          value={maxNoticePeriod}
          onChange={(e) => setMaxNoticePeriod(e.target.value)}
          className="lwd-input"
        />
      </div>

      {/* CHECKBOX */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={lwdPreferred}
          onChange={(e) => setLwdPreferred(e.target.checked)}
          className="h-4 w-4 accent-blue-600 rounded-sm"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">
          Last Working Day Preferred
        </span>
      </div>

      {/* APPLY BUTTON */}
      <button
        onClick={handleApplyFilters}
        className="lwd-btn-primary flex items-center justify-center gap-2 w-full"
      >
        <Search size={16} />
        Apply Filters
      </button>
    </motion.div>
  );
};

export default JobFilters;
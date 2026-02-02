import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "../components/jobs/JobCards";

export const ITJobs = [
  { id: 1, title: "Frontend Developer (React.js)", company: "Arah Infotech", location: "Hyderabad", experience: "2-4 Years", description: "Develop React components, Redux, and UI." },
  { id: 2, title: "Java Full Stack Developer", company: "Vagarious Solutions Pvt Ltd", location: "Bangalore", experience: "1-3 Years", description: "Build full stack apps with Java, Spring Boot, React." },
  { id: 3, title: "Backend Developer (Java/Node.js)", company: "Wipro", location: "Chennai", experience: "3-5 Years", description: "Create APIs, manage databases and servers." },
];

export const FinancialJobs = [
  { id: 4, title: "Financial Analyst", company: "HDFC Bank", location: "Mumbai", experience: "2-4 Years", description: "Analyze financial statements and forecasting." },
  { id: 5, title: "Accounts Executive", company: "ICICI Bank", location: "Hyderabad", experience: "1-3 Years", description: "Handle accounts, GST, invoicing." },
  { id: 6, title: "Investment Advisor", company: "Axis Bank", location: "Bangalore", experience: "3-5 Years", description: "Advise clients on investments and portfolios." },
];

export const MarketingJobs = [
  { id: 7, title: "Digital Marketing Executive", company: "Wipro", location: "Bangalore", experience: "1-2 Years", description: "Manage social media, SEO, and campaigns." },
  { id: 8, title: "Marketing Manager", company: "Infosys", location: "Hyderabad", experience: "3-5 Years", description: "Plan marketing strategies and team management." },
  { id: 9, title: "Content Writer", company: "TCS", location: "Chennai", experience: "1-3 Years", description: "Create engaging content for websites and blogs." },
];

const ALL_JOBS = [...ITJobs, ...FinancialJobs, ...MarketingJobs];

function Jobs() {
  const { type } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!type) setJobs(ALL_JOBS);
    else if (type === "it") setJobs(ITJobs);
    else if (type === "finance") setJobs(FinancialJobs);
    else if (type === "marketing") setJobs(MarketingJobs);
  }, [type]);

  const handleApply = (job) => {
    alert(`You applied for ${job.title} at ${job.company}`);
   
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{type ? `${type.toUpperCase()} Jobs` : "All Jobs"}</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
 
import styles from "./JobCard.module.css";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

function JobCard({ job }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`); // Navigate to Job Details page
  };

  const handleApply = () => {
    navigate(`/apply/${job.id}`); // Navigate to Apply Job page
  }



  return (
    <div className={styles.card}
      onClick={handleClick}>
      {/* Top Section */}
      <div>
        <h3 className={styles.title}>{job.title}</h3>
        <p className={styles.company}>
          {job.company} • {job.location}
        </p>

        <div className={styles.tags}>
          <span className={styles.tag}>{job.experience}</span>
          <span className={styles.tag}>{job.jobType}</span>
          <span className={styles.tag}>{job.industry}</span>
        </div>

        <p className={styles.description}>
          {job.description?.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>

        <div className={styles.bottomRow}>
          <span className={styles.date}>
            Posted {timeAgo(job.createdAt)}
          </span>
          <span className={styles.salary}>
            {job.salary
              ? `₹${job.salary.toLocaleString()} LPA`
              : "Not Disclosed"}
          </span>

        </div>
      </div>

      <button
        className={styles.applyBtn}
        onClick={(e) => {
          e.stopPropagation(); // ✅ Prevents parent card click
          handleApply();
        }}
      >
        Apply Now
      </button>

    </div>
  );
}

export default JobCard;

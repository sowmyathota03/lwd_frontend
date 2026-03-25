import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    getMyPostedJobs,
    getPostedJobsByUserId,
} from "../../../api/PostedJobApi";

function PostedJobs({ userId }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, [userId]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = userId
                ? await getPostedJobsByUserId(userId)
                : await getMyPostedJobs();

            setJobs(data || []);
        } catch (err) {
            console.error("Error fetching posted jobs", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <p className="p-3 text-gray-500 dark:text-gray-400">
                Loading jobs...
            </p>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6 space-y-4 transition-colors">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Posted Jobs
                </h2>
            </div>

            {/* No jobs */}
            {jobs.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                    No jobs posted yet.
                </p>
            )}

            {/* Job list */}
            <div className="space-y-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="flex justify-between items-start p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:shadow-lg transition-shadow"
                    >
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base">
                                {job.title}
                            </h3>

                            {job.location && (
                                <p className="text-indigo-600 dark:text-indigo-400">
                                    {job.location}
                                </p>
                            )}

                            {job.jobType && (
                                <p className="text-gray-600 dark:text-gray-300">
                                    {job.jobType}
                                </p>
                            )}

                            {job.applicantsCount !== undefined && (
                                <p className="text-gray-600 dark:text-gray-300">
                                    Applicants: {job.applicantsCount}
                                </p>
                            )}

                            {job.status && (
                                <p className="text-gray-600 dark:text-gray-300">
                                    Status: {job.status}
                                </p>
                            )}
                        </div>

                        {/* View button */}
                        <button
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700/20 rounded-lg transition-colors"
                            aria-label={`View job ${job.title}`}
                        >
                            <Eye size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostedJobs;
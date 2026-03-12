// import { useState, useEffect } from "react";
// import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// import {
//     getMyPostedJobs,
//     getPostedJobsByUserId,
// } from "../../../api/JobApi";

// function PostedJobs({ userId }) {
//     const [jobs, setJobs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchJobs();
//     }, [userId]);

//     const fetchJobs = async () => {
//         setLoading(true);
//         try {
//             const data = userId
//                 ? await getPostedJobsByUserId(userId)
//                 : await getMyPostedJobs();

//             setJobs(data || []);
//         } catch (err) {
//             console.error("Error fetching posted jobs", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <p className="p-3 text-gray-500">Loading jobs...</p>;
//     }

//     return (
//         <div className="bg-gray-100 shadow-sm rounded-lg p-4 space-y-3">

//             {/* Header */}
//             <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//                     Posted Jobs
//                 </h2>
//             </div>

//             {/* No jobs */}
//             {jobs.length === 0 && (
//                 <p className="text-gray-500">No jobs posted yet.</p>
//             )}

//             {/* Job list */}
//             <div className="space-y-3">
//                 {jobs.map((job) => (
//                     <div
//                         key={job.id}
//                         className="flex justify-between items-start p-4 bg-white rounded-md hover:shadow transition"
//                     >
//                         <div className="flex-1 space-y-1">

//                             <h3 className="font-semibold text-gray-800 text-base">
//                                 {job.title}
//                             </h3>

//                             {job.location && (
//                                 <p className="text-indigo-600">{job.location}</p>
//                             )}

//                             {job.jobType && (
//                                 <p className="text-gray-600">{job.jobType}</p>
//                             )}

//                             {job.applicantsCount !== undefined && (
//                                 <p className="text-gray-600">
//                                     Applicants: {job.applicantsCount}
//                                 </p>
//                             )}

//                             {job.status && (
//                                 <p className="text-gray-600">Status: {job.status}</p>
//                             )}
//                         </div>

//                         {/* View button */}
//                         <button
//                             onClick={() => navigate(`/jobs/${job.id}`)}
//                             className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
//                         >
//                             <Eye size={18} />
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default PostedJobs;
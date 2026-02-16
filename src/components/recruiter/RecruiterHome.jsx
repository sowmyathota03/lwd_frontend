import { Briefcase, FileText, Users, Clock } from "lucide-react";

export default function RecruiterHome() {
  // 🔹 Replace these with API data later
  const stats = [
    {
      title: "Total Jobs",
      value: 24,
      icon: <Briefcase size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Applications",
      value: 128,
      icon: <FileText size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Active Recruiters",
      value: 6,
      icon: <Users size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Pending Applications",
      value: 14,
      icon: <Clock size={28} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* 🔥 Welcome Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-blue-100">
          Here's what's happening with your recruitment activity today.
        </p>
      </div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition duration-300"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {item.value}
              </h3>
            </div>

            <div
              className={`${item.color} text-white p-4 rounded-xl shadow-md`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h4>

          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>✅ 3 new applications received</li>
            <li>📄 Job "Frontend Developer" was updated</li>
            <li>👤 Recruiter John approved</li>
            <li>🚀 New job "Backend Engineer" posted</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h4>

          <div className="flex flex-col gap-3">
            <button className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              + Post New Job
            </button>
            <button className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
              View Applications
            </button>
            <button className="bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition">
              Manage Jobs
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

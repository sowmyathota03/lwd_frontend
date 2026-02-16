export default function AdminHome() {
  return (
    <div className="min-h-screen from-blue-50 to-sky-100 p-8">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-sky-700 mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-sky-600 mt-2">1,245</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500 text-sm">Total Companies</h3>
          <p className="text-2xl font-bold text-sky-600 mt-2">320</p>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-gray-500 text-sm">Active Jobs</h3>
          <p className="text-2xl font-bold text-sky-600 mt-2">98</p>
        </div>

      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <h2 className="text-xl font-semibold text-sky-700 mb-2">
          Welcome to Admin Dashboard 👋
        </h2>
        <p className="text-red-600">
          Manage users, companies, job postings, and applications from here.
          Monitor performance and keep everything under control.
        </p>
      </div>

    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import { 
  Users, 
  Building2, 
  Briefcase, 
  FileText,
  Calendar
} from 'lucide-react';
import { getAllUsers } from "../../api/AdminApi";

export default function AdminHome() {

  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getAllUsers();
      setDashboard(res.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-sky-600 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    { title: 'Total Users', value: dashboard?.totalUsers || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Total Companies', value: dashboard?.totalCompanies || 0, icon: Building2, color: 'bg-emerald-500' },
    { title: 'Active Jobs', value: dashboard?.totalJobs || 0, icon: Briefcase, color: 'bg-amber-500' },
    { title: 'Applications', value: dashboard?.totalApplications || 0, icon: FileText, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date().toDateString()}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
        <table className="w-full text-sm">
          <tbody>
            {dashboard?.recentUsers?.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3">{user.name}</td>
                <td className="py-3 text-gray-500">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>
        <table className="w-full text-sm">
          <tbody>
            {dashboard?.recentJobs?.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="py-3">{job.title}</td>
                <td className="py-3 text-gray-500">
                  {job.company?.companyName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

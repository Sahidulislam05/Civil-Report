import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaClipboardList,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all admin stats in a single API call
  const {
    data: statsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load dashboard stats.
      </div>
    );
  }

  // --------------------------
  // Stats Cards
  // --------------------------
  const stats = {
    totalIssues: statsData.totalIssues || 0,
    resolved: statsData.resolved || 0,
    pending: statsData.pending || 0,
    rejected: statsData.rejected || 0,
    totalUsers: statsData.latestUsers?.length || 0, // optionally use totalUsers if backend provides
    revenue: statsData.totalPayments || 0,
  };

  // Pie chart data
  const pieData = [
    { name: "Resolved", value: stats.resolved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
  ];

  const COLORS = ["#28a745", "#ffc107", "#dc3545"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-primary">Admin Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-12">
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-primary text-3xl">
            <FaClipboardList />
          </div>
          <div className="stat-title">Total Issues</div>
          <div className="stat-value text-primary">{stats.totalIssues}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-success text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">{stats.resolved}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-warning text-3xl">
            <FaHourglassHalf />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">{stats.pending}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-error text-3xl">
            <FaTimesCircle />
          </div>
          <div className="stat-title">Rejected</div>
          <div className="stat-value text-error">{stats.rejected}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{stats.totalUsers}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-yellow-500 text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title">Total Payment</div>
          <div className="stat-value text-yellow-500">{stats.revenue}</div>
        </div>
      </div>

      {/* Charts */}
      <div className=" mb-12">
        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">Issue Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Latest Issues, Payments, Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-xl p-4">
          <h4 className="font-bold mb-2">Latest Issues</h4>
          <ul className="text-sm">
            {statsData.latestIssues?.map((issue) => (
              <li
                key={issue._id}
                className="mb-1 border-b border-gray-200 pb-1"
              >
                {issue.title} ({issue.status})
              </li>
            )) || <p>No recent issues</p>}
          </ul>
        </div>

        <div className="card bg-base-100 shadow-xl p-4">
          <h4 className="font-bold mb-2">Latest Payments</h4>
          <ul className="text-sm">
            {statsData.latestPayments?.map((p) => (
              <li key={p._id} className="mb-1 border-b border-gray-200 pb-1">
                {p.email} — {p.amount} tk
              </li>
            )) || <p>No recent payments</p>}
          </ul>
        </div>

        <div className="card bg-base-100 shadow-xl p-4">
          <h4 className="font-bold mb-2">Latest Users</h4>
          <ul className="text-sm">
            {statsData.latestUsers?.map((u) => (
              <li key={u._id} className="mb-1 border-b border-gray-200 pb-1">
                {u.name} ({u.email})
              </li>
            )) || <p>No recent users</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

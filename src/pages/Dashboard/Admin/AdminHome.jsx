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
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Get All Issues
  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  // Get All Users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Get All Payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment");
      return res.data;
    },
  });

  // --------------------------
  // Stats Calculation
  // --------------------------
  const stats = {
    totalIssues: issues.length,
    resolved: issues.filter((i) => i.status === "resolved").length,
    pending: issues.filter((i) => i.status === "pending").length,
    inProgress: issues.filter((i) => i.status === "in-progress").length,
    payments: payments.reduce((sum, p) => sum + (p.amount || 0), 0),
    users: users.length,
  };

  // --------------------------
  // Chart Data
  // --------------------------
  const pieData = [
    { name: "Resolved", value: stats.resolved },
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
  ];

  const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2 className="text-3xl font-headings font-bold mb-8 text-primary">
        Admin Overview
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-secondary">{stats.users}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-warning text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value text-warning">{stats.payments} tk</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <div className="card bg-base-100 shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4">Activity Log (Coming Soon)</h3>
          <p className="text-gray-400 text-center py-10">
            Daily submission chart will be here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

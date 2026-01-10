import useAuth from "../../../hooks/useAuth";
import useDashboardStats from "../../../hooks/useDashboardStats";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CitizenHome = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  const chartData = [
    { name: "Pending", value: stats.pending || 0, color: "#fbbf24" },
    { name: "In Progress", value: stats.inProgress || 0, color: "#0ea5e9" },
    { name: "Resolved", value: stats.resolved || 0, color: "#10b981" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-headings font-bold mb-2 text-primary">
        Welcome, {user?.name}!
      </h2>
      <p className="text-gray-500 mb-8">
        Here is an overview of your activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="stat-figure text-primary text-3xl">
            <FaClipboardList />
          </div>
          <div className="stat-title dark:text-gray-400">Total Reports</div>
          <div className="stat-value text-primary">{stats.totalIssues}</div>
        </div>

        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="stat-figure text-warning text-3xl">
            <FaSpinner />
          </div>
          <div className="stat-title dark:text-gray-400">Pending</div>
          <div className="stat-value text-warning">{stats.pending}</div>
        </div>

        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="stat-figure text-info text-3xl">
            <FaSpinner />
          </div>
          <div className="stat-title dark:text-gray-400">In Progress</div>
          <div className="stat-value text-info">{stats.inProgress}</div>
        </div>

        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="stat-figure text-success text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title dark:text-gray-400">Resolved</div>
          <div className="stat-value text-success">{stats.resolved}</div>
        </div>

        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="stat-figure text-secondary text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title dark:text-gray-400">Total Spent</div>
          <div className="stat-value text-secondary">
            {stats.totalPayments} tk
          </div>
        </div>
      </div>

      <div className="w-full h-96 mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">Issue Status Overview</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1F2937', color: '#fff' }}
            />
            <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CitizenHome;

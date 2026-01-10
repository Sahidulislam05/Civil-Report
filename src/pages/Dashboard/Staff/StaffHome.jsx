import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks, FaCheckDouble, FaCalendarDay } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TodayTasks from "./TodayTasks";

const StaffHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["issues", "staff_home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  const chartData = [
    { name: "Assigned", count: stats.assigned || 0 },
    { name: "Active", count: stats.active || 0 },
    { name: "Resolved", count: stats.resolved || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-primary">
          Good Day, {user?.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Ready to serve the community?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="stat-figure text-primary text-3xl">
            <FaTasks />
          </div>
          <div className="stat-title dark:text-gray-400">Total Assigned</div>
          <div className="stat-value text-primary">{stats.assigned || 0}</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="stat-figure text-success text-3xl">
            <FaCheckDouble />
          </div>
          <div className="stat-title dark:text-gray-400">Resolved by You</div>
          <div className="stat-value text-success">{stats.resolved || 0}</div>
        </div>
        <div className="stat bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 p-4">
          <div className="stat-figure text-warning text-3xl">
            <FaCalendarDay />
          </div>
          <div className="stat-title dark:text-gray-400">Active Tasks</div>
          <div className="stat-value text-warning">{stats.active || 0}</div>
          <div className="stat-desc dark:text-gray-500">Currently In-Progress</div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 dark:text-gray-200">Issue Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis allowDecimals={false} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1F2937', color: '#fff' }}
            />
            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="">
        <div>{/* Chart goes here */}</div>
        <TodayTasks />
      </div>

      {/* Recent Assigned Issues */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 dark:text-gray-200">Recent Assigned Issues</h3>
        {stats.recent?.length > 0 ? (
          <ul className="space-y-2">
            {stats.recent.map((issue) => (
              <li
                key={issue._id}
                className="border dark:border-gray-700 p-3 rounded flex justify-between items-center bg-gray-50 dark:bg-gray-700/50"
              >
                <span className="font-medium dark:text-gray-300">{issue.title}</span>
                <span
                  className={`badge capitalize ${issue.status === "resolved" || issue.status === "closed"
                      ? "badge-success text-white"
                      : "badge-warning"
                    }`}
                >
                  {issue.status.replace("-", " ")}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recent issues assigned</p>
        )}
      </div>
    </div>
  );
};

export default StaffHome;

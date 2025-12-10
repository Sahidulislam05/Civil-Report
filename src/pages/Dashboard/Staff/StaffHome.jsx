import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTasks, FaCheckDouble, FaCalendarDay } from "react-icons/fa";

const StaffHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["issues", "staff_home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/stats");
      return res.data;
    },
  });
  console.log(stats);

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div>
      <h2 className="text-3xl font-headings font-bold mb-2 text-primary">
        Good Day, {user?.name}
      </h2>
      <p className="text-gray-500 mb-8">Ready to serve the community?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-primary text-3xl">
            <FaTasks />
          </div>
          <div className="stat-title">Total Assigned</div>
          <div className="stat-value text-primary">{stats.assigned}</div>
        </div>
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-success text-3xl">
            <FaCheckDouble />
          </div>
          <div className="stat-title">Resolved by You</div>
          <div className="stat-value text-success">{stats.resolved}</div>
        </div>
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-warning text-3xl">
            <FaCalendarDay />
          </div>
          <div className="stat-title">Active Tasks</div>
          <div className="stat-value text-warning">{stats.today}</div>
          <div className="stat-desc">Issues currently In-Progress</div>
        </div>
      </div>
    </div>
  );
};

export default StaffHome;

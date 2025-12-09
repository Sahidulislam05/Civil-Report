import useAuth from "../../../hooks/useAuth";
import useDashboardStats from "../../../hooks/useDashboardStats";
import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const CitizenHome = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-headings font-bold mb-2 text-primary">
        Welcome, {user?.name}!
      </h2>
      <p className="text-gray-500 mb-8">
        Here is an overview of your activity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-primary text-3xl">
            <FaClipboardList />
          </div>
          <div className="stat-title">Total Reports</div>
          <div className="stat-value text-primary">{stats?.totalReports}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-warning text-3xl">
            <FaSpinner />
          </div>
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">{stats?.pending}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-info text-3xl">
            <FaSpinner />
          </div>
          <div className="stat-title">In Progress</div>
          <div className="stat-value text-info">{stats?.inProgress}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-success text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title">Resolved</div>
          <div className="stat-value text-success">{stats?.resolved}</div>
        </div>

        <div className="stat bg-white shadow-lg rounded-xl border border-gray-100">
          <div className="stat-figure text-secondary text-3xl">
            <FaMoneyBillWave />
          </div>
          <div className="stat-title">Total Spent</div>
          <div className="stat-value text-secondary">
            {stats?.totalSpent} tk
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;

import { Outlet, NavLink, Link } from "react-router";
import {
  FaHome,
  FaList,
  FaPlusCircle,
  FaUser,
  FaUsers,
  FaMoneyBillWave,
  FaChartPie,
  FaTasks,
  FaUserShield,
} from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [role] = useRole();
  // console.log(role);

  const citizenLinks = (
    <>
      <li>
        <NavLink to="/dashboard/citizen">
          <FaChartPie /> Stats
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-issues">
          <FaList /> My Issues
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/report-issue">
          <FaPlusCircle /> Report Issue
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  const staffLinks = (
    <>
      <li>
        <NavLink to="/dashboard/staff">
          <FaChartPie /> Overview
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/assigned-issues">
          <FaTasks /> Assigned Tasks
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/staff-profile">
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/admin">
          <FaChartPie /> Overview
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-users">
          <FaUsers /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-staff">
          <FaUserShield /> Manage Staff
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payments">
          <FaMoneyBillWave /> Payments
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-issues-admin">
          <FaList /> All Issues
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open font-sans bg-gray-50">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile drawer toggle */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl">Dashboard</div>
        </div>

        {/* Page Content */}
        <div className="p-8 min-h-screen">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-20">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-neutral text-neutral-content space-y-2">
          {/* Branding */}
          <div className="mb-8 px-4">
            <Link
              to="/"
              className="text-2xl font-headings font-bold text-white"
            >
              Civil<span className="text-primary ml-1">Report</span>
            </Link>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              {role} Dashboard
            </p>
          </div>

          {role === "citizen" && citizenLinks}
          {role === "staff" && staffLinks}
          {role === "admin" && adminLinks}

          <div className="divider bg-gray-700 h-px"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Start Icon fix

export default DashboardLayout;

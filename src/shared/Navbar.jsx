import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
// import logo from "../../public/logo.svg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "staff") return "/dashboard/staff";
    if (user.role === "citizen") return "/dashboard/citizen";
    return "/dashboard";
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-issues"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "font-bold text-primary" : ""
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <section>
      <nav className="bg-base-300 ">
        <div className="navbar w-11/12 mx-auto ">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 md:text-2xl font-headings font-bold text-primary"
            >
              <img className="w-7" src="/logo.svg" alt="Logo" />
              <p>
                Civil<span className="text-secondary"> Report</span>
              </p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4 font-medium">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-primary/20"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User" src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100"
                >
                  <li className="menu-title px-4 py-2 text-primary">
                    {user?.displayName}
                  </li>
                  <li>
                    <Link
                      className="menu-title px-4 py-2 text-secondary"
                      to={getDashboardLink()}
                    >
                      <p className="flex gap-2 items-center">
                        <FaRegArrowAltCircleRight /> <span>Dashboard</span>
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-secondary font-bold"
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="btn btn-sm btn-primary text-white">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;

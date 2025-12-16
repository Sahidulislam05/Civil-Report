import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // scroll based animation
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 120], [0.55, 0.85]);
  const blurValue = useTransform(
    scrollY,
    [0, 120],
    ["blur(8px)", "blur(16px)"]
  );
  const shadowValue = useTransform(
    scrollY,
    [0, 120],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 30px rgba(0,0,0,0.25)"]
  );

  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "staff") return "/dashboard/staff";
    if (user.role === "citizen") return "/dashboard/citizen";
    return "/dashboard";
  };

  const navOptions = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/all-issues", label: "All Issues" },
        { to: "/about-us", label: "About Us" },
        { to: "/contact", label: "Contact" },
      ].map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `transition-all ${
                isActive ? "font-bold text-primary" : "hover:text-primary"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: bgOpacity,
        backdropFilter: blurValue,
        boxShadow: shadowValue,
      }}
      className="
        sticky top-0 z-50 w-full
        bg-base-100/60
        border-b border-white/10
        supports-backdrop-filter:bg-base-100/40
      "
    >
      <div className="navbar w-11/12 mx-auto">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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

            {/* Mobile dropdown glass */}
            <ul
              tabIndex={0}
              className="
                menu menu-sm dropdown-content mt-3 z-50 p-3
                backdrop-blur-xl bg-base-100/80
                border border-white/10
                rounded-xl shadow-xl w-56
              "
            >
              {navOptions}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
          >
            <img className="w-7" src="/logo.svg" alt="Logo" />
            <p>
              Civil<span className="text-secondary"> Report</span>
            </p>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal gap-6 font-medium">{navOptions}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="
                  btn btn-ghost btn-circle avatar
                  border border-primary/20
                  hover:scale-105 transition
                "
              >
                <div className="w-10 rounded-full">
                  <img alt="User" src={user?.photoURL} />
                </div>
              </div>

              {/* Profile dropdown glass */}
              <ul
                tabIndex={0}
                className="
                  menu menu-sm dropdown-content mt-3 z-50 p-3
                  backdrop-blur-xl bg-base-100/90
                  border border-white/10
                  rounded-xl shadow-xl w-56
                "
              >
                <li className="menu-title px-4 py-2 text-primary">
                  {user?.displayName}
                </li>
                <li>
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2 text-secondary"
                  >
                    <FaRegArrowAltCircleRight />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="btn btn-secondary btn-sm mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

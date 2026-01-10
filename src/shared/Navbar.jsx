import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeContext } from "../provider/ThemeProvider";
import { Sun, Moon, LogOut, LayoutDashboard, User, Menu } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) setIsScrolled(true);
    else setIsScrolled(false);
  });

  // Dynamic Text Color:
  // - On Home: White at top (for dark banner), Base Content when scrolled (for white/dark nav bg)
  // - Other Pages: Always Base Content
  const textColorClass = isHome && !isScrolled ? "text-white" : "text-base-content";

  // Mobile Dropdown Button Color:
  // Needs to be visible against the background. 
  // At top of home (transparent bg): White.
  // Scrolled or other pages: Base Content.
  const mobileBtnClass = isHome && !isScrolled ? "text-white" : "text-base-content";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-issues", label: "Issues" },
    { path: "/about-us", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "staff") return "/dashboard/staff";
    return "/dashboard/citizen";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Background Layer with Framer Motion for Blur/Opacity */}
      <motion.div
        className="absolute inset-0 bg-base-100/90 backdrop-blur-md shadow-sm"
        initial={false}
        animate={{
          opacity: isHome ? (isScrolled ? 1 : 0) : 1, // Be transparent at top of Home, solid elsewhere
        }}
        transition={{ duration: 0.3 }}
      />

      <div className={`navbar container mx-auto px-4 lg:px-8 py-3 relative z-10 ${textColorClass}`}>
        {/* LOGO */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle ${mobileBtnClass}`}
            >
              <Menu className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100/95 backdrop-blur-md rounded-box w-52 border border-base-content/10 text-base-content"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-bold" : ""
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            {/* Gradient Text for Logo Only */}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CivilReport
            </span>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                      ? "bg-primary/10 text-primary"
                      : isHome && !isScrolled
                        ? "hover:bg-white/20 hover:text-white text-white"
                        : "hover:bg-base-200/50 hover:text-primary"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="navbar-end gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`btn btn-ghost btn-circle btn-sm hover:bg-base-200/50 transition-colors ${mobileBtnClass}`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              // If transparent home, show white moon? No, gray usually fine, but if bg is dark...
              // If text is white, moon should be white or light.
              <Moon className={`w-5 h-5 ${isHome && !isScrolled ? "text-white" : "text-gray-500"}`} />
            )}
          </button>

          {/* USER MENU */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`btn btn-ghost btn-circle avatar border-2 transition-colors ${isHome && !isScrolled ? "border-white/50" : "border-primary/20 hover:border-primary"
                  }`}
                title={user.displayName}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={user.displayName || "User"}
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-box w-52 border border-base-content/10 text-base-content"
              >
                <li className="menu-title px-4 py-2 border-b border-base-content/10 mb-2">
                  <span className="font-bold text-base-content truncate block max-w-full">{user.displayName}</span>
                  <span className="text-xs font-normal opacity-70 truncate block max-w-full">{user.email}</span>
                </li>
                <li>
                  <Link to={getDashboardLink()} className="flex gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/profile" className="flex gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button onClick={logOut} className="text-error flex gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-primary btn-sm px-6">
                Login
              </Link>
              <Link to="/register" className={`btn btn-ghost btn-sm hidden sm:inline-flex ${mobileBtnClass}`}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

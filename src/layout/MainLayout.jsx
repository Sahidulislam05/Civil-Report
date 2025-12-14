import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../shared/Footer";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

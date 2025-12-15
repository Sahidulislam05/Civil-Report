import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import AllIssues from "../pages/Issues/AllIssues";
import IssueDetails from "../pages/Issues/IssueDetails";
import PrivateRoutes from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import CitizenHome from "../pages/Dashboard/Citizen/CitizenHome";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues";
import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import AdminAllIssues from "../pages/Dashboard/Admin/AdminAllIssues";
import StaffHome from "../pages/Dashboard/Staff/StaffHome";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import Contact from "../pages/Contact/Contact";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentPage from "../pages/Dashboard/Admin/PaymentPage";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import BoostSuccess from "../pages/Dashboard/Payment/BoostSuccess";
import AboutUs from "../pages/About/AboutUs";
import EditIssuePage from "../pages/Issues/EditIssuePage";
import DashboardWelcome from "../pages/Dashboard/DashboardWelcome";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-issues",
        Component: AllIssues,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/issues-details/:id",
        element: (
          <PrivateRoutes>
            <IssueDetails></IssueDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "edit-issue/:id",
        Component: EditIssuePage,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/payment-success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "/boost-success",
    element: <BoostSuccess></BoostSuccess>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardWelcome,
      },
      {
        path: "citizen",
        element: <CitizenHome></CitizenHome>,
      },

      {
        path: "my-issues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "report-issue",
        element: <ReportIssue></ReportIssue>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      // Admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manage-staff",
        element: <ManageStaff></ManageStaff>,
      },
      {
        path: "payments",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "all-issues-admin",
        element: <AdminAllIssues></AdminAllIssues>,
      },

      {
        path: "my-profile",
        element: <AdminProfile></AdminProfile>,
      },
      // Staff
      {
        path: "staff",
        element: <StaffHome></StaffHome>,
      },
      {
        path: "assigned-issues",
        element: <AssignedIssues></AssignedIssues>,
      },
    ],
  },
]);

export default router;

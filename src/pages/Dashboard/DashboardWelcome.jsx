import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";


const DashboardWelcome = () => {
  const { user } = useAuth();
  const [userInfo, isLoading] = useUserInfo();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Card */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h1 className="text-2xl md:text-3xl font-bold">
            👋 Welcome to Your Dashboard
          </h1>

          <p className="text-base-content/70 mt-1">
            Hello{" "}
            <span className="font-semibold">{user?.displayName || "User"}</span>
            , manage your activities and track everything from here.
          </p>

          {/* Role & Status */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="badge badge-outline badge-primary">
              Role: {userInfo?.role}
            </div>

            {userInfo?.premium && (
              <div className="badge badge-success gap-1">⭐ Premium User</div>
            )}

            {userInfo?.blocked && (
              <div className="badge badge-error gap-1">⚠ Blocked</div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title">Track Issues</div>
              <div className="stat-value text-primary">📍</div>
              <div className="stat-desc">Monitor issue progress & timeline</div>
            </div>

            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title">Manage Actions</div>
              <div className="stat-value text-secondary">⚙</div>
              <div className="stat-desc">Update, verify & resolve tasks</div>
            </div>

            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title">Stay Updated</div>
              <div className="stat-value text-accent">🔔</div>
              <div className="stat-desc">Real-time status & notifications</div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Message */}
      <div className="alert alert-info shadow-md mt-6">
        <span>
          💡 Tip: Keep your profile updated and track issue timelines regularly
          for better experience.
        </span>
      </div>
    </div>
  );
};

export default DashboardWelcome;

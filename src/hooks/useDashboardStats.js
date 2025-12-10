import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDashboardStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["dashboard-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/citizen/stats`);
      // Ensure numbers are at least 0
      return {
        totalIssues: data.totalIssues || 0,
        pending: data.pending || 0,
        inProgress: data.inProgress || 0,
        resolved: data.resolved || 0,
        totalPayments: data.totalPayments || 0,
        latestIssues: data.latestIssues || [],
      };
    },
  });
};

export default useDashboardStats;

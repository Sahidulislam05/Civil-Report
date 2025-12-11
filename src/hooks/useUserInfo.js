import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-info", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/info/${user.email}`);
      return res.data;
    },
  });

  return [data, isLoading, refetch];
};

export default useUserInfo;

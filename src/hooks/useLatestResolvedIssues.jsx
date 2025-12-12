import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["latestResolved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues/resolved/latest");
      return res.data;
    },
  });
};

export default useLatestResolvedIssues;

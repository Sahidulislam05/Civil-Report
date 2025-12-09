import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueCard from "../../_components/IssueCard";
import { FaSearch } from "react-icons/fa";

export default function AllIssues() {
  const { data, isLoading } = useQuery({
    queryKey: ["issue"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/issues");
      return response.data;
    },
  });
  console.log(data);
  return (
    <div>
      <div className="py-12 bg-gray-50 min-h-screen font-sans">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-headings font-bold text-primary">
              All Reported Issues
            </h2>

            {/* Search */}
            <div className="join w-full md:w-auto">
              <input
                className="input input-bordered join-item w-full md:w-64"
                placeholder="Search location or title..."
              />
              <button className="btn join-item btn-primary text-white">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4 items-center">
            <span className="font-bold text-gray-500">Filter By:</span>

            <select className="select select-bordered select-sm" value={status}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select className="select select-bordered select-sm">
              <option value="">All Categories</option>
            </select>

            <select className="select select-bordered select-sm">
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              {data.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-400">
                    No issues found matching your criteria.
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                  {data?.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12 btn-group">
                <button className="btn">«</button>
                <button className="btn">Page </button>
                <button className="btn">»</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

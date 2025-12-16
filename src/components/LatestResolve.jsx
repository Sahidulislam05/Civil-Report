import useLatestResolvedIssues from "../hooks/useLatestResolvedIssues";
import { Link } from "react-router"; // View Details link

const LatestResolve = () => {
  const { data: issues = [], isLoading } = useLatestResolvedIssues();

  return (
    <section className="my-12 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-12 text-center">
        Latest Resolved Issues
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <button className="btn btn-circle btn-ghost loading"></button>
        </div>
      ) : issues.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg">No resolved issues yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              {issue.image && (
                <figure>
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
              )}
              <div className="card-body flex flex-col grow">
                <h3 className="card-title text-lg font-bold line-clamp-2">
                  {issue.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {issue.description || "No description provided."}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between text-sm">
                  <span className="badge badge-outline">
                    {issue.category || "General"}
                  </span>
                  <span
                    className={`badge ${
                      issue.priority === "high"
                        ? "badge-error"
                        : issue.priority === "medium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {issue.priority || "Normal"}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <span>Upvotes: {issue.upvoteCount || 0}</span>
                  <span>
                    {new Date(issue.createdAt).toLocaleDateString("en-US")}
                  </span>
                </div>

                {/* View Details Button */}
                <div className="mt-4">
                  <Link
                    to={`/issues-details/${issue._id}`}
                    className="btn btn-primary btn-sm w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestResolve;

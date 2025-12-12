import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <h2 className="font-bold text-lg">{issue.title}</h2>
      <p className="text-sm text-gray-600">{issue.category}</p>

      <div className="mt-2">
        <p className="text-sm">
          <span className="font-semibold">Priority:</span> {issue.priority}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {issue.location}
        </p>
      </div>

      <Link
        to={`/issues-details/${issue._id}`}
        className="inline-block mt-3 px-4 py-1 bg-blue-600 text-white rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default IssueCard;

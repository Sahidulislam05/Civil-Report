import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Issue"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {issue.title}
            <div className="badge badge-secondary">{issue.priority}</div>
            <div className="badge badge-secondary">{issue.status}</div>
          </h2>
          <p>{issue.description}</p>
          <p className="flex gap-2 items-center">
            <FaLocationDot /> {issue.location}
          </p>
          <div className="card-actions justify-end">
            <Link
              to={`/issues-details/${issue._id}`}
              className="btn btn-primary"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;

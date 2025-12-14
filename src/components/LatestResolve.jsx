import useLatestResolvedIssues from "../hooks/useLatestResolvedIssues";
import IssueCard from "./IssueCard";

const LatestResolve = () => {
  const { data: issues = [], isLoading } = useLatestResolvedIssues();

  if (isLoading)
    return <span className="loading loading-spinner text-success"></span>;

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold mb-4">Latest Resolved Issues</h1>

      {issues.length === 0 ? (
        <p>No resolved issues yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestResolve;

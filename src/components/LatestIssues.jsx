// import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";

const LatestIssues = () => {
  //   const { data, isLoading } = useQuery({
  //     queryKey: ["issues", "latest"],
  //     queryFn: async () => await getIssues({ limit: 6 }),
  //   });

  //   if (isLoading) {
  //     return (
  //       <div className="py-20 text-center">
  //         <span className="loading loading-bars loading-lg text-primary"></span>
  //       </div>
  //     );
  //   }

  return (
    <section className="py-20 px-4 bg-base-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-headings font-bold text-primary mb-2">
              Latest Reports
            </h2>
            <p className="text-gray-500">
              Recent issues reported by citizens in your area.
            </p>
          </div>
          <Link
            to="/all-issues"
            className="btn btn-link text-secondary no-underline hover:underline hidden md:flex"
          >
            See All Issues
          </Link>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.issues?.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div> */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/all-issues" className="btn btn-outline btn-primary w-full">
            See All Issues
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestIssues;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router";

const IssueDetails = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["issue", id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/issues/${id}`);
      return response.data;
    },
  });
  // console.log(data);
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-20">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Issue"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data?.title}
            <div className="badge badge-secondary">{data?.priority}</div>
            <div className="badge badge-secondary">{data?.status}</div>
          </h2>
          <p>{data?.description}</p>
          <p className="flex gap-2 items-center">
            <FaLocationDot /> {data?.location}
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TodayTasks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["staff_today_tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/today-tasks");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="py-6 flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Today's Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks for today.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <span className="font-medium">{task.title}</span>
              <span
                className={`badge capitalize ${
                  task.status === "resolved" || task.status === "closed"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {task.status.replace("-", " ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodayTasks;

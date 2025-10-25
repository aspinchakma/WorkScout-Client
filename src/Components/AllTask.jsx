import { useLoaderData } from "react-router-dom";
import Task from "./Task";

const AllTask = () => {
  const allTask = useLoaderData();

  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-10">
      <h3 className="text-[22px] font-semibold text-[#777]">
        We have identified {allTask?.length} tasks
      </h3>
      <div className="grid grid-cols-1 gap-5 mt-6">
        {allTask?.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default AllTask;

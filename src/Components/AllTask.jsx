import { useLoaderData } from "react-router-dom";

const AllTask = () => {
  const allTask = useLoaderData();
  console.log(allTask);
  return (
    <div>
      <h3>This is All Task Section</h3>
    </div>
  );
};

export default AllTask;

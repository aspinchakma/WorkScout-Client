import { useLoaderData } from "react-router-dom";

const JobDetails = () => {
  const job = useLoaderData();
  console.log(job);
  return (
    <div>
      <h3>This is Job Details</h3>
    </div>
  );
};

export default JobDetails;

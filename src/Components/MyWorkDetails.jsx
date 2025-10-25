import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyWorkDetails = ({ bid }) => {
  const { jobId, deliveryTime, biddingAmount } = bid;
  const [job, setJob] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, []);
  console.log(job);
  return (
    <div className="border-2 border-gray-300 rounded-md p-8">
      <h3 className="text-lg font-semibold">{job?.jobTitle}</h3>
      <p className="text-[#777] mt-4">My Bidding Ammount: {biddingAmount}K</p>
      <p className="text-[#777]">Estimated Delivery Time: {deliveryTime} H</p>
      <Link
        className="bg-green-700 px-2 py-1 rounded-md text-white border-2 border-green-700 hover:bg-white hover:text-green-700 duration-700 inline-block mt-3"
        to={`/tasks/${jobId}`}
      >
        See Job Details
      </Link>
    </div>
  );
};

export default MyWorkDetails;

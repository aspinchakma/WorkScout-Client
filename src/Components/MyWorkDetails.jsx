import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyWorkDetails = ({ bid, deleteWork }) => {
  const { jobId, deliveryTime, biddingAmount } = bid;
  const [job, setJob] = useState();
  useEffect(() => {
    fetch(`https://workscout-server.onrender.com/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, []);
  return (
    <div className="border-2 border-gray-300 rounded-md p-8">
      <h3 className="text-lg font-semibold">{job?.jobTitle}</h3>
      <p className="text-[#777] mt-4">My Bidding Ammount: {biddingAmount}K</p>
      <p className="text-[#777]">Estimated Delivery Time: {deliveryTime} H</p>
      <div className="flex gap-2 items-center mt-3">
        <Link
          className="bg-green-700 px-2 py-1 rounded-md text-white border-2 border-green-700 hover:bg-white hover:text-green-700 duration-700 font-semibold inline-block"
          to={`/tasks/${jobId}`}
        >
          See Job Details
        </Link>
        <button
          className="bg-orange-600 px-3 py-1 font-semibold text-white rounded-md border-orange-600 border-2 cursor-pointer hover:bg-white hover:text-orange-600 duration-700"
          onClick={() => deleteWork(bid?._id)}
        >
          Delete
        </button>
        <Link
          className="bg-blue-700 px-2 py-1 rounded-md text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 duration-700 font-semibold inline-block"
          to={`/workedit/${bid?._id}`}
        >
          See Job Details
        </Link>
      </div>
    </div>
  );
};

export default MyWorkDetails;

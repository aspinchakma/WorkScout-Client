import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FreeLancer from "./FreeLancer";

const ExpertFreeLancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  useEffect(() => {
    fetch("https://workscout-server.onrender.com/users/limitedData")
      .then((res) => res.json())
      .then((data) => setFreelancers(data));
  }, []);
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto mt-8">
      <h2 className="text-2xl font-medium">Expert Freelancers</h2>
      <p className="text-lg text-[#777] mt-2">
        Make your project real with our experts
      </p>
      <div className="border-2 border-gray-200 rounded-md mt-8">
        {freelancers?.map((freelancer, index) => (
          <FreeLancer
            key={freelancer._id}
            freelancer={freelancer}
            index={index}
          />
        ))}
      </div>
      <div className="mt-8">
        <Link
          to={`/allfreelancers`}
          className="bg-green-700 text-white px-3 py-2 rounded-sm hover:text-green-700 hover:bg-white duration-700 border-2 border-green-700"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default ExpertFreeLancers;

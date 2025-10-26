import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const BidderInfo = ({ bidder }) => {
  const { userId, deliveryTime, biddingAmount } = bidder;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/userInfo/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);
  return (
    <div className="border-2 border-gray-300 rounded-md p-6">
      <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
      <p>Designation: {userInfo?.designation}</p>
      <p>Email: {userInfo?.email}</p>
      <div className="flex items-center gap-2  mt-2 mb-4">
        <p>
          <span className="inline-block bg-[#febe42] px-2 py-[2px] rounded-md font-bold text-white">
            3.9
          </span>
        </p>
        <p className="flex items-center gap-1">
          <FaStar className="text-[#febe42] text-[20px]" />
          <FaStar className="text-[#febe42] text-[20px]" />
          <FaStar className="text-[#febe42] text-[20px]" />
          <FaStar className="text-[#febe42] text-[20px]" />
          <FaStar className="text-[#dddddd] text-[20px]" />
        </p>
      </div>
      <div className="divider"></div>

      <p>Bidding Ammount: {biddingAmount}K</p>
      <p>Delivery Time: {deliveryTime}H</p>
    </div>
  );
};

export default BidderInfo;

import { formatDistanceToNow, parseISO } from "date-fns";
import { use, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
import BidderInfo from "./BidderInfo";

const JobDetails = () => {
  const job = useLoaderData();
  const { user } = use(AuthContext);
  const {
    companyId,
    maximumRate,
    maximumSalary,
    minimumSalary,
    minimumRate,
    description,
    deadline,
  } = job;
  const [company, SetCompany] = useState({});
  const [deliveryDay, setDeliveryDay] = useState(1);
  const [biddingAmoutInput, setBiddingAmout] = useState(null);
  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/companydetails/${companyId}`)
      .then((res) => res.json())
      .then((data) => SetCompany(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/bids/jobDetails/${job._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBidders(data);
      });
  }, []);

  const remainingDays = parseISO(deadline);
  const reaminingTimeFinals = formatDistanceToNow(remainingDays, {
    addSuffix: true,
  });
  const handleBid = () => {
    if (biddingAmoutInput <= 0) {
      Swal.fire({
        title: "Please Write Bid Ammount!",
        icon: "error",
      });
      return;
    }
    const biddingInfo = {
      jobId: job._id,
      userId: user._id,
      deliveryTime: deliveryDay,
      biddingAmount: biddingAmoutInput,
    };
    // send to the server
    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(biddingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Submitted!",
            icon: "success",
          });
        }
      });
  };
  return (
    <>
      {/* Job section Heading */}
      <div className="bg-[#f7f7f7] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2  w-[90%] lg:w-[77%] mx-auto lg:items-center">
          <div className="lg:col-span-2 rounded-md">
            <img
              className=" w-36 h-36 mx-auto p-3 rounded-md bg-white object-cover"
              src={company?.logo}
              alt=""
            />
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-semibold">{job?.jobTitle}</h3>
            <h3>Added By</h3>
            <div className="lg:flex gap-3 lg:items-center text-[#777]">
              <Link
                className="hover:text-green-700 duration-700 font-medium flex gap-2"
                to={`/companyDetails/${companyId}`}
              >
                <LuBuilding2 className="text-[22px]" /> {company?.name}
              </Link>
              <div className="flex  gap-2 mt-2 mb-4 ">
                <p>
                  <span className="inline-block bg-[#febe42] px-2 py-[2px] rounded-[4px] font-bold text-white text-[14px]">
                    3.9
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-[#febe42] text-[18px]" />
                  <FaStar className="text-[#febe42] text-[18px]" />
                  <FaStar className="text-[#febe42] text-[18px]" />
                  <FaStar className="text-[#febe42] text-[18px]" />
                  <FaStar className="text-[#dddddd] text-[20px]" />
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-md flex items-center justify-center">
            {minimumSalary ? (
              <div className="bg-white w-fit p-5">
                <h3 className="font-medium tex-[20px]">Budget:</h3>
                <div className="flex items-center gap-1 text-[24px] font-medium">
                  <h3>${minimumSalary}</h3>
                  <h3>-</h3>
                  <h3>${maximumSalary}</h3>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-3 rounded-md flex items-center justify-center">
                <div className="bg-white w-fit p-5">
                  <h3 className="font-medium tex-[20px]">Budget:</h3>
                  <div className="flex items-center gap-1 text-[24px] font-medium">
                    <h3>${minimumRate}</h3>
                    <h3>-</h3>
                    <h3>${maximumRate}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-10 w-[90%] lg:w-[77%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
        <div className="lg:col-span-8">
          <h3 className="text-2xl mb-3 font-medium">Project Description: </h3>
          <p className="text-[#777] leading-9">{description}</p>

          {/* Bidders Information */}
          <div>
            {bidders.length ? (
              <>
                <h2 className="text-lg font-semibold mt-5 mb-3">Bidders: </h2>
                <div className="grid grid-cols-1 gap-5">
                  {bidders.map((bidder) => (
                    <BidderInfo key={bidder._id} bidder={bidder} />
                  ))}
                </div>
              </>
            ) : (
              <h3 className="text-xl font-semibold text-warning">
                No Bidders Inforamtion
              </h3>
            )}
          </div>
        </div>
        <div className="lg:col-span-4">
          <h3 className="text-[#289c41] bg-[#e7f8ec] text-center py-3 rounded-md">
            Bidding ends in {reaminingTimeFinals}
          </h3>
          <div className="bg-[#f9f9f9] mt-4 pt-0 lg:pt-0">
            <div className="bg-[#f0f0f0] p-5 lg:p-8 rounded-t-md">
              <h3 className="text-[24px] font-medium ">Bid on this Job!</h3>
            </div>
            <div className="p-5 lg:p-8 rounded-b-md">
              <div>
                <p className="mb-2">
                  <span className="text-[#777]">Set your</span> bid amount
                </p>
                <input
                  onChange={(e) => setBiddingAmout(e.target.value)}
                  className="text-[#777] outline-0 px-3 py-2 rounded-md w-full border-2 border-gray-400"
                  type="number"
                  name="bidAmount"
                  placeholder="Write Your bid amount"
                  required
                />
                <p className="text-[#777] mt-5">
                  Set your <span className="text-black">delivery time</span> in
                  days
                </p>
                <div className="flex justify-between items-center border-2 border-gray-400 rounded-md p-2 text-[20px] font-bold bg-white mt-3">
                  <button
                    className=" border-2 border-gray-400 px-4 py-1 rounded-md cursor-pointer inline-block"
                    onClick={() => {
                      deliveryDay > 1 && setDeliveryDay(deliveryDay - 1);
                    }}
                  >
                    -
                  </button>
                  <p>{deliveryDay}</p>
                  <button
                    className=" border-2 border-gray-400 px-4 py-1 rounded-md cursor-pointer inline-block"
                    onClick={() => setDeliveryDay(deliveryDay + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleBid}
                  className="w-full text-center py-2 rounded-md bg-green-700 text-white border-2 border-green-700 hover:bg-white hover:text-green-700 duration-700 mt-5 cursor-pointer font-medium"
                >
                  Bid This Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;

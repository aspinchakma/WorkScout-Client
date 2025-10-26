import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaLink,
  FaPhoneAlt,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { IoPeopleSharp } from "react-icons/io5";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useLoaderData } from "react-router-dom";
import ShowingTask from "./ShowingTask";

const CompanyDetails = () => {
  const [jobsThisCompany, setJobsThisComapny] = useState([]);

  const compay = useLoaderData();
  const {
    about,
    avarageSalary,
    email,
    facebook,
    headerImage,
    industry,
    location,
    logo,
    name,
    phone,
    size,
    slogan,
    twitter,
    website,
    _id,
  } = compay;

  useEffect(() => {
    fetch(`https://workscout-server.onrender.com/jobs/companyDetails/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setJobsThisComapny(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="relative">
      <img
        className="w-full h-[300px] object-cover relative"
        src={headerImage}
        alt=""
      />

      {/* for linear gradient */}
      <div className="h-[300px] bg-linear-to-b from-transparent to-white z-1 absolute inset-0"></div>

      {/* content parts */}
      <div className="relative w-[90%] lg:w-[77%] mx-auto translate-y-[-200px] z-10">
        <div className="flex gap-5 flex-col lg:flex-row bg-white p-[28px] lg:p-[35px] shadow-2xl">
          <img
            className="lg:w-[120px] lg:h-[120px] object-cover w-[180px] h-[180px] rounded-[4px] mx-auto lg:mx-0"
            src={logo}
            alt=""
          />
          <div>
            <h3 className="text-xl font-medium">{name}</h3>
            <p className="text-[#777] mt-2 mb-3 text-[15px]">{slogan}</p>
            <div className="flex  gap-2 mt-2 mb-4">
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
            <div className="flex gap-2 flex-col lg:flex-row">
              <a
                href={website}
                target="_blank"
                className="text-[#777] bg-[#f6f6f6] text-[15px] flex gap-1 px-2 py-1 rounded-[4px] items-center"
              >
                <FaLink /> <span>Website</span>
              </a>
              <p className="text-[#777] bg-[#f6f6f6] text-[15px] flex gap-1 px-2 py-1 rounded-[4px] items-center">
                <MdEmail /> <span>{email}</span>
              </p>
              <a
                href={twitter}
                target="_blank"
                className="text-[#777] bg-[#f6f6f6] text-[15px] flex gap-1 px-2 py-1 rounded-[4px] items-center"
              >
                <FaTwitter /> <span>Twitter</span>
              </a>
              <a
                href={facebook}
                target="_blank"
                className="text-[#777] bg-[#f6f6f6] text-[15px] flex gap-1 px-2 py-1 rounded-[4px] items-center"
              >
                <FaFacebook /> <span>Facebook</span>
              </a>
              <p className="text-[#777] bg-[#f6f6f6] text-[15px] flex gap-1 px-2 py-1 rounded-[4px] items-center">
                <FaPhoneAlt /> <span>{phone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* others content */}
        <div className="grid grid-col-1 lg:grid-cols-12 mt-12 border-black gap-7 lg:gap-12">
          <div className="lg:col-span-8">
            <div>
              <h3 className="text-[20px] font-medium mb-8">About Use</h3>
              <p className="text-[#777] leading-10">{about}</p>
            </div>

            {/* open jobs section */}
            <div className="my-8">
              {jobsThisCompany?.length ? (
                <div>
                  <h3 className="text-[20px] mb-8 font-medium">
                    Open Positions
                  </h3>
                  <div className="grid grid-cols-1 gap-5">
                    {jobsThisCompany?.map((task) => (
                      <ShowingTask key={task._id} task={task} />
                    ))}
                  </div>
                </div>
              ) : (
                <h3 className="text-[20px] font-medium text-red-800">
                  No Job Available Now!
                </h3>
              )}
            </div>
          </div>

          {/* Comapny OverView */}
          <div className="lg:col-span-4">
            <h3 className="text-[20px] font-medium">Company Overview</h3>
            <div className="bg-[#f9f9f9] space-y-4 p-[20px] lg:p-[32px] mt-10 rounded-lg">
              <div className="flex items-center gap-4 rounded-lg">
                <div className="bg-[#e0f0e7] p-3">
                  <GoLocation className="text-[#26ae61] text-[18px] " />
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-[15px] text-[#777]">{location}</p>
                </div>
              </div>
              <div className="bg-[#f9f9f9]">
                <div className="flex items-center gap-4 rounded-lg">
                  <div className="bg-[#e0f0e7] p-3">
                    <IoPeopleSharp className="text-[#26ae61] text-[18px] " />
                  </div>
                  <div>
                    <p className="font-medium">Comapny Size: </p>
                    <p className="text-[15px] text-[#777]">{size}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg">
                <div className="bg-[#e0f0e7] p-3">
                  <LiaIndustrySolid className="text-[#26ae61] text-[18px] " />
                </div>
                <div>
                  <p className="font-medium">Industry:</p>
                  <p className="text-[15px] text-[#777]">{industry}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg">
                <div className="bg-[#e0f0e7] p-3">
                  <RiMoneyDollarCircleLine className="text-[#26ae61] text-[18px] " />
                </div>
                <div>
                  <p className="font-medium">Avg. Salary:</p>
                  <p className="text-[15px] text-[#777]">{avarageSalary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

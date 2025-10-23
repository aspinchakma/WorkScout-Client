import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CompanyData = ({ company }) => {
  const { about, logo, slogan, name, location, size, avarageSalary, _id } =
    company;
  return (
    <Link
      to={`/companyDetails/${_id}`}
      className="border-2 border-[#e0e0e0]  rounded-lg lg:p-[30px] p-[22px] grid grid-cols-1 lg:grid-cols-12 hover:border-l-green-600 hover:border-l-4 duration-700"
    >
      <div className="lg:col-span-3">
        <img
          className="w-full lg:w-[120px] h-[200px] lg:h-[120px] object-cover rounded-[4px]"
          src={logo}
          alt=""
        />
        <div className="text-[#888] mt-4 space-y-2 ">
          <p className="text-[15px] flex items-center gap-2">
            <IoLocationOutline className="text-lg" />
            {location}
          </p>
          <p className="text-[15px] flex items-center gap-2">
            {" "}
            <MdOutlinePeopleOutline className="text-lg" />
            {size}
          </p>
          <p className="text-[15px] flex items-center gap-2">
            <LuBadgeDollarSign className="text-lg" />
            {avarageSalary}
          </p>
        </div>
      </div>
      <div className="lg:col-span-9">
        <h3 className="text-[20px] font-medium">{name}</h3>
        <p className="text-[#888]">{slogan}</p>
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
        <p className="text-[#888]">{about.slice(0, 300)}...</p>
      </div>
    </Link>
  );
};

export default CompanyData;

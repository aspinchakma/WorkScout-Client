import { FaStar } from "react-icons/fa";

const Company = ({ company }) => {
  const { logo, slogan, name } = company;
  return (
    <div className="border-2 border-[#e0e0e0] text-center py-6 rounded-[4px]">
      <img
        className="w-[100px] h-[100px] object-cover mx-auto"
        src={logo}
        alt="Company Logo"
      />
      <h3 className="text-xl font-medium ">{name}</h3>
      <p className="text-[15px] text-[#888]  mt-2 mb-3">{slogan}</p>
      <div className="flex items-center gap-2 justify-center mt-2 mb-4">
        <p>
          <span className="inline-block bg-[#febe42] px-2 py-[2px] rounded-[4px] font-bold text-white">
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
    </div>
  );
};

export default Company;

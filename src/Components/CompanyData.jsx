import { FaStar } from "react-icons/fa";

const CompanyData = ({ company }) => {
  const { about, logo, slogan, name, location, size, avarageSalary } = company;
  return (
    <div className="border-2 border-[#e0e0e0]  rounded-lg lg:p-[30px] p-[22px] grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <img
          className="w-full lg:w-[120px] h-[200px] lg:h-[120px] object-cover rounded-[4px]"
          src={logo}
          alt=""
        />
        <div className="text-[#888] mt-4 space-y-2">
          <p className="text-[15px]">{location}</p>
          <p className="text-[15px]">{size}</p>
          <p className="text-[15px]">{avarageSalary}</p>
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
    </div>
  );
};

export default CompanyData;

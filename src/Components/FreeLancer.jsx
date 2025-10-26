import { Link } from "react-router-dom";

const FreeLancer = ({ freelancer, index }) => {
  return (
    <div
      className={`${
        (index + 1) % 2 === 0 ? "bg-[#f9f9f9]" : "bg-white"
      } grid grid-cols-1 lg:grid-cols-12 p-7 lg:p-8 items-center border-l-4 border-l-white hover:border-l-green-700 duration-700 cursor-pointer `}
    >
      <div className="lg:col-span-2">
        <img
          className="lg:w-[120px] lg:h-[120px] h-[200px] w-full lg:rounded-full object-cover rounded-md"
          src={freelancer?.photo}
          alt=""
        />
      </div>
      <div className="lg:col-span-8">
        <h3 className="text-[23px] font-medium">{freelancer?.name}</h3>
        <p className="text-[17px] text-[#777]">{freelancer?.designation}</p>
        <p className="text-[17px] text-[#777]">{freelancer?.email}</p>
      </div>
      <div className="lg:col-span-2">
        <p className="text-[#777]">Rate</p>
        <p className="text-sm mt-1 font-semibold">
          ${freelancer?.ratePerHour} / H
        </p>
        <Link
          to={`/freelancerProfile/${freelancer._id}`}
          className="px-3 py-2 rounded-md bg-[#dff3e7] text-green-700 hover:bg-green-700 hover:text-white font-medium inline-block mt-3 text-[15px] duration-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default FreeLancer;

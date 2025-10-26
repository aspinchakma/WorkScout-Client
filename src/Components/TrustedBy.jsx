import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Company from "./Company";

const TrustedBy = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch("https://workscout-server.onrender.com/companies/3")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto mt-10">
      <h3 className="text-center text-[28px] font-medium">
        Featured Companies
      </h3>
      <p className="text-center text-[20px] text-[#888] mt-1">
        Always interested in meeting new talent
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7 mt-8">
        {companies.map((company) => (
          <Company key={company._id} company={company} />
        ))}
      </div>
      <div className="flex justify-center mt-7">
        <Link
          to={`/companies`}
          className="bg-[#26ae61] text-white font-medium px-4 py-3 border-0 cursor-pointer rounded-[4px]"
        >
          Browse Companies
        </Link>
      </div>
    </div>
  );
};

export default TrustedBy;

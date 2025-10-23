import { useEffect, useState } from "react";

const TrustedBy = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/companies/3")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto">
      <h3 className="text-center text-[28px] font-medium">
        Featured Companies
      </h3>
      <p className="text-center text-[20px] text-[#888] mt-1">
        Always interested in meeting new talent
      </p>
    </div>
  );
};

export default TrustedBy;

import { useLoaderData } from "react-router-dom";
import CompanyData from "./CompanyData";

const Companies = () => {
  const data = useLoaderData();
  return (
    <div>
      <div className="bg-[#f8f8f8]">
        <div className="w-[90%] lg:w-[77%] mx-auto py-12 lg:py-16">
          <p className="text-[#888]">
            We have {data.length} companies in our database
          </p>
          <h2 className="text-[26px] font-medium mt-2">
            Showing all companies
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 w-[90%] lg:w-[77%] mx-auto my-9 lg:my-12">
        {data.map((company) => (
          <CompanyData key={company._id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default Companies;

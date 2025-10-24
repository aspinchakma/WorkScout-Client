import { useContext } from "react";
import Swal from "sweetalert2";
import DataContextl from "../Context/DataContextl";
import MyCompany from "./MyCompany";

const MyComapnies = () => {
  const { companies } = useContext(DataContextl);
  console.log(companies);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your Company Details has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-10">
      <h2 className="text-[26px] font-medium text-[#777] mb-8">
        You have created {companies?.length} companies
      </h2>
      <div className="grid grid-cols-1 gap-5">
        {companies?.map((company) => (
          <MyCompany
            key={company?._id}
            handleDelete={handleDelete}
            company={company}
          />
        ))}
      </div>
    </div>
  );
};

export default MyComapnies;

import { useContext } from "react";
import Swal from "sweetalert2";
import DataContextl from "../Context/DataContextl";
import MyCompany from "./MyCompany";

const MyComapnies = () => {
  const { companies, setCompanies } = useContext(DataContextl);

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
        fetch(`https://workscout-server.onrender.com/selectedCompanies/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Company Details has been deleted.",
                icon: "success",
              });
              const finalResult = companies.filter(
                (company) => company._id !== id
              );
              setCompanies(finalResult);
            }
          });
      }
    });
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-10">
      {companies ? (
        <>
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
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-warning text-3xl font-semibold">
            No Data Found!
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyComapnies;

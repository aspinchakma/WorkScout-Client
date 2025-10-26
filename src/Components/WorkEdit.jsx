import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const WorkEdit = () => {
  const data = useLoaderData();
  const [job, setJob] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/jobs/${data.jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, []);
  console.log(job);
  const handleEdit = (e) => {
    e.preventDefault();

    const deliveryTime = e.target.deliveryTime.value;
    const biddingAmount = e.target.biddingAmount.value;
    fetch(`http://localhost:5000/singlebid/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ deliveryTime, biddingAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Successfull Updated!",
            icon: "success",
          });
        }
      });
  };
  return (
    <div className="w-[90%] lg;w-[77%] mx-auto my-10">
      <h2 className="text-blue-700 font-medium text-3xl ">Edit Your Work</h2>
      <div className="divider"></div>
      <h3 className="text-xl font-medium">Job Title: {job?.jobTitle}</h3>
      <form className="mt-5" onSubmit={handleEdit}>
        <div className="flex flex-col gap-2">
          <label className="label text-black text-[18px] font-semibold">
            Bidding Ammount(K):{" "}
          </label>{" "}
          <input
            type="number"
            className="input inline-block outline-0 text-[#777]"
            defaultValue={data.biddingAmount}
            name="biddingAmount"
          />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <label className="label  text-black text-[18px] font-semibold">
            Delivery Time(H):{" "}
          </label>
          <input
            type="number"
            className="input outline-0 text-[#777]"
            defaultValue={data.deliveryTime}
            name="deliveryTime"
          />
        </div>
        <button className="px-3 py-2 bg-blue-700 text-white border-2 border-blue-700 hover:bg-white hover:text-blue-700 duration-700 cursor-pointer inline-block mt-5 rounded-md">
          Save
        </button>
      </form>
    </div>
  );
};

export default WorkEdit;

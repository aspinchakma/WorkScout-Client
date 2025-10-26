import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
import MyWorkDetails from "./MyWorkDetails";

const MyWork = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    fetch(`https://workscout-server.onrender.com/bids/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, []);
  const deleteWork = (id) => {
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
        // delete

        fetch(`https://workscout-server.onrender.com/bids/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              // delete from ui
              const finalWorks = bids.filter((work) => work._id !== id);
              setBids(finalWorks);
            }
          });
      }
    });
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-8">
      {bids.length ? (
        <>
          <h3 className="text-2xl font-semibold mb-5">
            We have received your {bids.length} works submissions in the
            database.
          </h3>
          <div className="grid grid-cols-1 gap-5">
            {bids?.map((bid) => (
              <MyWorkDetails key={bid?._id} bid={bid} deleteWork={deleteWork} />
            ))}
          </div>
        </>
      ) : (
        <h3 className="text-lg text-red-400 font-semibold">
          You have not selected any task
        </h3>
      )}
    </div>
  );
};

export default MyWork;

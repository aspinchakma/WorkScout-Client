import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContex";
import MyWorkDetails from "./MyWorkDetails";

const MyWork = () => {
  const { user } = useContext(AuthContext);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/bids/${user?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setBids(data);
      });
  }, []);
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
              <MyWorkDetails key={bid?._id} bid={bid} />
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

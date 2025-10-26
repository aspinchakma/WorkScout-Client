import { useLoaderData } from "react-router-dom";
import FreeLancer from "./FreeLancer";

const AllFreeLancer = () => {
  const freeLancers = useLoaderData();
  return (
    <div>
      <div className="bg-gray-200">
        <div className="w-[90%] lg:w-[77%] mx-auto  py-8 lg:py-10">
          <h3 className="text-lg font-medium">
            Found {freeLancers.length} data entries from the database.
          </h3>
        </div>
      </div>

      <div className="w-[90%] lg:w-[77%] mx-auto my-6 lg:my-10">
        {freeLancers?.map((freelancer, index) => (
          <FreeLancer
            key={freelancer._id}
            freelancer={freelancer}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AllFreeLancer;

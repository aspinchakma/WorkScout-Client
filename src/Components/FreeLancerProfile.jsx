import { useLoaderData } from "react-router-dom";

const FreeLancerProfile = () => {
  const freelancer = useLoaderData();
  return (
    <div className="w-[90%] lg:-[77%] mx-auto my-6 lg:my-10">
      <h2 className="text-2xl">FreeLancer Profile</h2>
      <div className="mt-5">
        <img
          className="w-[200px] h-[200px] rounded-md object-cover"
          src={freelancer?.photo}
          alt=""
        />
        <h3 className="text-2xl font-semibold mt-3">
          Full Name: {freelancer?.name}
        </h3>
        <p className="text-[#777] font-medium">
          Designation: {freelancer?.designation}
        </p>
        <p className="text-[#777] font-medium">Email: {freelancer?.email}</p>
        <div className="divider"></div>
        <p className="text-xl mt-3 font-semibold">About Me</p>
        <p className="leading-8 text-[#777]">{freelancer?.about}</p>
      </div>
    </div>
  );
};

export default FreeLancerProfile;

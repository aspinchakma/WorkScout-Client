import { use } from "react";
import AuthContext from "../Context/AuthContex";

const Profile = () => {
  const { userSignOut, setUser, user } = use(AuthContext);
  const signOut = () => {
    userSignOut()
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto  my-10">
      <img
        className="w-[200px] h-[200px] object-cover rounded-lg"
        src={user?.photo}
        alt=""
      />
      <h3 className="text-2xl font-semibold mt-2">{user?.name}</h3>
      <p>{user?.email}</p>
      <h3 className="font-semibold my-3 text-xl">About Me: </h3>
      <p className="text-[#777] leading-8">{user?.about}</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={signOut}
          className="font-medium bg-error text-white px-3 py-2 rounded-sm cursor-pointer"
        >
          Sign OUt
        </button>
        <button className="font-medium  bg-success text-white px-3 py-2 rounded-sm  cursor-pointer">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;

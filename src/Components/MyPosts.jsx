import { use } from "react";
import AuthContext from "./../Context/AuthContex";

const MyPosts = () => {
  const { user } = use(AuthContext);
  console.log(user);
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto">
      <h3>This is My Post</h3>
    </div>
  );
};

export default MyPosts;

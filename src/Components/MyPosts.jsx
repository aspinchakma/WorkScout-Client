import { use, useEffect, useState } from "react";
import AuthContext from "./../Context/AuthContex";
import Task from "./Task";

const MyPosts = () => {
  const { user } = use(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/jobs/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(posts);
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-10">
      <div>
        {posts.length ? (
          posts?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <h3 className="text-2xl text-error font-medium">
            No posts yet — add one to see your content.
          </h3>
        )}
      </div>
    </div>
  );
};

export default MyPosts;

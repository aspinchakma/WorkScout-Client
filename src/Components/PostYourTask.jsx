import { RxCheck } from "react-icons/rx";
import PostYourTaskImg from "../assets/post-you.webp";
const PostYourTask = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-[90%] mx-auto w-[95%]  rounded-lg overflow-hidden my-16">
      <div className="lg:order-2 text-white bg-[#195a22] lg:py-[80px] lg:px-[60px] px-[22px] py-[32px]">
        <h3 className="text-3xl font-medium mb-2 lg:mt-4">
          Post your first task in seconds
        </h3>
        <p className="text-[#FFFFFFA1] text-[19px]">
          Save yourself hours and get your to-do list completed
        </p>
        <div className="space-y-2 mt-5">
          <p className="flex gap-1 items-center">
            <RxCheck className=" text-[20px]" />{" "}
            <span>Describe what you need done</span>
          </p>
          <p className="flex gap-1 items-center">
            <RxCheck className=" text-[20px]" /> <span>Set your budget</span>
          </p>
          <p className="flex gap-1 items-center">
            <RxCheck className=" text-[20px]" />{" "}
            <span>Receive quotes and pick the best Tasker</span>
          </p>
          <button className="text-black bg-white font-semibold px-3 py-[10px] rounded-[4px] mt-5 hover:translate-y-[5px] duration-700 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
      <img className="lg:order-1 w-full" src={PostYourTaskImg} alt="" />
    </div>
  );
};

export default PostYourTask;

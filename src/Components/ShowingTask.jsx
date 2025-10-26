import { format, formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowingTask = ({ task }) => {
  const {
    jobTitle,
    jobTags,
    jobCategory,
    createdAt,
    description,
    deadline,
    _id,
    companyId,
  } = task;
  const [company, SetCompany] = useState({});
  useEffect(() => {
    fetch(`https://workscout-server.onrender.com/companydetails/${companyId}`)
      .then((res) => res.json())
      .then((data) => SetCompany(data))
      .catch((err) => console.log(err));
  }, []);

  const postDate = parseISO(createdAt);
  const deadLineDate = parseISO(deadline);
  const formatedTime = format(deadline, "EEEE MMMM d yyyy");
  const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });
  const remainingTime = formatDistanceToNow(deadLineDate, { addSuffix: true });
  return (
    <div className="border-2 border-gray-300 rounded-lg p-6 grid grid-cols-1 gap-3 lg:items-center">
      <div>
        <h3 className="font-semibold text-[24px]">{jobTitle}</h3>
        <Link
          className="hover:text-green-700 duration-700 font-semibold"
          to={`/companyDetails/${companyId}`}
        >
          Posted By: {company?.name}
        </Link>

        <div className="divider h-0"></div>
        <p className="text-[#777] mb-3">
          {description?.slice(0, 250)}...see more
        </p>
        <div className="text-[13px] flex gap-3 flex-col lg:flex-row">
          <p className="text-[#26ae61] font-medium bg-[#f0f9f4] px-2 py-1 rounded-sm w-fit">
            Industry: {jobCategory}
          </p>
          <p className="text-[#26ae61] font-medium bg-[#f0f9f4] px-2 py-1 rounded-sm w-fit">
            Job Tags: {jobTags}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-gray-700 font-medium">Posted: {timeAgo}</p>
          <p className="text-gray-700 font-medium">
            Deadline: {formatedTime}({remainingTime})
          </p>
        </div>
        <Link
          className="bg-[#186fc9] px-3 py-2 rounded-sm inline-block text-white font-bold mt-5 border-2 border-[#186fc9] hover:text-[#186fc9] hover:bg-white duration-600"
          to={`/tasks/${_id}`}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default ShowingTask;

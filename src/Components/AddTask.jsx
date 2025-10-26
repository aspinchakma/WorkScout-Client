import { use, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
import DataContextl from "../Context/DataContextl";

const AddTask = () => {
  const { companies } = use(DataContextl);
  const { user } = use(AuthContext);
  const [companyInfo, setCompanyInfo] = useState({
    companyId: "",
    jobTitle: "",
    location: "",
    jobType: "",
    jobTags: "",
    jobCategory: "",
    description: "",
    applicationEmail: "",
    minimumRate: "",
    maximumRate: "",
    minimumSalary: "",
    maximumSalary: "",
    photo: "",
    creatorId: "",
    deadline: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "companyName") {
      // get company id
      const findCompany = companies?.find((com) => com.name === value);
      if (findCompany?._id) {
        const id = findCompany._id;
        const userId = user?._id;

        // company id and user id
        // company id for showin data for company
        // user id for user can show all jobs post
        setCompanyInfo({ ...companyInfo, companyId: id, creatorId: userId });
      }
    } else if (name === "photo") {
      // get photo
      setCompanyInfo({ ...companyInfo, photo: files[0] });
    } else {
      // get others info
      setCompanyInfo({ ...companyInfo, [name]: value });
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    // showing sweet alert
    Swal.fire({
      title: "Posting in progress...",
      allowOutsideClick: false,
      customClass: {
        title: "my-swal-title",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // image
    const imgCover = new FormData();
    imgCover.append("image", companyInfo.photo);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    // uploading cover image
    try {
      const resImg = await fetch(uploadUrl, {
        method: "POST",
        body: imgCover,
      });
      const data = await resImg.json();
      if (data.success) {
        const photoLink = data.data.url;

        //adding photo url to companyInfo
        const finalCompanyInfo = {
          companyId: companyInfo.companyId,
          jobTitle: companyInfo.jobTitle,
          location: companyInfo.location,
          jobType: companyInfo.jobType,
          jobTags: companyInfo.jobTags,
          jobCategory: companyInfo.jobCategory,
          description: companyInfo.description,
          applicationEmail: companyInfo.applicationEmail,
          minimumRate: companyInfo.minimumRate,
          maximumRate: companyInfo.maximumRate,
          minimumSalary: companyInfo.minimumSalary,
          maximumSalary: companyInfo.maximumSalary,
          photo: photoLink,
          creatorId: companyInfo.creatorId,
          deadline: companyInfo.deadline,
        };

        // sending to the server
        fetch("https://workscout-server.onrender.com/jobs", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(finalCompanyInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              // posting company information successfully !
              Swal.close();
              Swal.fire({
                title: "Your post was successfully created.",
                icon: "success",
                draggable: true,
                customClass: {
                  title: "my-swal-title",
                },
              });

              // resetin form
              e.target.reset();
            }
          })
          .catch((err) => {
            console.log(err.code);
            Swal.close();
            Swal.fire({
              icon: "error",
              title: `Try Again`,
              customClass: {
                title: "my-swal-title",
              },
            });
          });
      }
    } catch (error) {
      console.log(error.code);
      Swal.close();
      Swal.fire({
        icon: "Change Photo Format",
        title: `Please Change photo or photo format.`,
        customClass: {
          title: "my-swal-title",
        },
      });
    }
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-8">
      <h3 className="text-2xl font-semibold mb-4">Post a Job</h3>
      {!companies.length && (
        <p className="text-error font-bold text-[22px]">
          Please create a company account first in order to post a job.!
        </p>
      )}
      <div className="divider"></div>
      <form onSubmit={handlePost} className="card w-full">
        <fieldset className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="lg:col-span-2">
            {/* option */}
            <label className="label text-[16px] mb-2 text-black font-medium">
              Select Company
            </label>
            <select
              onChange={handleChange}
              name="companyName"
              className="select select-primary w-full text-[#777] outline-0"
              required
            >
              <option>Select Company</option>
              {companies?.map((com) => (
                <option key={com?._id}>{com.name}</option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className="label text-[16px] mb-2 text-black font-medium">
              Job Title
            </label>
            <input
              type="text"
              className="input w-full text-[#777] outline-0"
              placeholder="Job Title"
              required
              onChange={handleChange}
              name="jobTitle"
            />
          </div>

          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Location
            </label>
            <input
              type="text"
              className="input w-full text-[#777] outline-0"
              placeholder="Location"
              required
              name="location"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Job Type
            </label>
            <input
              type="text"
              className="input w-full text-[#777] outline-0"
              placeholder="Job Type"
              required
              name="jobType"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Job Tags
            </label>
            <input
              type="text"
              className="input w-full text-[#777] outline-0"
              placeholder="e.g.Web Developemtn, Graphics Designer"
              required
              name="jobTags"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Job Category
            </label>
            <select
              required
              name="jobCategory"
              onChange={handleChange}
              className="select select-primary w-full text-[#777] outline-0"
            >
              <option>Select Job Category</option>
              <option>Technology</option>
              <option>Teaching</option>
            </select>
          </div>
          <fieldset className="fieldset lg:col-span-2">
            <label className="label text-[17px] mb-2 text-black font-medium">
              Description
            </label>
            <textarea
              required
              onChange={handleChange}
              name="description"
              className="textarea h-28 w-full text-[#777] outline-0"
              placeholder="Job Description"
            ></textarea>
          </fieldset>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Aplication Email/URL
            </label>
            <input
              type="text"
              className="input w-full text-[#777] outline-0"
              required
              name="applicationEmail"
              defaultValue={user?.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Minimum rate/h($) <span className="text-[#777]">(Optional)</span>
            </label>
            <input
              type="number"
              className="input w-full text-[#777] outline-0"
              placeholder="e.g.20"
              name="minimumRate"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Maximum rate/h($) <span className="text-[#777]">(Optional)</span>
            </label>
            <input
              type="number"
              className="input w-full text-[#777] outline-0"
              placeholder="e.g.50"
              name="maximumRate"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Minimum Salary($) <span className="text-[#777]">(Optional)</span>
            </label>
            <input
              type="number"
              className="input w-full text-[#777] outline-0"
              placeholder="e.g.20000"
              name="minimumSalary"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Maximum Salary($) <span className="text-[#777]">(Optional)</span>
            </label>
            <input
              type="number"
              className="input w-full text-[#777] outline-0"
              placeholder="e.g.50000"
              name="maximumSalary"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[16px] mb-2 text-black font-medium">
              Deadline <span className="text-[#777]"></span>
            </label>
            <input
              type="date"
              className="input w-full text-[#777] outline-0"
              name="deadline"
              onChange={handleChange}
            />
          </div>
          <fieldset className="lg:col-span-2">
            <label className="label text-[16px] mb-2 text-black font-medium">
              Header Photo
            </label>
            <input
              type="file"
              className="file-input w-full"
              required
              name="photo"
              onChange={handleChange}
            />
          </fieldset>
          <button
            disabled={!companies.length}
            className="w-full lg:col-span-2 bg-green-700 text-white font-semibold py-2 rounded-md text-[16px] cursor-pointer "
          >
            Post
          </button>
        </fieldset>
      </form>
      <form action=""></form>
    </div>
  );
};

export default AddTask;

import { use, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
import "./AddCompany.css";

const AddCompany = () => {
  const { user } = use(AuthContext);
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    slogan: "",
    logo: "",
    website: "",
    email: "",
    phone: "",
    twitter: "",
    facebook: "",
    location: "",
    size: "",
    avarageSalary: "",
    about: "",
    headerImage: "",
    industry: "",
    jobs: [],
    creatorId: "",
  });
  const handleChanging = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setCompanyInfo({ ...companyInfo, logo: files[0] });
    } else if (name === "headerImage") {
      setCompanyInfo({ ...companyInfo, headerImage: files[0] });
    } else {
      setCompanyInfo({ ...companyInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // showing sweet alert
    Swal.fire({
      title: "Creating Company. Please Wait!",
      allowOutsideClick: false,
      customClass: {
        title: "my-swal-title",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // logo
    const imgDataOne = new FormData();
    imgDataOne.append("image", companyInfo.logo);

    // header imgage
    const imgDataTwo = new FormData();
    imgDataTwo.append("image", companyInfo.headerImage);

    // IMGBB api key
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    // uploading logo image
    try {
      const resImg = await fetch(uploadUrl, {
        method: "POST",
        body: imgDataOne,
      });
      const data = await resImg.json();
      if (data.success) {
        companyInfo.logo = data.data.url;

        // adding creator Id
        companyInfo.creatorId = user._id;

        // image two
        const resImgTwo = await fetch(uploadUrl, {
          method: "POST",
          body: imgDataTwo,
        });
        const dataTwo = await resImgTwo.json();
        if (data.success) {
          companyInfo.headerImage = dataTwo.data.url;

          // sending data to the server
          const companDBData = await fetch("http://localhost:5000/companies", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(companyInfo),
          });
          const result = await companDBData.json();
          if (result.insertedId) {
            Swal.close();
            Swal.fire({
              title: "Account created! Thanks for joining us.",
              icon: "success",
              draggable: true,
              customClass: {
                title: "my-swal-title",
              },
            });
            e.target.reset();
          }
          // clossing sweet alert
        }
      }
    } catch (error) {
      console.log(error.code);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: `Please Change photo or photo format.`,
        customClass: {
          title: "my-swal-title",
        },
      });
    }
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto my-12">
      <h3 className="text-2xl">Submit Company</h3>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <fieldset className="fieldset grid grid-cols-1 gap-5">
            <div>
              <label className="label text-[15px] text-black mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="input w-full outline-0 text-[#947474]"
                placeholder="Company Full Name"
                name="name"
                onChange={handleChanging}
                required
              />
            </div>
            <div>
              <label className="label text-[15px] text-black mb-2">
                Slogen
              </label>
              <input
                type="text"
                className="input w-full outline-0 text-[#947474]"
                placeholder="Slogan"
                name="slogan"
                onChange={handleChanging}
                required
              />
            </div>
            <fieldset className="fieldset">
              <label className="label text-[15px] text-black mb-2">
                Company Logo
              </label>
              <input
                type="file"
                onChange={handleChanging}
                required
                className="file-input w-full"
                name="logo"
              />

              <label className="label">Max size 2MB</label>
            </fieldset>

            {/* Social */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Comapny Website
                </label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Comapny Website"
                  name="website"
                  onChange={handleChanging}
                  required
                />
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Email"
                  name="email"
                  onChange={handleChanging}
                  required
                />
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Phone <span className="text-[#888888]">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Twitter <span className="text-[#888888]">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Twitter"
                  name="twitter"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Facebook <span className="text-[#888888]">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Facebook"
                  name="facebook"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#947474]"
                  placeholder="Location"
                  name="location"
                  onChange={handleChanging}
                  required
                />
              </div>

              <div>
                <label className="label text-[15px] text-black mb-2">
                  Company Size
                </label>
                <select
                  defaultValue="-"
                  className="select select-neutral w-full text-[#947474] outline-0 border-[#e0e0e0]"
                  name="size"
                  onChange={handleChanging}
                  required
                >
                  <option>-</option>
                  <option>1-10</option>
                  <option>20-35</option>
                  <option>50+</option>
                </select>
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Average Salary
                </label>
                <select
                  className="select select-neutral w-full text-[#947474] outline-0 border-[#e0e0e0]"
                  name="avarageSalary"
                  onChange={handleChanging}
                  required
                >
                  <option>-</option>
                  <option>50K+</option>
                  <option>20K-35K</option>
                  <option>10K+</option>
                </select>
              </div>
              <div>
                <label className="label text-[15px] text-black mb-2">
                  Insutry
                </label>
                <select
                  className="select select-neutral w-full text-[#947474] outline-0 border-[#e0e0e0]"
                  name="industry"
                  onChange={handleChanging}
                  required
                >
                  <option>-</option>
                  <option>Technology</option>
                  <option>Construction</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label text-[15px] text-black mb-2">About</label>
              <textarea
                rows={10}
                name="about"
                className="textarea w-full outline-none text-[#947474]"
                placeholder="About"
                onChange={handleChanging}
                required
              />
            </div>
            <fieldset className="fieldset">
              <label className="label text-[15px] text-black mb-2">
                Header Image
              </label>
              <input
                type="file"
                className="file-input w-full text-[#555555]"
                name="headerImage"
                onChange={handleChanging}
                required
              />
              <label className="label">Max size 2MB</label>
            </fieldset>
            <button className="mt-4 bg-[#26ae61] hover:bg-black py-3 text-white font-bold text-[15px] cursor-pointer border-none duration-700 w-fit px-5 rounded-lg">
              Submit Company
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;

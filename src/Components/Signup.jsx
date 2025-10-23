import { useState } from "react";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    ratePerHour: "",
    bid: [],
    company: [],
    skills: [],
    photo: "",
    about: "",
    designation: "",
  });

  const handleChanging = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setUserInfo({ ...userInfo, photo: files[0] });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const profile = new FormData();
    profile.append("image", userInfo.photo);

    // IMGBB api key
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    try {
      const resImg = await fetch(uploadUrl, {
        method: "POST",
        body: profile,
      });
      const data = await resImg.json();
      if (data.success) {
        const profileIMGBB = data.data.url;
        console.log(profileIMGBB);
      }
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto flex items-center min-h-screen border-2 border-black">
      <div className="card bg-base-100 shrink-0 shadow-2xl mx-auto my-12 ">
        <div className="card-body">
          <form onSubmit={handleSignIn} className=" grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="label mb-2 text-black">Full Name</label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#777]"
                  placeholder="Full Name"
                  name="name"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Designation</label>
                <input
                  type="text"
                  className="input w-full outline-0 text-[#777]"
                  placeholder="Designation"
                  name="designation"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Rate Per Hour</label>
                <input
                  type="number"
                  className="input w-full outline-0 text-[#777]"
                  placeholder="Rate Per Hour"
                  name="ratePerHour"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Email</label>
                <input
                  type="email"
                  className="input w-full outline-0 text-[#777]"
                  placeholder="Email"
                  name="email"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Password</label>
                <input
                  type="password"
                  className="input w-full outline-0 text-[#777]"
                  placeholder="Password"
                  name="password"
                  onChange={handleChanging}
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Profile</label>
                <input
                  type="file"
                  className="file-input w-full text-[#777]"
                  name="photo"
                  onChange={handleChanging}
                />
              </div>
            </div>
            <div>
              <label className="label mb-2 text-black">About Me</label>
              <textarea
                className="textarea h-24 w-full outline-0 text-[#777]"
                placeholder="Bio"
                name="about"
                onChange={handleChanging}
              ></textarea>
            </div>
            <button className="btn btn-neutral mt-4">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

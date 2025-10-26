import { updateProfile } from "firebase/auth";
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
import { auth } from "../firebase/firebase.init";

const Signup = () => {
  const { creatingUser, setUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state || "/";
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    ratePerHour: "",
    tasks: [],
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

    // showing sweet alert
    // showing sweet alert
    Swal.fire({
      title: "Creating Your Account. Please Wait!",
      allowOutsideClick: false,
      customClass: {
        title: "my-swal-title",
      },
      didOpen: () => {
        Swal.showLoading();
      },
    });

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

        // creating user by google
        creatingUser(userInfo.email, userInfo.password)
          .then((result) => {
            // updation user information
            updateProfile(auth.currentUser, {
              displayName: userInfo.name,
              photoURL: profileIMGBB,
            })
              .then(() => {
                // get creation time
                const getTime = result?.user?.metadata?.creationTime;
                // change to bd formate
                const date = new Date(getTime);
                const bdTime = date.toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                });

                const finalUserInformation = {
                  name: userInfo.name,
                  email: userInfo.email,
                  password: userInfo.password,
                  ratePerHour: userInfo.ratePerHour,
                  tasks: userInfo.tasks,
                  company: userInfo.company,
                  skills: userInfo.skills,
                  photo: profileIMGBB,
                  about: userInfo.about,
                  designation: userInfo.designation,
                  creationTime: bdTime,
                };
                // sending user information to the server
                fetch("https://workscout-server.onrender.com/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(finalUserInformation),
                })
                  .then((res) => res.json())
                  .then((result) => {
                    if (result.insertedId) {
                      Swal.close();
                      //setUser
                      setUser({
                        _id: result.insertedId,
                        ...finalUserInformation,
                      });
                      Swal.fire({
                        title: "Your Account Created!",
                        icon: "success",
                        draggable: true,
                        customClass: {
                          title: "my-swal-title",
                        },
                      });

                      // reset form
                      e.target.reset();

                      // redirect user
                      navigate(path);
                    }
                  });
              })
              .catch((error) => {
                Swal.close();

                if (error.code === "auth/email-already-in-use") {
                  Swal.close();
                  Swal.fire({
                    icon: "error",
                    title: `Your Email Already In Use!.`,
                    customClass: {
                      title: "my-swal-title",
                    },
                  });
                }
              });
          })
          .catch((error) => {
            console.log(error.code);
            Swal.close();
            if (error.code === "auth/email-already-in-use") {
              Swal.fire({
                icon: "error",
                title: `Your Email Already In Use!.`,
                customClass: {
                  title: "my-swal-title",
                },
              });
            } else if (
              error.code === "auth/password-does-not-meet-requirements"
            ) {
              Swal.fire({
                icon: "error",
                title: `Password must include uppercase, lowercase, number, and symbol.`,
                customClass: {
                  title: "my-swal-title",
                },
              });
            } else {
              Swal.fire({
                icon: "error",
                title: `${error.code}`,
                customClass: {
                  title: "my-swal-title",
                },
              });
            }
          });
      }
    } catch (error) {
      console.log(error.code);
      Swal.fire({
        title: "Please Change The Photo Formate",
        icon: "error",
      });
      Swal.close();
    } finally {
      Swal.close();
    }
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto flex items-center min-h-screen">
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div>
                <label className="label mb-2 text-black">Profile</label>
                <input
                  type="file"
                  className="file-input w-full text-[#777]"
                  name="photo"
                  onChange={handleChanging}
                  required
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
                required
              ></textarea>
            </div>
            <button className="bg-[#26ae61] w-full py-2 rounded-lg font-medium text-white border-[#26ae61] border-2 hover:bg-white hover:text-[#26ae61] duration-500 text-[16px] cursor-pointer">
              Sign Up
            </button>
            <p className="text-center">
              Have an account?
              <Link className="text-blue-700 font-medium ml-2" to={`/signin`}>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

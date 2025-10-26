import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContex";
const SignIn = () => {
  const { signInUser, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.state || "/";
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((result) => {
        if (result.user.email) {
          // load data from server
          fetch(`https://workscout-server.onrender.com/user/${email}`)
            .then((res) => res.json())
            .then((data) => {
              if (data._id) {
                setUser(data);
                Swal.fire({
                  title: "Successfully Login!",
                  icon: "success",
                  draggable: true,
                  customClass: {
                    title: "my-swal-title",
                  },
                });

                // reset form
                e.target.reset();
                navigate(path);
              }
            })
            .catch((err) => {
              if (err.code) {
                Swal.fire({
                  icon: "error",
                  title: "Provide Correct Information!",
                  customClass: {
                    title: "my-swal-title",
                  },
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          Swal.fire({
            icon: "error",
            title: "Provide Correct Information!",
            customClass: {
              title: "my-swal-title",
            },
          });
        } else if (err.code === "auth/too-many-requests") {
          Swal.fire({
            icon: "error",
            title: "Too Many Request!",
            customClass: {
              title: "my-swal-title",
            },
          });
        }
      });
  };
  return (
    <div className="w-[90%] lg:w-[77%] mx-auto min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label text-black text-[15px] mb-1">Email</label>
            <input
              type="email"
              className="input outline-0 text-[#777] mb-3"
              placeholder="Email"
              name="email"
              required
            />
            <label className="label text-black text-[15px] mb-1">
              Password
            </label>
            <input
              type="password"
              className="input outline-0 text-[#777] mb-3"
              placeholder="Password"
              name="password"
              required
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="bg-[#26ae61] w-full py-1 mt-3 rounded-lg font-medium text-white border-[#26ae61] border-2 hover:bg-white hover:text-[#26ae61] duration-500 text-[16px] cursor-pointer">
              Sign In
            </button>
            <p className="text-center mt-1">
              Don't have an accoutn?{" "}
              <Link
                state={path}
                className="text-blue-700 font-medium ml-2"
                to={`/signup`}
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

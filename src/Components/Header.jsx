import { use, useEffect, useState } from "react";
import { FaUnlock } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContex";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = use(AuthContext);
  console.log(user);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  // links
  const links = (
    <>
      <Link className="font-medium text-[15px]" to={"/"}>
        Home
      </Link>
      <Link className="font-medium text-[15px]" to={"/addcompany"}>
        Add Company
      </Link>
      <Link className="font-medium text-[15px]" to={"/mycompanies"}>
        My Company
      </Link>
    </>
  );
  return (
    <div
      className={`${
        scrolled
          ? "bg-white"
          : "bg-[#195a22] border-b-[1px] border-b-[#477b4e] text-white"
      } sticky  top-0 z-30 py-2`}
    >
      <div className="navbar w-[90%] lg:w-[77%] mx-auto lg:gap-3 lg:py-0 lg:min-h-0">
        <div className="navbar-start lg:w-fit">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
            >
              {links}
            </ul>
          </div>

          <a>
            <img
              className="w-[200px] px-2"
              src={`${
                scrolled
                  ? "https://workscout.in/wp-content/uploads/2023/11/logo.png"
                  : "https://workscout.in/wp-content/uploads/2023/11/logo2.png"
              }`}
              alt=""
            />
          </a>
        </div>
        <div
          className={`navbar-center hidden lg:flex  flex-1 justify-start py-4 pl-4 border-r-[1px]  border-l-[1px] gap-3 ${
            scrolled
              ? "border-l-[#d9d9d9] border-r-[#d9d9d9] "
              : " border-l-[#477b4e]  border-r-[#477b4e]"
          }`}
        >
          {links}
        </div>
        <div className="navbar-end lg:w-fit">
          {user ? (
            <div className="lg:flex lg:items-center lg:gap-2">
              <Link to={`/profile`} className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={user?.photo} />
                </div>
              </Link>
              <h3 className="hidden lg:block">
                {" "}
                <span className="font-bold">Hi,</span> {user?.name}
              </h3>
            </div>
          ) : (
            <>
              <Link
                className="flex items-center gap-1 ml-2 hover:text-green-400 duration-700 "
                to={`/signin`}
              >
                {" "}
                <FaUnlock />
                Sign In
              </Link>
              <div className="hidden lg:block ">
                <Link
                  className="flex items-center gap-1 ml-2  hover:text-green-400 duration-700"
                  to={`/signup`}
                >
                  {" "}
                  <IoAddCircle />
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

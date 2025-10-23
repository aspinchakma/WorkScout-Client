import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
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
  return (
    <div
      className={`${
        scrolled
          ? "bg-white"
          : "bg-[#195a22] border-b-[1px] border-b-[#477b4e] text-white"
      } sticky  top-0 z-30`}
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
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
          className={`navbar-center hidden lg:flex  flex-1 justify-start py-4 pl-2 border-r-[1px]  border-l-[1px] ${
            scrolled
              ? "border-l-[#d9d9d9] border-r-[#d9d9d9] "
              : " border-l-[#477b4e]  border-r-[#477b4e]"
          }`}
        >
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end lg:w-fit">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Header;

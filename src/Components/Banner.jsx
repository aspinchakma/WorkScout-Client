import { FaSearch, FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import BannerImg from "../assets/bannerCover.svg";
import CountryImg from "../assets/de.svg";
import "./Banner.css";
const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url("${BannerImg}")`,
        backgroundSize: "cover",
      }}
    >
      <div className="w-[90%] lg:w-[77%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 py-20">
        <div className="text-white">
          <h1 className="text-4xl font-medium">Make Bright Ideas Happen</h1>
          <p className="text-2xl text-[#9ebba2] mt-2">
            Collaborate with top experts affordably!
          </p>
          <p className="text-[14px] bg-[#296832]  w-fit py-2 px-3 rounded-[4px] mt-6 mb-4">
            Who are you looking for?
          </p>
          <div className="flex items-center bg-white px-3 py-2 rounded-lg justify-between">
            <input
              className="bg-white text-[#808080] flex-1 outline-0"
              type="text"
              placeholder="Skill, Industry"
            />
            <button className="bg-[#26ae61] text-white px-4 py-3 rounded-lg flex items-center gap-5 search-button">
              <span className="search-text">Search</span>
              <FaSearch className="search-icon" />
            </button>
          </div>
          <div className="mt-5">
            <h3 className="mb-3">Or browse featured categories:</h3>
            <div className="flex gap-3 lg:items-center flex-col lg:flex-row">
              <p className="bg-[#296832] text-[14px] px-3 py-2 rounded-[4px] cursor-pointer hover:bg-white hover:text-black duration-700">
                Web Development
              </p>
              <p className="bg-[#296832] text-[14px] px-3 py-2 rounded-[4px] cursor-pointer hover:bg-white hover:text-black duration-700">
                Marketing
              </p>
              <p className="bg-[#296832] text-[14px] px-3 py-2 rounded-[4px] cursor-pointer hover:bg-white hover:text-black duration-700">
                Mobile Apps
              </p>
              <p className="bg-[#296832] text-[14px] px-3 py-2 rounded-[4px] cursor-pointer hover:bg-white hover:text-black duration-700">
                Copywriting
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
          <div className="bg-white p-2 rounded-lg duration-700 cursor-pointer hover:translate-y-[-10px]">
            <img
              src="https://i.ibb.co.com/ZRghPXD6/man-office-scaled-e1700653116534-590x590.webp"
              alt=""
            />
            <div className="text-center mt-5">
              <div className="flex items-center gap-2 justify-center">
                <h3 className="font-semibold text-[20px] ">Aspin Chakma</h3>

                <a className="my-anchor-element">
                  <img
                    src={CountryImg}
                    className="w-[20px] h-[15px] object-cover my-anchor-element"
                    alt="freelance photos"
                  />
                </a>
                <Tooltip anchorSelect=".my-anchor-element" place="top">
                  Germany
                </Tooltip>
              </div>
              <p className="text-[#888]">UX/UI Graphic Designer</p>
              <div className="flex items-center gap-2 justify-center mt-2 mb-4">
                <p>
                  <span className="inline-block bg-[#febe42] px-2 py-[2px] rounded-[4px] font-bold text-white">
                    3.9
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#dddddd] text-[20px]" />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg translate-y-[-20px] hover:translate-y-[-30px] duration-700 lg:block hidden">
            <img
              src="https://i.ibb.co.com/LD0HDTgF/4002892-e1700652027624.webp"
              alt="freelance photos"
            />
            <div className="text-center mt-5">
              <div className="flex items-center gap-2 justify-center">
                <h3 className="font-semibold text-[20px] ">Aspin Chakma</h3>

                <a className="my-anchor-element">
                  <img
                    src={CountryImg}
                    className="w-[20px] h-[15px] object-cover my-anchor-element"
                    alt=""
                  />
                </a>
                <Tooltip anchorSelect=".my-anchor-element" place="top">
                  Germany
                </Tooltip>
              </div>
              <p className="text-[#888]">UX/UI Graphic Designer</p>
              <div className="flex items-center gap-2 justify-center mt-2 mb-4">
                <p>
                  <span className="inline-block bg-[#febe42] px-2 py-[2px] rounded-[4px] font-bold text-white">
                    3.9
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#febe42] text-[20px]" />
                  <FaStar className="text-[#dddddd] text-[20px]" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

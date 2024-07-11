//react icons
import { FaLayerGroup } from "react-icons/fa6";
import { LiaCalendarPlusSolid } from "react-icons/lia";
import { SlBasket } from "react-icons/sl";

//rrd imports
import { Link } from "react-router-dom";

//components
import {
  Weather,
  ThemeToggle,
  Profile,
} from "../components"

function Navbar() {
  return (
    <div className="shadow-md">
      <div className="max-container container w-[100%] dark:bg-red-700">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="0"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Weather />
                </li>
                <li>
                  <a>Sahifalar</a>
                  <ul className="p-2">
                    <li>
                      <Link to="/">Bosh sahifa</Link>
                    </li>
                    <li>
                      <Link to="/chart">Statistika</Link>
                    </li>
                    <li>
                      <Link to="/look">Tanlangan retseptlar</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/create">Retsept Yaratish</Link>
                </li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl m-0">
              <span>MYKITCHEN</span>
            </Link>
          </div>
          <div className="lg:hidden w-full relative left-[20%] hidden sm:flex md:flex">
            <Link to="/create" className="flex items-center gap-[8px]">
              <LiaCalendarPlusSolid />
              <p className="font-[700]">Retsept Yaratish</p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex ">
            <ul className="menu menu-horizontal px-1 flex gap-[70px] items-center">
              <li>
                <Weather />
              </li>

              <div className="dropdown dropdown-hover">
                <div tabIndex={0} className="" role="button">
                  <div className="font-[700] flex gap-[10px] items-center ">
                    <FaLayerGroup />
                    <p>Sahifalar</p>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content rounded-box z-[1]  max-w-[450px] w-[400px] relative right-[-180px] bg-base-100"
                >
                  <div className="mr-[]"> </div>
                  <div className=" mt-[30px] border-[1px] rounded-[8px] px-[20px] py-[10px]">
                    <li>
                      <Link to="/" className="flex flex-col items-start">
                        <h4 className="font-[700] ">Bosh sahifa</h4>
                        <p>
                          <span className="font-[600]">"MyKitchen"</span>{" "}
                          saytidagi barcha retseptlar
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/chart" className="flex flex-col items-start">
                        <h4 className="font-[700]">Statistika</h4>
                        <p className="font-[400]">
                          Taomlar va retseptlar statistikasi
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/look" className="flex flex-col items-start">
                        <h4 className="font-[700]">Tanlangan retseptlar</h4>
                        <p className="font-[400]">Siz tanlagan retseptlar</p>
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>

              <li>
                <Link to="/create">
                  <LiaCalendarPlusSolid />
                  <p className="font-[700]">Retsept Yaratish</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end flex gap-4">
            <SlBasket className="text-[24px] font-bold" />

            <Profile />
          </div>
        </div>
      </div>
      <hr className="h-[1.1px] bg-[#000]" />
    </div>
  );
}

export default Navbar;

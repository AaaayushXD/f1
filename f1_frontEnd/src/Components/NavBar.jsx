import React, { useState } from "react";
import F1LOGO from "../assets/F1-Logo.png";
import { CircleUser, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const currentUser = useAuth();

  const user = currentUser.currentUser?.email.split("@")[0];
  const changeMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <nav className="w-[100%] h-[80px] bg-white p-2">
      {/* Desktop */}
      <div className="hidden lg:flex w-[100%] h-[100%] px-4 text-[red] items-center justify-between">
        {/* Logo */}
        <img src={F1LOGO} alt="f1 logo" className="h-full" />
        {/* Menu */}
        <div>
          <ul className="flex items-center justify-center gap-5 text-2xl">
            <Link to={"/"}>
              <li className="">Home</li>
            </Link>
            <Link to={"/drivers"}>
              <li className="">Drivers</li>
            </Link>
            <Link to={"/teams"}>
              <li className="">Teams</li>
            </Link>
            <Link to={"/schedules"}>
              <li className="">Schedules</li>
            </Link>
            <Link to={"/circuits"}>
              <li className="">Circuits</li>
            </Link>
          </ul>
        </div>
        {/* Account */}
        <div>
          <CircleUser color="red" size={50} />
        </div>
      </div>

      {/* Mobile */}

      <div className="w-[100%] h-[100%] bg-black  px-4 relative lg:hidden">
        {/* Logo */}
        <div className="flex items-center justify-between w-full h-full ">
          <img src={F1LOGO} alt="f1 logo" className="h-full" />
          {/* Menu */}
          <div
            onClick={changeMenu}
            className="cursor-pointer focus:select-none focus:outline-none"
          >
            {menu ? (
              <X color="red" size={50} />
            ) : (
              <Menu color="red" size={50} />
            )}
          </div>
        </div>
        {menu && (
          <div
            className="bg-[#111111d8] absolute top-[80px] left-0 z-10 w-full activate"
            style={{ zIndex: 10 }}
          >
            <ul className="">
              <Link to={"/"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Home
                </li>
              </Link>
              <Link to={"/drivers"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Drivers
                </li>
              </Link>
              <Link to={"/teams"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Teams
                </li>
              </Link>
              <Link to={"/schedules"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Schedules
                </li>
              </Link>
              <Link to={"/circuits"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Circuits
                </li>
              </Link>

              <select className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none w-full">
                <option defaultChecked value={"Results"}>
                  Results
                </option>
                <option
                  className="bg-[#2f2f30d0] focus:outline-none"
                  value={"Drivers Standing"}
                >
                  <Link to={"/results/drivers"}>Drivers Standing</Link>
                </option>
                <option
                  className=" bg-[#2f2f30d0] focus:outline-none"
                  value={"Constructor Standing"}
                >
                  <Link to={"/results/teams"}>Constructor Standing</Link>
                </option>
              </select>
              <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none flex  items-center gap-5">
                <CircleUser color="red" size={40} />
                <Link to={"/profile"}>
                  {user?.charAt(0).toUpperCase() + user?.slice(1) ||
                    "User Not Found"}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useEffect, useState } from "react";
import F1LOGO from "../assets/F1-Logo.png";
import { CircleUser, LogOut, Menu, Moon, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLoading,
  deactivateLoading,
  selectLoading,
} from "../reducers/LoadingSlice";

const NavBar = () => {
  //* state
  const [menu, setMenu] = useState(false);
  const [userIcon, setUserIcon] = useState(false);
  const loading = useSelector(selectLoading);

  //*
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* current User and Logout function
  const { logOut, currentUser } = useAuth();

  //* get userName
  const user = currentUser && currentUser.currentUser?.email.split("@")[0];

  const changeMenu = () => {
    setMenu((prev) => !prev);
  };

  const showUserMenu = () => {
    setUserIcon((prev) => !prev);
  };

  const userLogOut = async () => {
    await logOut();
    navigate("/login");
  };
  return (
    <nav className="w-[100%] h-[80px] p-2">
      {/* Desktop */}
      <div className="hidden lg:flex w-[100%] h-[100%] px-4 items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="h-[80px]">
          <img
            src={F1LOGO}
            alt="f1 logo"
            className="h-full cursor-pointer min-w-[80px]"
          />
        </Link>
        {/* Menu */}
        <div>
          <ul className="flex items-center justify-center text-2xl">
            <Link to={"/"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Home
              </li>
            </Link>
            <Link to={"/drivers"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Drivers
              </li>
            </Link>
            <Link to={"/teams"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Teams
              </li>
            </Link>
            <Link to={"/schedules"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Schedules
              </li>
            </Link>
            <Link to={"/circuits"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Circuits
              </li>
            </Link>
            <Link to={"/results"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Results
              </li>
            </Link>
          </ul>
        </div>
        {/* Account */}
        <div className="relative cursor-pointer" onClick={showUserMenu}>
          <CircleUser size={50} className="text-red-600 hover:text-red-800" />
          {userIcon && (
            <div
              className="bg-[#d1d1d1] w-[200px] absolute top-[60px] right-0 h-[190px] rounded-lg "
              style={{ zIndex: 50 }}
            >
              <ul className="flex flex-col w-full h-full">
                <Link
                  to={"/profile"}
                  className="flex w-[100%] py-3 px-4 border-b-2 border-b-[#3e3e3e] text-[#3e3e3e] gap-4 items-center hover:bg-[#3e3e3e8f] hover:text-[#cecaca]"
                >
                  <UserRound size={35} />
                  <li className="text-2xl ">Profile</li>
                </Link>
                <div className="flex w-[100%] py-3 px-4 border-b-2 border-b-[#3e3e3e] text-[#3e3e3e] gap-4 items-center hover:bg-[#3e3e3e8f] hover:text-[#cecaca]">
                  <Moon size={35} />
                  <li className="text-xl ">Dark</li>
                </div>
                <div
                  className="flex w-[100%] py-3 px-4  text-[#3e3e3e] gap-4 items-center hover:bg-[#3e3e3e8f] hover:text-[#cecaca]"
                  onClick={userLogOut}
                >
                  <LogOut size={35} />
                  <li className="text-2xl ">Log Out</li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}

      <div className="w-[100%] h-[100%]  px-4 relative lg:hidden">
        {/* Logo */}
        <div className="flex items-center justify-between w-full h-full ">
          <Link className="w-full h-[80px]" to={"/"}>
            <img src={F1LOGO} alt="f1 logo" className="h-full" />
          </Link>
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

              <Link to={"/results"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Results
                </li>
              </Link>
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

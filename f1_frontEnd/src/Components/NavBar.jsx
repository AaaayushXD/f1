import React, { useState } from "react";
import F1LOGO from "../assets/F1-Logo.png";
import {
  CalendarClock,
  CarFront,
  CircleUser,
  Crown,
  Home,
  LogOut,
  Moon,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, userRemoved } from "../reducers/UserSlice";

const NavBar = () => {
  //* state
  const [userIcon, setUserIcon] = useState(false);
  const users = useSelector(selectAllUsers);
  //*
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //* current User and Logout function
  const { logOut } = useAuth();

  //* get userName
  const user =
    users[0]?.user.displayName ||
    users[0]?.user.email[0].toUpperCase() +
      users[0]?.user.email.split("@")[0].slice(1);

  const showUserMenu = () => {
    setUserIcon((prev) => !prev);
  };

  const userLogOut = async () => {
    dispatch(userRemoved());
    await logOut();
    navigate("/login");
  };
  return (
    <nav className="w-[100%] h-[80px] p-2">
      {/* Desktop */}
      <div className="hidden lg:flex w-[100%] h-[100%] px-4 items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="h-[80px] cursor-pointer">
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
            <Link to={"/results/1"}>
              <li className="hover:bg-[#b41111] h-[80px] flex items-center w-[150px] justify-center font-extrabold">
                Results
              </li>
            </Link>
          </ul>
        </div>
        {/* Account */}
        <div className="relative cursor-pointer" onClick={showUserMenu}>
          {users[0]?.user.photoURL ? (
            <Link to={"/profile"}>
              <img
                src={users[0]?.user.photoURL}
                alt={users[0]?.user.displayName}
                loading="lazy"
                className="w-[60px] h-[60px] rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <Link to={"/profile"}>
              <CircleUser color="red" size={60} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile */}

      <div className="w-[100%] h-[100%]   relative lg:hidden">
        {/* Logo */}
        <div className="flex items-center justify-between w-full h-full px-4">
          <Link className="w-full h-[80px]" to={"/"}>
            <img src={F1LOGO} alt="f1 logo" className="h-full" />
          </Link>
          {/* Menu */}
          {users[0]?.user.photoURL ? (
            <Link to={"/profile"} className="cursor-pointer">
              <img
                src={users[0]?.user.photoURL}
                alt={users[0]?.user.displayName}
                loading="lazy"
                className="w-[60px] h-[60px] rounded-full cursor-pointer"
              />
            </Link>
          ) : (
            <Link to={"/profile"} className="text-red-500 hover:text-red-600">
              <CircleUser size={60} />
            </Link>
          )}
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
};

export default NavBar;
// users[0]?.user.photoURL;

export const MobileMenu = () => {
  return (
    <>
      <div
        className="flex items-center w-full max-w-[1200px] h-full justify-evenly bg-[#1a1919] bottom-0 fixed max-h-[80px] rounded-t-xl overflow-hidden z-10 translate-x-[-8px] "
        id="mobile_nav"
      >
        <div className="relative p-3 md:w-full md:items-center md:flex md:justify-center md:gap-10  rounded-2xl hover:border-[#fa8b9a] hover:text-red-500 hover:shadow-md hover:shadow-[#ff697d] font-bold hover:scale-110 transition-all cursor-pointer duration-500">
          <Link
            to={"/"}
            className="flex items-center justify-center w-full h-full"
          >
            <Home size={30} />
          </Link>
        </div>
        <div className="relative p-3 md:w-full md:items-center md:flex md:justify-center md:gap-10  rounded-2xl hover:border-[#ff697d] hover:text-red-500 hover:shadow-md hover:shadow-[#ff697d] font-bold hover:scale-110 transition-all cursor-pointer duration-500">
          <Link
            to={"/drivers"}
            className="flex items-center justify-center w-full h-full"
          >
            <Users size={30} />
          </Link>
        </div>
        <div className="relative p-3 md:w-full md:items-center md:flex md:justify-center md:gap-10  rounded-2xl hover:border-[#ff697d] hover:text-red-500 hover:shadow-md hover:shadow-[#ff697d] font-bold hover:scale-110 transition-all cursor-pointer duration-500">
          <Link
            to={"/teams"}
            className="flex items-center justify-center w-full h-full"
          >
            <CarFront size={30} />
          </Link>
        </div>
        <div className="relative p-3 md:w-full md:items-center md:flex md:justify-center md:gap-10  rounded-2xl hover:border-[#ff697d] hover:text-red-500 hover:shadow-md hover:shadow-[#ff697d] font-bold hover:scale-110 transition-all cursor-pointer duration-500">
          <Link
            to={"/schedules "}
            className="flex items-center justify-center w-full h-full"
          >
            <CalendarClock size={30} />
          </Link>
        </div>
        <div className="relative p-3 md:w-full md:items-center md:flex md:justify-center md:gap-10 rounded-2xl hover:border-[#ff697d] hover:text-red-500 hover:shadow-md hover:shadow-[#ff697d] font-bold hover:scale-105 transition-all cursor-pointer duration-500">
          <Link
            to={"/results/1 "}
            className="flex items-center justify-center w-full h-full"
          >
            <Crown size={30} />
          </Link>
        </div>
      </div>
    </>
  );
};

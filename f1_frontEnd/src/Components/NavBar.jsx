import React, { useState } from "react";
import F1LOGO from "../assets/F1-Logo.png";
import { CircleUser, LogOut, Menu, Moon, UserRound, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, userRemoved } from "../reducers/UserSlice";

const NavBar = () => {
  //* state
  const [menu, setMenu] = useState(false);
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

  const changeMenu = () => {
    setMenu((prev) => !prev);
  };

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
            <div>
              <img
                src={users[0]?.user.photoURL}
                alt={users[0]?.user.displayName}
                loading="lazy"
                className="w-[60px] h-[60px] rounded-full cursor-pointer"
              />
            </div>
          ) : (
            <CircleUser color="red" size={60} />
          )}
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

              <Link to={"/results/1"}>
                <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none">
                  Results
                </li>
              </Link>
              <li className="p-3 text-2xl border-b bg-[#2f2f30d0] rounded-lg cursor-pointer hover:bg-[#11111111] hover:text-[#ff697d] focus:outline-none flex  items-center gap-5">
                {users[0]?.user.photoURL ? (
                  <div>
                    <img
                      src={users[0]?.user.photoURL}
                      alt={users[0]?.user.displayName}
                      loading="lazy"
                      className="w-[40px] h-[40px] rounded-full cursor-pointer"
                    />
                  </div>
                ) : (
                  <CircleUser color="red" size={40} />
                )}

                <Link to={"/profile"}>{user || "User Not Found"}</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

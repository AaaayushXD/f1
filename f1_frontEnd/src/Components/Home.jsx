import React from "react";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import CarouselImages from "./Carousel";
import BGIMG from "../assets/bgImages/black.jpeg";
import NavBar from "./NavBar";

const Home = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div
      className="text-white w-[100vw] min-h-[100vh] overflow-hidden"
      style={{ backgroundImage: `url(${BGIMG})` }}
    >
      <div className="w-[100%] h-[80px]">
        <NavBar />
        <div className="border-2 border-red-600"></div>
      </div>

      <main>
        <div className="w-full h-full">
          <CarouselImages />
        </div>
      </main>
      <button type="button" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import CarouselImages from "./Carousel";
import BGIMG from "../assets/bgImages/black.jpeg";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  activateLoading,
  deactivateLoading,
  selectLoading,
} from "../reducers/LoadingSlice.jsx";
import { PacManLoader } from "../loading/LoadingComponent";
import About from "./About";
import Footer from "./Footer.jsx";
import News from "./News.jsx";
import { PodiumWinners } from "./Drivers.jsx";
import { Link } from "react-router-dom";
import TEAMIMG from "../assets/bgImages/allTeam.jpg";

const Home = () => {
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="text-white w-[100vw] min-h-[100vh] overflow-hidden relative"
        style={{ backgroundImage: `url(${BGIMG})` }}
      >
        <div className="w-[100%] h-[80px]">
          <NavBar />
        </div>

        <main className="flex flex-col w-full h-full gap-6">
          <div className="w-full h-full">
            <div className="border-2 border-red-600 "></div>
            <CarouselImages />
            <div className="border-2 border-red-600"></div>
          </div>
          <div className="grid w-full h-full gap-8 md:grid-cols-2">
            <div className="w-full h-full ">
              <About />
            </div>
            <div className="relative h-full mx-2">
              <img src={TEAMIMG} alt="all teams logo" />
              <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a3a] "></div>
            </div>
          </div>
          <div className="w-full h-full">
            <h1 className="mb-8 text-4xl text-center text-[#39b2ad]">
              Podim Winners
            </h1>
            <PodiumWinners />
          </div>
          <div className="w-full h-full mb-8 bg-[#38343473]">
            <h1 className="px-10 py-4 mb-6 text-3xl text-center text-red-600 sm:text-left sm:text-6xl">
              Latest F1 News
            </h1>
            <div className="flex items-center justify-center ">
              <div className="max-w-[1250px]">
                <News />
              </div>
            </div>
          </div>
        </main>
        <footer className="w-full h-full">
          <div className="mt-4 border-2 border-red-600"></div>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;

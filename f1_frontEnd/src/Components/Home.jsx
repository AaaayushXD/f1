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
            <div className="border-2 border-red-600"></div>
            <CarouselImages />
            <div className="border-2 border-red-600"></div>
          </div>
          <div className="w-full h-full md:max-w-[600px]">
            <About />
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
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
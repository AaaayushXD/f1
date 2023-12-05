import React from "react";
import { CarFront, Users } from "lucide-react";

const About = () => {
  return (
    <div className="w-full h-full bg-[#38343473] rounded-md text-[#d6d6d6] mb-6 md:mx-4 px-1">
      <div className="px-3 py-2">
        <h1 className="text-[40px] text-[#d43333] sm:text-6xl ">About</h1>
      </div>
      <div className="flex flex-col gap-3 p-2 text-lg sm:text-xl">
        <p className="px-2 ">
          Welcome to your ultimate destination for all things Formula 1! We are
          passionate about bringing you the most comprehensive and up-to-date
          information on the thrilling world of Formula 1 racing.
        </p>

        <p className="px-2">
          Whether you're a seasoned enthusiast or a newcomer to the world of
          motorsports, our website is your go-to hub for everything related to
          Formula 1.
        </p>
      </div>
    </div>
  );
};

export default About;

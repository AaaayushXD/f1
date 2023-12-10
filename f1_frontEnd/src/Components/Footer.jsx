import React from "react";
import F1 from "../assets/F1-Logo.png";
import LAMA from "../assets/aayushlogo.png";
import { Link } from "react-router-dom";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full h-full bg-[#3d3d3d]">
      {/* logo */}
      <div className="flex gap-5 px-4 py-3 mb-6 md:mb-3">
        <a href="https://portfoliosite-aayush.netlify.app/" target="_blank">
          <img src={LAMA} alt="aayush logo" className="h-[60px]" />
        </a>
        <div className="border border-[#5e5f5e]"></div>
        <Link to={"/"}>
          <img src={F1} alt="f1 logo" className="h-[60px]" />
        </Link>
      </div>
      <div className="border border-[#5a5a5a] m-2"></div>
      {/* links */}
      <div className="grid grid-cols-2 gap-8 max-w-screen sm:grid-cols-3 sm:gap-6">
        <div className="px-3 py-2">
          <h1 className="mb-6">RESOURCES</h1>
          <Link to={"/drivers"}>
            <p className="text-[#a3a3a3] mb-4 hover:underline px-1">Drivers</p>
          </Link>
          <Link to={"/teams"}>
            <p className="text-[#a3a3a3] mb-4 hover:underline px-1">Teams</p>
          </Link>
          <Link to={"/results/1"}>
            <p className="text-[#a3a3a3] mb-4 hover:underline px-1">Results</p>
          </Link>
          <Link to={"/circuits"}>
            <p className="text-[#a3a3a3] mb-4 hover:underline px-1">Circuits</p>
          </Link>
        </div>
        <div className="px-3 py-2">
          <h1 className="mb-6">FOLLOW US</h1>
          <a
            target="_blank"
            href="https://www.facebook.com/Aayush.914/"
            className="flex gap-2 text-[#a3a3a3] mb-4 hover:underline px-1 ]"
          >
            <Facebook />
            <p>Facebook</p>
          </a>
          <a
            href="https://www.linkedin.com/in/aayush15l/"
            target="_blank"
            className="flex gap-2 text-[#a3a3a3] mb-4 hover:underline px-1 ]"
          >
            <Linkedin />
            <p>LinkdeIn</p>
          </a>
          <a
            href="https://x.com/Aayush15l"
            target="_blank"
            className="flex gap-2 text-[#a3a3a3] mb-4 hover:underline px-1 ]"
          >
            <Twitter />
            <p>X</p>
          </a>
        </div>
        <div className="px-3 py-2">
          <h1 className="mb-6">LEGAL</h1>
          <Link to={"/privacy"}>
            <p className="flex gap-2 text-[#a3a3a3] mb-4 hover:underline px-1">
              Privacy Policy
            </p>
          </Link>
          <Link to={"/terms"}>
            <p className="flex gap-2 text-[#a3a3a3] mb-4 hover:underline px-1">
              Terms & Conditions
            </p>
          </Link>
        </div>
      </div>
      <div className="border border-[#5a5a5a] m-2"></div>

      {/* copyright */}
      <div className="flex flex-col justify-between gap-3 px-4 pb-[80px] md:pb-5 sm:flex-row">
        <div className="px-3 py-2">
          <p className="flex gap-1 text-[#a3a3a3]">
            © 2023{" "}
            <a
              href="https://portfoliosite-aayush.netlify.app/"
              target="_blank"
              className="hover:text-[#39b2ad] hover:underline"
            >
              Aayush.
            </a>
            All Rights Reserved
          </p>
        </div>
        <div className="flex gap-5 px-3 py-2 text-[#a3a3a3] items-center  mb-2">
          <a
            target="_blank"
            href="https://www.facebook.com/Aayush.914/"
            className="hover:text-[#fefefe]"
          >
            <Facebook />
          </a>
          <a
            href="https://www.linkedin.com/in/aayush15l/"
            target="_blank"
            className="hover:text-[#fefefe]"
          >
            <Linkedin />
          </a>
          <a
            href="https://x.com/Aayush15l"
            target="_blank"
            className="hover:text-[#fefefe]"
          >
            <Twitter />
          </a>
          <a
            href="https://github.com/AaaayushXD"
            target="_blank"
            className="hover:text-[#fefefe]"
          >
            <Github />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useState } from "react";
import GOOGLE from "../assets/social_icons/google.png";
import FACEBOOK from "../assets/social_icons/facebook.png";
import APPLE from "../assets/social_icons/apple.png";
import IMG from "../assets/bgImages/f1_img2.jpg";
import F1 from "../assets/f1_logo.png";
import SignInComponent from "./SignInComponent";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen gap-6 overflow-hidden text-2xl bg-fixed bg-top bg-no-repeat bg-cover "
      id="loginPage"
    >
      <div className="w-[90%] h-[600px] max-w-[80%] loginForm flex lg:h-[85%] lg:items-center">
        <div className="md:w-[40%] w-[100%]">
          {/* email and password */}
          <form>
            <div className="flex flex-col m-3 w-[full]">
              {/* Email */}
              <div className="flex flex-col email ">
                <label
                  htmlFor="email"
                  className="p-2 mt-2 text-lg text-[#ff697d]"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="px-3 py-2 mb-2 text-xl bg-transparent border-b rounded-md outline-none focus:outline-none"
                  autoComplete="off"
                  id="emailInput"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              {/* Password */}
              <div className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className="p-2 mt-2 text-lg text-[#ff697d]"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="px-3 py-2 mb-2 text-xl bg-transparent border-b rounded-md outline-none focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  maxLength={20}
                  required
                />
                <button
                  type="button"
                  className="absolute right-[30px] material-symbols-outlined top-[55%] cursor-pointer"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center justify-center w-full">
                <button
                  type="submit"
                  className="w-[60%] bg-transparent border border-[#ff697d] my-3 py-2 px-3 rounded-xl hover:bg-[#ff697d] focus:bg-[#ff697d] font-bold"
                >
                  Sign Up
                </button>
                <p>or</p>
              </div>
            </div>
          </form>
          {/* Google, Fb, Apple sign In button */}
          <div className="flex flex-col items-center justify-center gap-3 mx-2 translate-x-1 ">
            <div className="bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700 h-[40px]">
              <SignInComponent message="Sign Up with Google" image={GOOGLE} />
            </div>

            <div className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700">
              <SignInComponent
                message="Sign Up with Facebook"
                image={FACEBOOK}
              />
            </div>

            <div className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700">
              <SignInComponent
                message="Sign Up with Apple"
                image={APPLE}
                pad="2"
              />
            </div>
          </div>
        </div>
        {/* line */}
        <div className="hidden md:block md:h-[100%] md:border md:border-[#3e3e3e] md:mx-3 "></div>
        {/* Image */}
        <div className="hidden md:block md:w-[full] md:bg-cover md:h-[100%] md:p-4 md:relative">
          <img
            src={IMG}
            alt="f1"
            className="bg-cover h-[100%] rounded-md bg-blend-darken"
          />
          <div className="md:absolute md:top-0 md:left-0 md:bg-[#02020270] md:w-full md:h-[100%] md:rounded-lg md:flex md:justify-center md:items-center md:gap-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;

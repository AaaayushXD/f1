import React from "react";
import GOOGLE from "../assets/social_icons/google.png";
import FACEBOOK from "../assets/social_icons/facebook.png";
import APPLE from "../assets/social_icons/apple.png";
import SignInComponent, { LogInImage, SignUpForm } from "./SignInComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  activateLoading,
  deactivateLoading,
} from "../functions/LoadingSlice";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const navigate = useNavigate();

  const { signInWithGoogle } = useAuth();
  // *Google Sign In
  const googleSignIn = async () => {
    try {
      dispatch(activateLoading());
      await signInWithGoogle();
      navigate("/");
    } catch (e) {
      toast.error("Login Failed", toastStyle);
      console.log(e);
    }

    dispatch(deactivateLoading());
  };

  // TODO: Facebook Sign IN
  const facebookSignIn = () => {};

  // TODO: Apple Sign IN
  const appleSignIn = () => {};

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen gap-6 overflow-hidden text-2xl bg-fixed bg-top bg-no-repeat bg-cover "
      id="loginPage"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[90%] h-[600px] max-w-[80%] loginForm flex lg:h-[85%] lg:items-center">
        <div className="md:w-[40%] w-[100%]">
          {/* email and password */}
          <SignUpForm />
          {/* Google, Fb, Apple sign In button */}
          <div className="flex flex-col items-center justify-center gap-3 mx-2 translate-x-1 ">
            <div
              className="bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700 h-[40px]"
              onClick={googleSignIn}
            >
              <SignInComponent message="Sign Up with Google" image={GOOGLE} />
            </div>

            <div
              className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700"
              onClick={facebookSignIn}
            >
              <SignInComponent
                message="SignUp with Facebook"
                image={FACEBOOK}
              />
            </div>

            <div
              className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700"
              onClick={appleSignIn}
            >
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
        <LogInImage />
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GOOGLE from "../assets/social_icons/google.png";
import FACEBOOK from "../assets/social_icons/facebook.png";
import APPLE from "../assets/social_icons/apple.png";
import SignInComponent, { LogInForm, LogInImage } from "./SignInComponent";
import { ToastContainer, toast } from "react-toastify";
import {
  activateLoading,
  deactivateLoading,
  selectLoading,
} from "../functions/LoadingSlice.jsx";
import { useAuth } from "../firebase/Auth.jsx";
import { PacManLoader } from "../loading/LoadingComponent.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
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

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  // *Google Sign In
  const googleSignIn = async () => {
    try {
      dispatch(activateLoading());
      const user = await signInWithGoogle();
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

  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

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
          <LogInForm />
          {/* Google, Fb, Apple sign In button */}
          <div className="flex flex-col items-center justify-center gap-3 mx-2 translate-x-1 ">
            <div
              className="bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700 h-[40px]"
              onClick={googleSignIn}
            >
              <SignInComponent message="SignIn with Google" image={GOOGLE} />
            </div>

            <div
              className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700"
              onClick={facebookSignIn}
            >
              <SignInComponent
                message="SignIn with Facebook"
                image={FACEBOOK}
              />
            </div>

            <div
              className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700"
              onClick={appleSignIn}
            >
              <SignInComponent
                message="SignIn with Apple"
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
      {loading && <PacManLoader loading={true} />}
    </div>
  );
};

export default Login;

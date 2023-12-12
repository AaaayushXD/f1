import React, { useEffect, useState } from "react";
import GOOGLE from "../assets/social_icons/google.png";
import GITHUB from "../assets/social_icons/github.png";
import SignInComponent, { LogInImage, SignUpForm } from "./SignInComponent";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import { userAdded } from "../reducers/UserSlice";
import { PacManLoader } from "../loading/LoadingComponent";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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

  const { signInWithGoogle, signInWithGithub } = useAuth();
  // *Google Sign In
  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      dispatch(userAdded(user));
      navigate("/");
    } catch (e) {
      toast.error("Login Failed", toastStyle);
      console.log(e);
    }
  };

  //*: GIthub Sign IN
  const githubSignIn = async () => {
    try {
      const user = await signInWithGithub();
      dispatch(userAdded(user));
      navigate("/");
    } catch (e) {
      toast.error("Login Failed", toastStyle);
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden min-w-screen">
          <PacManLoader loading={loading} />
        </div>
      ) : (
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
                  <SignInComponent
                    message="Sign Up with Google"
                    image={GOOGLE}
                  />
                </div>

                <div
                  className="flex items-center justify-between bg-blue-600 rounded-full w-[250px] cursor-pointer hover:bg-blue-700"
                  onClick={githubSignIn}
                >
                  <SignInComponent
                    message="SignUp with GitHub"
                    image={GITHUB}
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
      )}
    </>
  );
};

export default Register;

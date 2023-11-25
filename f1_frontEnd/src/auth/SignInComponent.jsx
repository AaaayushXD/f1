import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  activateLoading,
  deactivateLoading,
} from "../functions/LoadingSlice";
import { useAuth } from "../firebase/Auth.jsx";
import { Pulse } from "../loading/LoadingComponent";
import { toast } from "react-toastify";
import IMG from "../assets/bgImages/f1_img2.jpg";
import { Link, useNavigate } from "react-router-dom";

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

const SignInComponent = (props) => {
  const loading = useSelector(selectLoading);

  return (
    <>
      <button
        disabled={loading}
        className="flex items-center justify-between w-[100%] h-[100%]"
      >
        <p className=" h-[100%] py-1 font-bold items-center justify-center flex w-[100%]  text-lg">
          {props.message}
        </p>
        <img
          src={props.image}
          className="h-[40px] bg-white mx-1 my-[2px] rounded-full"
          style={{ padding: `${props.pad}px` }}
        />
      </button>
    </>
  );
};
export default SignInComponent;

export const LogInForm = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(activateLoading());
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("Login Failed", toastStyle);
    }
    dispatch(deactivateLoading());
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col m-3 w-[full]">
        {/* Email */}
        <div className="flex flex-col email ">
          <label htmlFor="email" className="p-2 mt-2 text-lg text-[#ff697d]">
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
          <label htmlFor="password" className="p-2 mt-2 text-lg text-[#ff697d]">
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
          <Link to={"/forgot"} className="text-xs ">
            Forgot Password? <span className="text-[#ff697d]">Click Here</span>
          </Link>

          <button
            type="submit"
            className="w-[60%] h-[55px] bg-transparent border border-[#ff697d] my-3 py-2 px-3 rounded-xl hover:bg-[#ff697d] focus:bg-[#ff697d] font-bold"
          >
            {loading ? <Pulse /> : "LogIn"}
          </button>
          <Link to={"/register"} className="text-xs text-left">
            Don't have an Account?
          </Link>
          <p>or</p>
        </div>
      </div>
    </form>
  );
};

export const SignUpForm = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(activateLoading());
    try {
      await signUpWithEmail(email, password);
      navigate("/");
    } catch (e) {
      toast.error("Login Failed", toastStyle);

      console.log(e);
    }
    dispatch(deactivateLoading());
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col m-3 w-[full]">
        {/* Email */}
        <div className="flex flex-col email ">
          <label htmlFor="email" className="p-2 mt-2 text-lg text-[#ff697d]">
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
          <label htmlFor="password" className="p-2 mt-2 text-lg text-[#ff697d]">
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
            className="w-[60%] h-[55px] bg-transparent border border-[#ff697d] my-3 py-2 px-3 rounded-xl hover:bg-[#ff697d] focus:bg-[#ff697d] font-bold"
          >
            {loading ? <Pulse /> : "Sign Up"}
          </button>
          <Link className="text-xs" to={"/login"}>
            Already have an Account?
          </Link>

          <p>or</p>
        </div>
      </div>
    </form>
  );
};

export const LogInImage = () => {
  return (
    <div className="hidden md:block md:w-[full] md:bg-cover md:h-[100%] md:p-4 md:relative">
      <img
        src={IMG}
        alt="f1"
        className="bg-cover h-[100%] rounded-md bg-blend-darken"
      />
      <div className="md:absolute md:top-0 md:left-0 md:bg-[#02020270] md:w-full md:h-[100%] md:rounded-lg md:flex md:justify-center md:items-center md:gap-3"></div>
    </div>
  );
};

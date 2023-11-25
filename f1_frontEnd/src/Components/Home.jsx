import React from "react";
import { useAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="text-black">
      Home
      <button type="button" onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
};

export default Home;

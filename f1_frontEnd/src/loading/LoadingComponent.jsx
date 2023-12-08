import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import GridLoader from "react-spinners/GridLoader";
import PulseLoader from "react-spinners/PulseLoader";

export const PacManLoader = (props) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#1a1919] flex items-center justify-center">
      <PacmanLoader
        color="#d63636"
        loading={props.loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export const Loader = (props) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <GridLoader
        color="#d63636"
        loading={props.loading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export const Pulse = (props) => {
  return (
    <div className="w-full h-[full] flex items-center justify-center">
      <PulseLoader
        color="#d63636"
        loading={props.loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

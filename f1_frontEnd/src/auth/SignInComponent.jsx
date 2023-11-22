import React from "react";

const SignInComponent = (props) => {
  return (
    <div className="flex items-center justify-between w-[100%] h-[100%]">
      <p className=" h-[100%] py-1 font-bold items-center justify-center flex w-[100%] text-right text-lg">
        {props.message}
      </p>
      <img
        src={props.image}
              className="h-[40px] bg-white mx-1 my-[2px] rounded-full"
              style={{padding: `${props.pad}px`}}
      />
    </div>
  );
};

export default SignInComponent;

import React from "react";
import { useSelector } from "react-redux";
import selectFavourite from "../reducers/FavouriteSlice";

const Favourite = () => {
  const favourite = useSelector(selectFavourite);
  return (
    <>
      <div className="w-full h-full bg-[#1c1c1c]">Favourite</div>
    </>
  );
};

export default Favourite;
 
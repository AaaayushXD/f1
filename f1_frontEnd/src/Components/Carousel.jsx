import React from "react";
import { Carousel } from "react-responsive-carousel";
import MCLAREN from "../assets/banner/Mclaren.png";
import FERRARI from "../assets/banner/Ferrari.png";
import MERCEDES from "../assets/banner/Mercedes.png";
import REDBULL from "../assets/banner/Redbull.png";

const CarouselImages = () => {
  return (
    <div className="w-[100%] h-[100%] px-1 py-1  bg-[#5353533e]">
      <Carousel
        autoPlay={true}
        width="100%%"
        infiniteLoop
        useKeyboardArrows={true}
        swipeable
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={REDBULL} className="max-h-[600px] max-w-[1500px]" />
        </div>
        <div>
          <img src={FERRARI} className="max-h-[600px] max-w-[1500px]" />
        </div>
        <div>
          <img src={MCLAREN} className="max-h-[600px] max-w-[1500px]" />
        </div>
        <div>
          <img src={MERCEDES} className="max-h-[600px] max-w-[1500px]" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselImages;

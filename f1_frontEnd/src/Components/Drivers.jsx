import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllDrivers, driversAdded } from "../reducers/DriverSlice";
import { db } from "../firebase/base";
import { doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Loader } from "../loading/LoadingComponent";

//toast style
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

export const Drivers = () => {
  const drivers = useSelector(selectAllDrivers);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    // fetch Drivers
    const fetchDrivers = async () => {
      try {
        const driversRef = doc(db, "drivers", "driverDetails");
        const driversInfo = await getDoc(driversRef);
        const driversDetails = driversInfo.data();
        const driverDetail = driversDetails?.driverDetail;
        if (driverDetail) {
          dispatch(driversAdded(driverDetail));
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching driver's information", toastStyle);
      }
    };
    fetchDrivers();
  }, []);

  const podium = (x) => {
    if (x < 4) return true;
    return false;
  };

  return (
    <>
      {loading ? (
        <div className="w-full min-h-[50vh] flex justify-center items-center">
          <Loader loading={loading} />
        </div>
      ) : (
        <div className="grid w-full h-full grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:gap-7 lg:gap-4">
          {drivers[0] &&
            drivers[0]?.map((driver, index) => (
              <div
                key={index}
                className="w-full h-full m-4 cursor-pointer max-w-[500px] border-t border-r rounded-xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500"
              >
                <div className="w-full h-full px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="mb-2 ">
                      <p className=" text-md">
                        {driver.driverName.split(" ")[0]}
                      </p>
                      <p className="text-3xl font-bold">
                        {driver.driverName.split(" ")[1]}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-5xl font-bold"
                        style={{
                          color: podium(driver.rank) ? "#ff697d" : "#39b2ad",
                        }}
                      >
                        {driver.rank}
                      </p>
                    </div>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-between ">
                    <div className="flex flex-col gap-8 px-4">
                      <p className="text-xl">{driver.teamName}</p>
                      <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                        {driver.points ? driver.points : "0"}
                        <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                          PTS
                        </span>
                      </p>
                    </div>
                    <img src={driver.driverImage} alt={driver.driverName} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

const DriverStandings = () => {
  return (
    <>
      <NavBar />
      <div className="border-2 border-red-600"></div>
      <div className="flex flex-col w-full h-full gap-10 mb-8">
        <h1 className="text-5xl text-[#ff697d]  px-6 py-4 text-center">
          Driver's Standing 2023
        </h1>
        <Drivers />
      </div>
      <div className="mt-4 border-2 border-red-600"></div>
      <Footer />
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
    </>
  );
};
export default DriverStandings;

export const PodiumWinners = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const drivers = useSelector(selectAllDrivers);

  useEffect(() => {
    setLoading(true);
    const fetchDrivers = async () => {
      try {
        const driversRef = doc(db, "drivers", "driverDetails");
        const driversInfo = await getDoc(driversRef);
        const driversDetails = driversInfo.data();
        const driverDetail = driversDetails?.driverDetail;
        if (driverDetail) {
          dispatch(driversAdded(driverDetail));
        }
        // console.log(driverDetail);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching driver's information", toastStyle);
      }
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  const podiumWinners = drivers[0]?.slice(0, 3) || [];
  const [firstPlace, secondPlace, thirdPlace] = podiumWinners;

  return (
    <>
      {loading ? (
        <div className="w-full min-h-[50vh] flex justify-center items-center">
          <Loader loading={loading} />
        </div>
      ) : (
        <div>
          {firstPlace && secondPlace && thirdPlace && (
            <div>
              <div className="flex-wrap items-center justify-center hidden w-full h-full gap-8 p-5 text-white md:flex ">
                {/* 2nd place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#cfcfcf]">2nd</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {secondPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={secondPlace.driverImage}
                      alt={secondPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {secondPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {secondPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>
                {/* 1st Place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#ff697d]">1st</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {firstPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={firstPlace.driverImage}
                      alt={firstPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {firstPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {firstPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>
                {/* 3rd place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500  cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#9b6229]">3rd</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {thirdPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={thirdPlace.driverImage}
                      alt={thirdPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {thirdPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {thirdPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center w-full h-full gap-8 p-5 text-white md:hidden ">
                {/* 1st Place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#ff697d]">1st</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {firstPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={firstPlace.driverImage}
                      alt={firstPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {firstPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {firstPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>
                {/* 2nd place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#cfcfcf]">2nd</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {secondPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={secondPlace.driverImage}
                      alt={secondPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {secondPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {secondPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>

                {/* 3rd place */}
                <div className=" p-4 border-t border-r rounded-2xl hover:border-[#39b2ad] hover:border-t-2 hover:scale-105 transition-all duration-500  cursor-pointer">
                  <div className="flex items-center justify-between px-2 py-3">
                    <p className="text-4xl text-[#9b6229]">3rd</p>
                    <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                      {thirdPlace?.points}
                      <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                        PTS
                      </span>
                    </p>
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center">
                    <img
                      src={thirdPlace.driverImage}
                      alt={thirdPlace.driverName}
                      loading="lazy"
                    />
                  </div>
                  <div className="border border-[#525252] mb-3"></div>

                  <div className="flex items-center justify-center gap-2 p-2 mb-2">
                    <p className="text-lg ">
                      {thirdPlace.driverName.split(" ")[0]}
                    </p>
                    <p className="text-3xl font-bold">
                      {thirdPlace.driverName.split(" ")[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  scheduleAdded,
  selectAllRaceSchedule,
} from "../reducers/ScheduleSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/base";
import NavBar from "./NavBar";
import Footer from "./Footer";

export const Schedules = () => {
  const schedules = useSelector(selectAllRaceSchedule);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRaceSchedule = async () => {
      const raceScheduleRef = doc(db, "raceInfo", "scheduleDetails");
      const raceScheduleData = (await getDoc(raceScheduleRef)).data();
      dispatch(scheduleAdded(raceScheduleData.scheduleInfo));
    };
    fetchRaceSchedule();
  }, []);
  return (
    <>
      <NavBar />
      <div className="mb-4 border-2 border-red-600"></div>
      <div className="w-full h-full">
        <h1 className="px-4 py-4 mb-2 text-4xl text-center text-red-600">
          Race Schedule
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 p-5 ">
        {schedules[0] &&
          schedules[0].map((schedule, index) => (
            <div
              key={index}
              className="w-full h-full p-6 transition-all duration-500 border-t border-x rounded-xl hover:border-t-2 hover:border-[#39b2ad] cursor-pointer hover:border-x-2 justify-center items-center md:max-w-[80%] lg:max-w-[60%] lg:mb-8"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="text-5xl text-[#ff697d] font-bold">
                  {schedule.round}
                </p>
              </div>
              <div className="border border-[#5c5c5c5c] mb-4 mt-2"></div>
              <div className="flex items-center justify-between gap-4 px-3 py-2">
                <p className="text-3xl font-extrabold">{schedule.raceName}</p>
                <img
                  src={schedule.circuit.circuitDetail.countryImage}
                  alt={schedule.raceName}
                  loading="lazy"
                  className="rounded-lg"
                />
              </div>
              <div className="border border-[#5c5c5c5c] mb-4 mt-2"></div>
              <div className="flex items-center justify-center px-3 py-2">
                <img
                  src={schedule.circuit.circuitDetail.circuitImage}
                  alt={schedule.raceName}
                  loading="lazy"
                  className="transition-all duration-500 cursor-pointer hover:scale-105"
                />
              </div>
              <div className="border border-[#5c5c5c5c] mb-4 mt-2"></div>
              <div className="text-[#39b2ad] text-2xl text-center mb-4">
                Race Timing
              </div>
              <div className="grid gap-4 mb-4">
                <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                  <p className="w-full text-2xl text-center">Free Practice 1</p>
                  <div className="flex items-center w-full gap-4 justify-evenly">
                    <p className="bg-[#b8b6b6] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                      {
                        schedule.raceSchedule[0].FirstPracticeSession
                          .firstPracDate
                      }
                    </p>
                    <p className="bg-[#b8b6b6] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                      {
                        schedule.raceSchedule[0].FirstPracticeSession
                          .firstPracTime
                      }
                    </p>
                  </div>
                </div>

                {/*  */}

                {schedule.raceSchedule[2].ThirdPracticeSession ? (
                  <>
                    <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                      <p className="w-full text-2xl text-center">
                        Free Practice 2
                      </p>
                      <div className="flex items-center w-full gap-4 justify-evenly">
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                          {
                            schedule.raceSchedule[1].SecondPracticeSession
                              .secondPracDate
                          }
                        </p>
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                          {
                            schedule.raceSchedule[1].SecondPracticeSession
                              .secondPracTime
                          }
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                      <p className="w-full text-2xl text-center">
                        Free Practice 3
                      </p>
                      <div className="flex items-center w-full gap-4 justify-evenly">
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                          {
                            schedule.raceSchedule[2].ThirdPracticeSession
                              .thirdPracDate
                          }
                        </p>
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                          {
                            schedule.raceSchedule[2].ThirdPracticeSession
                              .thirdPracTime
                          }
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                      <p className="w-full text-2xl text-center text-green-500">
                        Qualifying
                      </p>
                      <div className="flex items-center w-full gap-4 justify-evenly">
                        <p className="bg-[#98cf98] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                          {schedule.raceSchedule[3].Qualifying.qualifyingDate}
                        </p>
                        <p className="bg-[#98cf98] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                          {schedule.raceSchedule[3].Qualifying.qualifyingTime}
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                      <p className="w-full text-2xl text-center">
                        Free Practice 2
                      </p>
                      <div className="flex items-center w-full gap-4 justify-evenly">
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                          {
                            schedule.raceSchedule[1].SecondPracticeSession
                              .secondPracDate
                          }
                        </p>
                        <p className="bg-[#b8b6b6] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                          {
                            schedule.raceSchedule[1].SecondPracticeSession
                              .secondPracTime
                          }
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {schedule.raceSchedule[2].SprintSession ? (
                  <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                    <p className="w-full text-2xl text-center text-yellow-500">
                      Sprint Race
                    </p>
                    <div className="flex items-center w-full gap-4 justify-evenly">
                      <p className="bg-[#f2ffaa] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                        {schedule.raceSchedule[2].SprintSession.sprintDate}
                      </p>
                      <p className="bg-[#f2ffaa] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                        {schedule.raceSchedule[2].SprintSession.sprintTime}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                    <p className="w-full text-2xl text-center text-green-500">
                      Qualifying
                    </p>
                    <div className="flex items-center w-full gap-4 justify-evenly">
                      <p className="bg-[#98cf98] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full">
                        {schedule.raceSchedule[3].Qualifying.qualifyingDate}
                      </p>
                      <p className="bg-[#98cf98] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                        {schedule.raceSchedule[3].Qualifying.qualifyingTime}
                      </p>
                    </div>
                  </div>
                )}
                <div className="bg-[#5c5c5c8a] px-4 py-3 rounded-xl hover:bg-[#3e3e3e] cursor-pointer flex flex-col items-center gap-2 mb-2">
                  <p className="w-full text-2xl text-center text-red-500">
                    Race
                  </p>
                  <div className="flex items-center w-full gap-4 justify-evenly">
                    <p className="bg-[#ec4427] text-[#fefefe] px-2 py-1 rounded-3xl text-lg text-center font-extrabold w-full ">
                      {schedule.raceSchedule[4].GrandPrix.raceDate}
                    </p>
                    <p className="bg-[#ec4427] text-[#fefefe] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold ">
                      {schedule.raceSchedule[4].GrandPrix.raceTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 border-2 border-red-600"></div>
      <Footer />
    </>
  );
};

// <div className="bg-[#5c5c5c8a] px-4 py-2 grid gap-2 md:gap-4 grid-cols-3 justify-items-center items-center rounded-xl hover:bg-[#3e3e3e] cursor-pointer">
//   <p className="hidden text-xl md:block">Free Practice 2</p>
//   <p className="text-2xl md:hidden">FP 2</p>
//   <p className="bg-[#b8b6b6] text-[#1b1b1b] px-2 py-1 rounded-3xl text-lg w-full text-center font-extrabold">
//     {schedule.raceSchedule[1].SecondPracticeSession.secondPracDate}
//   </p>
//   <p className="bg-[#b8b6b6] text-[#1b1b1b] px-3 py-1 rounded-3xl w-full text-lg text-center font-extrabold">
//     {schedule.raceSchedule[1].SecondPracticeSession.secondPracTime}
//   </p>
// </div>;

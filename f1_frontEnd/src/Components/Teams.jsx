import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTeams, teamsAdded } from "../reducers/TeamSlice";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/base";
import { selectAllDrivers } from "../reducers/DriverSlice";
import PATTERN from "../assets/bgImages/pattern.jpg";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Teams = () => {
  const teams = useSelector(selectAllTeams);
  const drivers = useSelector(selectAllDrivers);
  const dispatch = useDispatch();

  const getTeamDrivers = async (teamName) => {
    const driverRef = doc(db, "drivers", "driverDetails");
    const driverInfo = await getDoc(driverRef);
    const driversDetails = driverInfo.data();
    const driverDetail = driversDetails?.driverDetail;
    const teamDrivers = driverDetail.filter(
      (driver) => driver.teamName === teamName
    );
    return teamDrivers;
  };
  getTeamDrivers("Red Bull Racing");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamRef = doc(db, "teamInfo", "teamDetails");
        const teamsInfo = await getDoc(teamRef);
        const teamDetails = teamsInfo.data();
        const teams = teamDetails?.teamInfo;

        const fetchDrivers = teams.map(async (team) => {
          return getTeamDrivers(team.teamName)
            .then((driver) => {
              return { team, driver };
            })
            .catch((err) => console.error(err));
        });

        Promise.all(fetchDrivers).then((drivers) => {
          if (drivers.length !== 0) {
            dispatch(teamsAdded(drivers));
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeams();
  }, []);

  return (
    <>
      <NavBar />
      <div className="mb-4 border-2 border-red-600"></div>
      <div className="flex items-center justify-center w-full h-full p-5">
        <h1 className="px-7 text-6xl text-center text-red-600 border-t-4 border-r-4 border-[#acacac] rounded-lg py-7">
          F1 Teams
        </h1>
      </div>
      <div className="grid w-full h-full grid-cols-1 gap-8 p-4 lg:grid-cols-2 lg:gap-6">
        {teams[0] &&
          teams[0].map((team, index) => (
            <div
              key={index}
              className="w-full h-full p-4 border-r border-t mb-4 rounded-lg border-[#5f5f5f] hover:border-[#39b2ad] cursor-pointer hover:border-t-2 transition-all duration-500"
            >
              <div className="flex items-center justify-between px-3 py-2 ">
                <p className="text-6xl font-extrabold">
                  {team.team.constructorRank}
                </p>
                <p className="flex flex-col text-4xl font-bold lg:text-4xl max-w-[70px] text-center">
                  {team.team.constructorPoints}
                  <span className="text-xl font-extrabold mt-1 bg-[#cfcfcf] text-[#242424] rounded-2xl">
                    PTS
                  </span>
                </p>
              </div>
              <div className="border border-[#978e8e49] mt-4 "></div>
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <h3 className="text-5xl font-bold ">{team.team.teamName}</h3>
                <div>
                  <img
                    src={team.team.teamLogo}
                    className="w-[80px] mix-blend-screen"
                    alt={team.team.teamName}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="border border-[#978e8e49] mb-4 "></div>
              <div className="flex items-center justify-between gap-3 px-3 mb-4">
                <div className="flex items-center justify-between w-full gap-5 border-b border-r rounded-lg border-[#5f5f5f] hover:border-[#39b2ad] cursor-pointer hover:scale-105 transition-all duration-500">
                  <div className="pl-2 mb-2">
                    <p className="text-lg">
                      {team.driver[0].driverName.split(" ")[0]}
                    </p>
                    <p className="text-2xl font-bold">
                      {team.driver[0].driverName.split(" ")[1]}
                    </p>
                  </div>
                  <img
                    src={team.driver[0].driverImage}
                    alt={team.driver[0].driverName}
                    loading="lazy"
                    className="h-[100px] pr-4 hidden lg:block"
                  />
                </div>
                <div className="flex items-center justify-between w-full gap-5 border-b border-r rounded-lg border-[#5f5f5f] hover:border-[#39b2ad] cursor-pointer hover:scale-105 transition-all duration-500">
                  <div className="pl-2 mb-2">
                    <p className="text-lg">
                      {team.driver[1].driverName.split(" ")[0]}
                    </p>
                    <p className="text-2xl font-bold">
                      {team.driver[1].driverName.split(" ")[1]}
                    </p>
                  </div>
                  <img
                    src={team.driver[1].driverImage}
                    alt={team.driver[1].driverName}
                    loading="lazy"
                    className="h-[100px] pr-4 hidden lg:block"
                  />
                </div>
              </div>
              <div
                className="flex items-center justify-center bg-cover filter background-blur-[10]"
                style={{ backgroundImage: `url(${PATTERN})` }}
              >
                <img
                  src={team.team.carImage}
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4 border-2 border-red-600"></div>
      <Footer />
    </>
  );
};

export default Teams;

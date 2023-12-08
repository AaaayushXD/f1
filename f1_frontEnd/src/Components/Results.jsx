import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { selectAllRaceSchedule } from "../reducers/ScheduleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Pulse } from "../loading/LoadingComponent";

export const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchRoundResult = async () => {
    const resultApi = `https://ergast.com/api/f1/current/${id}/results.json`;
    try {
      const response = await axios.get(resultApi);
      const data = response.data.MRData.RaceTable.Races[0].Results;
      return [...data];
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetchRoundResult();
      setResults(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="mx-2 ">
        <DropDownMenu />
      </div>
      <div className="px-5 text-lg text-red-600">Round {id}</div>

      <div className="flex items-center justify-center w-full h-full transition-all duration-500 ease-in-out">
        <div className="w-full lg:max-w-[1500px]">
          <DefaultResultTable />
          {loading ? (
            <div className="w-full min-h-[50vh] flex justify-center items-center">
              <Pulse loading={loading} />
            </div>
          ) : (
            <div className="mb-8">
              {results &&
                results.map((result, index) => (
                  <div
                    key={index}
                    className="grid w-full h-full grid-cols-4 justify-items-center bg-[#4e4e4e3d] border-b mt-4 rounded-b-lg border-[#3f3f3f]  drop-shadow-xl items-center hover:bg-[#3e3e3e83] cursor-pointer "
                  >
                    <p className="flex items-center h-full p-4 text-xl text-left md:text-3xl">
                      {result.position.trim()}
                    </p>
                    <p className="flex items-center justify-center gap-2 p-4 ">
                      <span className="hidden text-md md:block lg:text-lg font-extralight">
                        {" "}
                      </span>
                      <span className="text-xl font-bold md:text-xl lg:text-2xl">
                        {" "}
                        {result.Driver.familyName}{" "}
                      </span>
                    </p>
                    <p className="p-4 text-xl text-center lg:font-bold">
                      {" "}
                      {result.Constructor.name}{" "}
                    </p>
                    <p className="p-4 text-xl md:text-2xl lg:text-3xl">
                      {result.points ? result.points : "0"}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const DropDownMenu = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const schedules = useSelector(selectAllRaceSchedule);
  const navigate = useNavigate();

  const handleDropDown = (e) => {
    const selectedValue = Number(e.target.value);
    setSelectedRound(selectedValue);
    const isNumber = Number.isInteger(selectedValue);
    isNumber && navigate(`/results/${selectedValue}`);
  };

  return (
    <>
      {/* Drop Down Menu */}
      <div className="w-full h-full bg-[#111111f3] ">
        <div className="max-h-[100px]  px-5 py-2 text-md max-w-[400px]  focus:outline-[#39b2ad] mb-4">
          <p className="pb-2">Select a Round: </p>
          <select
            onChange={handleDropDown}
            value={selectedRound}
            className="w-full text-xl rounded-md bg-[#42424269] px-4 hover:bg-[#3e3e3e98] cursor-pointer"
          >
            <option defaultValue={"Choose a round"}>Choose a round</option>
            {schedules[0].map((schedule, index) => (
              <option
                value={schedule.round}
                key={index}
                className="bg-[#272727] text-xl"
              >
                {schedule.round}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="p-4 mb-4 text-4xl text-center text-red-600">Results</h1>
    </>
  );
};

export const ResultPage = () => {
  return (
    <div className="w-full h-full bg-black">
      <NavBar />
      <div className="mb-4 border-2 border-red-600"></div>
      <div className="w-full h-full ">
        <Results />
      </div>
      <div className="mt-4 border-2 border-red-600"></div>
      <Footer />
    </div>
  );
};

export const DefaultResultTable = () => {
  return (
    <>
      <div className="w-full h-full text-[#b6b6b9ec] grid grid-cols-4 justify-items-center mb-3 cursor-pointer font-bold border-b border-b-[#3e3e3e85] py-4">
        <p className="text-left text-md hover:underline">Position</p>
        <p className="text-left text-md hover:underline">Name</p>
        <p className="text-left text-md hover:underline">Team</p>
        <p className="text-left text-md hover:underline">Points</p>
      </div>
    </>
  );
};

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/base";
import { circuitAdded, selectAllCircuits } from "../reducers/CircuitSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Circuits = () => {
  const dispatch = useDispatch();
  const circuits = useSelector(selectAllCircuits);
  useEffect(() => {
    const fetchCircuit = async () => {
      try {
        const circuitRef = doc(db, "raceInfo", "circuitDetails");
        const circuitData = await getDoc(circuitRef);
        const circuit = circuitData.data();
        if (circuit) {
          dispatch(circuitAdded(circuit.circuitData));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCircuit();
  }, []);
  return (
    <>
      <NavBar />
      <div className="mb-4 border-2 border-red-600"></div>
      <div className="w-full h-full p-6 my-3 ">
        <h1 className="text-5xl text-center text-red-600">
          F1 Circuits
        </h1>
      </div>
      <div className="grid w-full h-full grid-cols-1 gap-8 p-5 md:grid-cols-2">
        {circuits[0] &&
          circuits[0].map((circuit, index) => (
            <div
              key={index}
              className="w-full h-full px-4 py-3 border-t-2 border-r-2 rounded-xl border-[#6b6a6a88] hover:border-[#39b2ad] cursor-pointer transition-all duration-500"
            >
              <div className="flex items-center gap-6 px-2 py-3 h-[90px]">
                <div className="flex items-center justify-center overflow-hidden rounded-lg">
                  <img
                    src={circuit.countryImage}
                    alt={circuit.circuitId}
                    loading="lazy"
                    className="h-[40px]"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-3xl font-bold">{circuit.circuitName}</p>
                </div>
              </div>
              <div className="border border-[#5a5a5a] mb-4 mt-3"></div>
              <div className="px-4 py-6">
                <img
                  src={circuit.circuitImage}
                  alt={circuit.circuitName}
                  loading="lazy"
                  className="h-full transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="border border-[#5a5a5a] mb-4 mt-2"></div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex items-center w-full bg-[#2b2b2b96] px-5 py-3 gap-4 rounded-r-2xl rounded-l-lg hover:bg-[#5252526b]">
                  <p className="text-xl">Length: </p>
                  <p className="text-3xl font-bold ">
                    {circuit.length}
                    <span className="pl-2 text-sm">(Km)</span>
                  </p>
                </div>
                <div className="flex items-center w-full bg-[#2b2b2b96] px-5 py-3 gap-4 rounded-r-2xl rounded-l-lg hover:bg-[#5252526b]">
                  <p className="text-xl">Laps: </p>
                  <p className="text-4xl ">{circuit.laps}</p>
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

export default Circuits;

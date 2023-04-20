import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SolarCellPage } from "./SolarCellPage";
import Header from "./Layout/Header";
import { useEffect, useState } from "react";
import mosfetIcon from './icons/mosfet-icon.png'
import nandIcon from './icons/nand-icon.png'
import solarCellIcon from './icons/solar-cell.png'
import axios from "axios";

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

//Check if the API_URL is defined
if (!API_URL) throw new Error("REACT_APP_API_URL is not defined");

const getTitleFromPath = (path: string) => {
  switch (path) {
    case "/":
      return "Menu";
    case "/solarCell":
      return "Celda Solar";
    default:
      return "";
  }
};

//Axios get to http://localhost:8000/remote_lab/logic_gate
const fetchLogicGate = async () => {
  const res = await axios.get("http://localhost:8000/remote_lab/logic_gate");
  console.log(res.data);
};
  

export default function App() {
  const [title, setTitle] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(getTitleFromPath(location.pathname));
  }, [location]);


  return (
    <>
      <Header title={title} />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="h-full w-full">
                <div
                  style={{ height: "85vh" }}
                  className="flex flex-wrap justify-center mt-4"
                >
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
                    <button
                      className="w-full h-full bg-inaoe_comp2 hover:bg-opacity-80 text-center font-bold rounded-lg flex flex-col"
                      onClick={() => navigate("/solarCell")}
                    >
                      <span className="flex-1 flex items-center justify-center text-white text-xl flex-col gap-y-10">
                        Celda Solar
                        <img
                          className="w-1/3"
                          src={solarCellIcon}
                          alt="solar-cell-icon"
                        />
                      </span>
                    </button>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
                    <button className="w-full h-full bg-inaoe_comp3 hover:bg-opacity-80 text-center font-bold rounded-lg flex flex-col relative">
                      <span className="flex-1 flex items-center justify-center text-white text-xl flex-col gap-y-10">
                        MOSFET
                        <img
                          className="w-1/3"
                          src={mosfetIcon}
                          alt="mosfet-icon"
                        />
                      </span>
                    </button>
                  </div>

                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
                    <button
                      onClick={fetchLogicGate}
                      className="w-full h-full bg-inaoec1 hover:bg-opacity-80 text-center font-bold rounded-lg flex flex-col"
                    >
                      <span className="flex-1 flex items-center justify-center text-white text-xl flex-col gap-y-10">
                        Compuerta Logica NAND
                        <img className="w-1/3" src={nandIcon} alt="nand-icon" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/solarCell" element={<SolarCellPage />} />
        <Route path="/*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
  //return requireAuth(SolarCellPage)
}




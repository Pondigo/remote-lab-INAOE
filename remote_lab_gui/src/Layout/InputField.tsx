import React, { useState } from "react";

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

//TODO: Zoom area de interes
//TODO: Varias curvas a la vez (max 5)
//TODO: FLoat x label
//TODO: Potencia float
//TODO: % absoluto 2 cifras significativas
//TODO: Midiendo
//TODO: Boton detener


const MyComponent: React.FC<{
  getData: (vstart: number, vend: number, step: number) => void;
}> = ({ getData }) => {
  const [startVoltaje, setStartVoltaje] = useState<number>(0);
  const [endVoltaje, setEndVoltaje] = useState<number>(0);
  const [stepSize, setStepSize] = useState<number>(0);
  const [isLightOn, setIsLightOn] = useState<boolean>(false);
  const [isAddPowerCurve, setIsAddPowerCurve] = useState<boolean>(true);

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <ul className="flex border-b-2 mb-4">
          <li className="mr-4">
            <button className="border-b-2 border-blue-500 text-blue-500 focus:outline-none">
              I - V (curva de salida)
            </button>
          </li>
          {/*        <li>
            <button className="text-gray-500 focus:outline-none">Curvas</button>
          </li> */}
        </ul>
        <div>
          <div>
            <h2 className="text-lg font-bold mb-4">Parametros de barrido</h2>
            <div className="mb-4 flex flex-row items-center">
              <label
                htmlFor="startVoltaje"
                className="block mb-1 font-medium w-1/5 mr-40"
              >
                Voltaje inicial:
              </label>
              <input
                id="startVoltaje"
                type="number"
                className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
                value={startVoltaje}
                onChange={(e) => setStartVoltaje(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">V</span>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <label
                htmlFor="endVoltaje"
                className="block mb-1 font-medium  w-1/5 mr-40"
              >
                Voltaje final:
              </label>
              <input
                id="endVoltaje"
                type="number"
                className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                value={endVoltaje}
                onChange={(e) => setEndVoltaje(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">V</span>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <label
                htmlFor="stepSize"
                className="block mb-1 font-medium  w-1/5 mr-40"
              >
                Paso:
              </label>
              <input
                id="stepSize"
                type="number"
                className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                value={stepSize}
                onChange={(e) => setStepSize(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">s</span>
            </div>
            <div className="mb-4 flex flex-row items-center">
              <input
                id="isLightOn"
                type="checkbox"
                className="mr-2"
                checked={isLightOn}
                onChange={(e) => {
                  //Get to 
                  fetch(
                    `${API_URL}/remote_lab/solar_cell/lightChange?ligth=${e.target.checked}`
                  );
                  setIsLightOn(e.target.checked);


                }}
              />
              <span className="text-gray-500 text-sm ml-5">Luz encendida</span>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => getData(startVoltaje, endVoltaje, stepSize)}
            className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center mx-auto my-2 mt-4"
          >
            Obtener curva
          </button>
          <div className="flex pt-2 justify-center">
            <input
              id="isAddPowerCurve"
              type="checkbox"
              disabled={true}
              className="mr-2 place-content-center"
              checked={isAddPowerCurve}
              onChange={(e) => setIsAddPowerCurve(e.target.checked)}
            />
            <span className="text-gray-500 text-sm ml-5">
              Agregar curva de potencia
            </span>
          </div>
          <div className="hidden">{/* Controlled List */}</div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
import React, { useState } from "react";

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

//TODO: Voltaje limite: 10
//TOOO: Corriente limite: 15mA
//TODO: Remove graph on isTransfer change
const MyComponent: React.FC<{
  getData: (
    vstart: number,
    vend: number,
    step: number,
    fixedVoltaje: number
  ) => void;
  isOnTransfer: boolean;
  setIsOnTransfer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ getData, isOnTransfer, setIsOnTransfer }) => {
  const [startVoltaje, setStartVoltaje] = useState<number>(0);
  const [endVoltaje, setEndVoltaje] = useState<number>(0);
  const [stepSize, setStepSize] = useState<number>(0);
  const [fixedVoltaje, setFixedVoltaje] = useState<number>(0);


  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <ul className="flex border-b-2 mb-4">
          <li>
            <button
              className={
                isOnTransfer
                  ? "border-b-2 border-blue-500 text-blue-500 focus:outline-none"
                  : "text-gray-500 focus:outline-none"
              }
              onClick={() => {
                setIsOnTransfer(true);
                fetch(`${API_URL}/remote_lab/mosfet/matrixSwith?switch=${true}`)
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                  });
              }}
            >
              Ids - Vgs (transferencia)
            </button>
          </li>
          <li className="mr-4 ml-4">
            <button
              className={
                isOnTransfer
                  ? "text-gray-500 focus:outline-none"
                  : "border-b-2 border-blue-500 text-blue-500 focus:outline-none"
              }
              onClick={() => {
                setIsOnTransfer(false);
                //fetch to api_url
                fetch(
                  `${API_URL}/remote_lab/mosfet/matrixSwith?switch=${false}`
                )
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                  });
              }}
            >
              Ids -Vds (lineal a saturacion)
            </button>
          </li>
        </ul>
        <div>
          {isOnTransfer ? (
            <div>
              <h2 className="text-lg font-bold mb-4">Parametros de barrido</h2>
              <div className="mb-4 flex flex-row items-center">
                <label
                  htmlFor="startVoltaje"
                  className="block mb-1 font-medium w-1/5 mr-40"
                >
                  Vgs inicial:
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
                  Vgs final:
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
                <span className="text-gray-500 text-sm ml-5">V</span>
              </div>

              <div className="mb-4 flex flex-row items-center">
                <label
                  htmlFor="stepSize"
                  className="block mb-1 font-medium  w-1/5 mr-40"
                >
                  Vds:
                </label>
                <input
                  id="stepSize"
                  type="number"
                  className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                  value={fixedVoltaje}
                  onChange={(e) => setFixedVoltaje(Number(e.target.value))}
                  //nChange={(e) => setStepSize(Number(e.target.value))}
                />
                <span className="text-gray-500 text-sm ml-5">V</span>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-4">Parametros de barrido</h2>
              <div className="mb-4 flex flex-row items-center">
                <label
                  htmlFor="startVoltaje"
                  className="block mb-1 font-medium w-1/5 mr-40"
                >
                  Vds inicial:
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
                  Vds final:
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
                <span className="text-gray-500 text-sm ml-5">V</span>
              </div>

              <div className="mb-4 flex flex-row items-center">
                <label
                  htmlFor="stepSize"
                  className="block mb-1 font-medium  w-1/5 mr-40"
                >
                  Vgs:
                </label>
                <input
                  id="stepSize"
                  type="number"
                  className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                  value={fixedVoltaje}
                  onChange={(e) => setFixedVoltaje(Number(e.target.value))}
                  //value={stepSize}
                  //nChange={(e) => setStepSize(Number(e.target.value))}
                />
                <span className="text-gray-500 text-sm ml-5">V</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            onClick={() =>
              getData(startVoltaje, endVoltaje, stepSize, fixedVoltaje)
            }
            className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center mx-auto my-2 mt-4"
          >
            Obtener curva
          </button>

          <div className="hidden">{/* Controlled List */}</div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
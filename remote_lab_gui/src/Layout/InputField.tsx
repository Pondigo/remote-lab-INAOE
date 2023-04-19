import React, { useState } from "react";

const MyComponent: React.FC = () => {
  const [startVoltaje, setStartVoltaje] = useState<number>(0);
  const [endVoltaje, setEndVoltaje] = useState<number>(0);
  const [stepSize, setStepSize] = useState<number>(0);
  const [isLightOn, setIsLightOn] = useState<boolean>(false);

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <ul className="flex border-b-2 mb-6">
          <li className="mr-4">
            <button className="border-b-2 border-blue-500 text-blue-500 focus:outline-none">
              Configurar barridos
            </button>
          </li>
          <li>
            <button className="text-gray-500 focus:outline-none">
              Curvas
            </button>
          </li>
          
        </ul>
        <div>
          <div>
            <h2 className="text-lg font-bold mb-4">Parametros de barrido</h2>
            <div className="mb-4">
              <label htmlFor="startVoltaje" className="block mb-1 font-medium">
                Voltaje de inicio:
              </label>
              <input
                id="startVoltaje"
                type="number"
                className="w-10/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none "
                value={startVoltaje}
                onChange={(e) => setStartVoltaje(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">V</span>
            </div>
            <div className="mb-4">
              <label htmlFor="endVoltaje" className="block mb-1 font-medium">
                Voltaje de fin:
              </label>
              <input
                id="endVoltaje"
                type="number"
                className="w-10/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                value={endVoltaje}
                onChange={(e) => setEndVoltaje(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">V</span>
            </div>
            <div className="mb-4">
              <label htmlFor="stepSize" className="block mb-1 font-medium">
                Paso:
              </label>
              <input
                id="stepSize"
                type="number"
                className="w-10/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
                value={stepSize}
                onChange={(e) => setStepSize(Number(e.target.value))}
              />
              <span className="text-gray-500 text-sm ml-5">s</span>
            </div>
            <div className="mb-4">
            
              <input
                id="isLightOn"
                type="checkbox"
                className="mr-2"
                checked={isLightOn}
                onChange={(e) => setIsLightOn(e.target.checked)}
              />
              <span className="text-gray-500 text-sm ml-5">Luz encendida</span>
            </div>
          </div>

          <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center mx-auto my-2 mt-4"
        >
            Obtener curva
        </button>
        <input
                id="isLightOn"
                type="checkbox"
                className="mr-2"
                checked={isLightOn}
                onChange={(e) => setIsLightOn(e.target.checked)}
              />
              <span className="text-gray-500 text-sm ml-5">Agregar curva de potencia</span>
          <div className="hidden">
            {/* Controlled List */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
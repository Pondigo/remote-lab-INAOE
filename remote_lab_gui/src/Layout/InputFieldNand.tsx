import React, { useState } from "react";
import { useSquareSignal } from "../Hooks/useSquareSignal";

const MyComponent: React.FC<{
  getData: () => void;
  signalAparams: useSquareSignal;
  signalBparams: useSquareSignal;
  errors?: {
    signalA?: string;
    signalB?: string;
  };
}> = ({ getData, signalAparams, signalBparams, errors }) => {
  const [isOnTransfer, setIsOnTransfer] = useState<boolean>(false);


  const colorHeader = (isSelected: boolean, haveError: boolean) => {
    if (haveError) return "text-red-500 focus:outline-none";
    if (isSelected) return "border-b-2 border-blue-500 text-blue-500 focus:outline-none";
    return "text-gray-500 focus:outline-none";
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <ul className="flex border-b-2 mb-4">
          <li className="mr-4">
            <button
              className={colorHeader(
                !isOnTransfer,
                errors?.signalA !== undefined
              )}
              onClick={() => setIsOnTransfer(false)}
              //TODO: Sync graph colors
            >
              entrada A
            </button>
          </li>
          <li>
            <button
              className={colorHeader(
                isOnTransfer,
                errors?.signalB !== undefined
              )}
              onClick={() => setIsOnTransfer(true)}
            >
              entrada B
            </button>
          </li>
        </ul>
        <div>
          {!isOnTransfer ? <SquareSignalParams {...signalAparams} /> : <SquareSignalParams {...signalBparams} />}

          <button
            type="submit"
            onClick={getData}
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


const SquareSignalParams: React.FC<useSquareSignal> = ({
  frequency,
  period,
  pulseWidth,
  dutyCycle,
  voltagePeakToPeak,
  handleFrequencyChange,
  handlePeriodChange,
  handlePulseWidthChange,
  handleDutyCycleChange,
  handleVoltagePeakToPeakChange,
  errors,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Parámetros de señal cuadrada</h2>
      <div className="mb-4 flex flex-row items-center">
        <label
          htmlFor="frequency"
          className="block mb-1 font-medium w-1/5 mr-40"
        >
          Frecuencia: {errors?.frecuency && <span className="text-red-500">{errors.frecuency}</span>}
        </label>
        <input
          id="frequency"
          type="number"
          className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
          value={frequency}
          onChange={(e) => handleFrequencyChange(parseInt(e.target.value))}
          max={1000}
          min={0}
        />
        <span className="text-gray-500 text-sm ml-5">Hz</span>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <label htmlFor="period" className="block mb-1 font-medium w-1/5 mr-40">
          Periodo: {errors?.period && <span className="text-red-500">{errors.period}</span>}
        </label>
        <input
          id="period"
          type="number"
          className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
          value={period}
          onChange={(e) => handlePeriodChange(parseInt(e.target.value))}
        />
        <span className="text-gray-500 text-sm ml-5">s</span>
      </div>

      <div className="mb-4 flex flex-row items-center">
        <label
          htmlFor="duty-cycle"
          className="block mb-1 font-medium w-1/5 mr-40"
          //TODO: 20 TO 100
        >
          Ciclo de trabajo: {errors?.dutyCycle && <span className="text-red-500">{errors.dutyCycle}</span>}
        </label>
        <input
          id="duty-cycle"
          type="number"
          className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
          value={dutyCycle}
          onChange={(e) => handleDutyCycleChange(parseInt(e.target.value))}
        />
        <span className="text-gray-500 text-sm ml-5">%</span>
      </div>
      <div className="mb-4 flex flex-row items-center">
        <label
          htmlFor="pulse-width"
          className="block mb-1 font-medium w-1/5 mr-40"
        >
          Ancho de pulso: {errors?.pulseWidth && <span className="text-red-500">{errors.pulseWidth}</span>}
        </label>
        <input
          id="pulse-width"
          type="number"
          disabled
          className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
          value={pulseWidth}
          onChange={(e) => handlePulseWidthChange(parseInt(e.target.value))}
        />
        <span className="text-gray-500 text-sm ml-5">s</span>
      </div>

      <div className="mb-4 flex flex-row items-center">
        <label
          htmlFor="voltage-peak-to-peak"
          className="block mb-1 font-medium w-1/5 mr-40"
        >
          Voltaje pp: {errors?.voltagePeakToPeak && <span className="text-red-500">{errors.voltagePeakToPeak}</span>}
        </label>
        <input
          id="voltage-peak-to-peak"
          type="number"
          className="w-4/12 py-2 px-3 border border-gray-300 rounded-md focus:outline-none"
          value={voltagePeakToPeak}
          onChange={(e) =>
            handleVoltagePeakToPeakChange(parseInt(e.target.value))
          }
        />
        <span className="text-gray-500 text-sm ml-5">V</span>
      </div>
    </div>
  );
};
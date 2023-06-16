import React, { useRef, useState } from "react";

//TODO: limitar frecuencia 1k
//TODO: Señal a periodo mayor

const ComputeNANDparams = () => {
  const inputDelayRef = useRef<number>(0);
  const outputDelayRef = useRef<number>(0);

  const [inputDelay, setInputDelay] = useState<number>(0);
  const [outputDelay, setOutputDelay] = useState<number>(0);
  const [prefix, setPrefix] = useState<string>("ns");


  const handleInputDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDelayRef.current = Number(e.target.value);
    setInputDelay(inputDelayRef.current * getMultiplier(prefix));
  };

  const handleOutputDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    outputDelayRef.current = Number(e.target.value);
    setOutputDelay(outputDelayRef.current * getMultiplier(prefix));
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrefix(e.target.value);
    setInputDelay(inputDelayRef.current * getMultiplier(e.target.value));
    setOutputDelay(outputDelayRef.current * getMultiplier(e.target.value));
  };



  const getMultiplier = (prefix: string) => {
    switch (prefix) {
      case "ns":
        return 1;
      case "us":
        return 1000;
      case "ms":
        return 1000000;
      default:
        return 1;
    }
  };

  const [isRedActive, setRedActive] = useState(true);
  const [isYellowActive, setYellowActive] = useState(true);
  const [isGreenActive, setGreenActive] = useState(true);

  return (
    <>
      <div className="w-100">
        <h2 className="text-lg font-bold mb-4 text-center">Estado:</h2>
        <div className="flex items-center justify-between w-80 gap-4">
          <div
            className={`h-12 w-12 flex flex-1 mr-2 rounded-full items-center justify-center ${
              isRedActive
                ? "bg-signalA_fill border-signalA_border border-4"
                : "bg-gray-500 border-gray-500 border-4"
            }`}
            onClick={() => setRedActive(!isRedActive)}
          >
            <span
              className={`${
                isRedActive ? "text-gray-700" : "text-white"
              } text-center text-md`}
            >
              entrada A
            </span>
          </div>
          <div
            className={`h-12 w-12 flex flex-1 mr-2 rounded-full items-center justify-center ${
              isYellowActive
                ? "bg-signalB_fill border-signalB_border border-4"
                : "bg-gray-500 border-gray-500 border-4"
            }`}
            onClick={() => setYellowActive(!isYellowActive)}
          >
            <span
              className={`${
                isYellowActive ? "text-gray-700" : "text-white"
              } text-center text-md`}
            >
              entrada B
            </span>
          </div>
          <div
            className={`h-12 w-12 flex flex-1 rounded-full items-center justify-center ${
              isGreenActive
                ? "bg-salida_fill border-salida_border border-4"
                : "bg-gray-500 border-gray-500 border-4"
            }`}
            onClick={() => setGreenActive(!isGreenActive)}
          >
            <span
              className={`${
                isGreenActive ? "text-gray-700" : "text-white"
              } text-center text-md`}
            >
              salida
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComputeNANDparams;

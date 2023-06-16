import React, { useRef, useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import the Katex CSS

//TODO: Ron instead of linear R
const ComputeMosParams: React.FC<{ isOnTransfer: boolean }> = ({
  isOnTransfer,
}) => {
  const impRef = useRef<number>(0);
  const iscRef = useRef<number>(0);
  const vmpRef = useRef<number>(0);
  const vscRef = useRef<number>(0);

  const ffRef = useRef<number>(0);

  const [fillFactor, setFillFactorInner] = useState<string>("??");
  const [efficiency, setEfficiency] = useState<string>("??");

  const setFillFactor = (fillFactor: number) => {
    if (isNaN(fillFactor)) setEfficiency("??");
    else {
      const scientific = fillFactor.toExponential(2);
      if (scientific.includes("e")) {
        const [mantissa, exponent] = scientific.split("e");
        setEfficiency(mantissa + " \\times 10^{" + exponent + "}" + " \\Omega");
      } else setEfficiency(fillFactor.toFixed(2) + " A");
    }
  };

  const handleIZeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    impRef.current = Number(e.target.value);
    const fillFactor = ((iscRef.current - Number(e.target.value)) / (vmpRef.current - vscRef.current))
    setFillFactor(fillFactor);
  };

  const handleIscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    iscRef.current = Number(e.target.value);
    const fillFactor = ((Number(e.target.value) - impRef.current) / (vmpRef.current - vscRef.current))
    setFillFactor(fillFactor);
  };

  const handleVZeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    vmpRef.current = Number(e.target.value);
    const fillFactor = ((iscRef.current - impRef.current) / (Number(e.target.value) - vscRef.current))  
    setFillFactor(fillFactor);
  };

  const handleVscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    vscRef.current = Number(e.target.value);
    const fillFactor = ((iscRef.current - impRef.current) / (vmpRef.current - Number(e.target.value)))
    setFillFactor(fillFactor);
  };

  if (!isOnTransfer) {
    return (
      <>
        <div>
          <div className="grid grid-cols-2 gap-4 m-5">
            <div>
              <label htmlFor="imp" className="block text-center">
                <InlineMath>{"I_{0}:"}</InlineMath>
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="imp"
                  onChange={handleIZeroChange}
                  className="w-full mr-2 p-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <InlineMath>{"I"}</InlineMath>
              </div>
            </div>
            <div>
              <label htmlFor="vmp" className="block text-center">
                <InlineMath>{"V_{0}:"}</InlineMath>{" "}
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="vmp"
                  onChange={handleVZeroChange}
                  className="w-full mr-2 p-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <InlineMath>{"V"}</InlineMath>
              </div>
            </div>
            <div>
              <label htmlFor="isc" className="block text-center">
                <InlineMath>{"I_{1}:"}</InlineMath>
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="isc"
                  onChange={handleIscChange}
                  className="w-full mr-2 p-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <InlineMath>{"I"}</InlineMath>
              </div>
            </div>
            <div>
              <label htmlFor="voc" className="block text-center">
                <InlineMath>{"V_{1}:"}</InlineMath>
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="voc"
                  onChange={handleVscChange}
                  className="w-full mr-2 p-1 mb-6 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <InlineMath>{"V"}</InlineMath>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 className="pt-2">Valor obtenido:</h5>
    

          <p style={{ color: "blue" }}>
            <BlockMath>
              {"R_{on} = \\frac{\\Delta I}{\\Delta V} = " + efficiency}
            </BlockMath>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 m-5">
          {/* Compute linear regresion button */}
          <button className="col-span-2 bg-inaoe hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Calcular regresión lineal
          </button>
        </div>
      </div>

      <div>
        <h5 className="pt-2">Valores obtenidos:</h5>
        <p style={{ color: "blue" }}>
          <BlockMath>{"V_{th} = " + fillFactor}</BlockMath>
        </p>
      </div>
    </>
  );
};

export default ComputeMosParams;

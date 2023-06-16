import React, { useRef, useState } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import the Katex CSS

const ComputeSCparams: React.FC = () => {
  const impRef = useRef<number>(0);
  const iscRef = useRef<number>(0);
  const vmpRef = useRef<number>(0);
  const vscRef = useRef<number>(0);

  const ffRef = useRef<number>(0);

  const [fillFactor, setFillFactorInner] = useState<string>("??");
  const [efficiency, setEfficiency] = useState<string>("??");

  const setFillFactor = (fillFactor: number) => {
    if (isNaN(fillFactor)) setFillFactorInner("??");
    else {
      const scientific = fillFactor.toExponential(2);
      if (scientific.includes("e")) {
        const [mantissa, exponent] = scientific.split("e");
        setFillFactorInner(mantissa + " \\times 10^{" + exponent + "}" + " A");
      } else
        setFillFactorInner(fillFactor.toFixed(2) + " A")
    };

    const plight = 0.00918; //Light power

    //Compute efficiency
    const efficiency = 
      ((fillFactor* iscRef.current * vscRef.current) / plight)*100;
    
    if (isNaN(efficiency)) setEfficiency("??");
    else {
      const scientific = efficiency.toExponential(2);
      if (scientific.includes("e")) {
        const [mantissa, exponent] = scientific.split("e");
        setEfficiency(mantissa + " \\times 10^{" + exponent + "}" + " \\%");
      } else
        setEfficiency(efficiency.toFixed(2) + " \\%")
    }
  };

  const handleImpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    impRef.current = Number(e.target.value);
    const fillFactor =
      (Number(e.target.value) * vmpRef.current) /
      (iscRef.current * vscRef.current);
    setFillFactor(fillFactor);
  };

  const handleIscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    iscRef.current = Number(e.target.value);
    const fillFactor =
      (impRef.current * vmpRef.current) /
      (Number(e.target.value) * vscRef.current);
    setFillFactor(fillFactor);
  };

  const handleVmpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    vmpRef.current = Number(e.target.value);
    const fillFactor =
      (impRef.current * Number(e.target.value)) /
      (iscRef.current * vscRef.current);
    setFillFactor(fillFactor);
  };

  const handleVscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    vscRef.current = Number(e.target.value);
    const fillFactor =
      (impRef.current * vmpRef.current) /
      (iscRef.current * Number(e.target.value));
    setFillFactor(fillFactor);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 m-5">
          <div>
            <label htmlFor="imp" className="block text-center">
              <InlineMath>{"I_{mp}:"}</InlineMath>
            </label>
            <div className="flex">
              <input
                type="number"
                id="imp"
                onChange={handleImpChange}
                className="w-full mr-2 p-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <InlineMath>{"I"}</InlineMath>
            </div>
          </div>
          <div>
            <label htmlFor="vmp" className="block text-center">
              <InlineMath>{"V_{mp}:"}</InlineMath>{" "}
            </label>
            <div className="flex">
              <input
                type="number"
                id="vmp"
                onChange={handleVmpChange}
                className="w-full mr-2 p-1 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <InlineMath>{"V"}</InlineMath>
            </div>
          </div>
          <div>
            <label htmlFor="isc" className="block text-center">
              <InlineMath>{"I_{sc}:"}</InlineMath>
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
              <InlineMath>{"V_{oc}:"}</InlineMath>
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
        <h5 className="pt-2">Valores obtenidos:</h5>
        <p>
          <BlockMath>
            {"FF = \\frac{I_{mp} \\cdot V_{mp}}{I_{sc} \\cdot V_{oc}} = " +
              fillFactor}
          </BlockMath>
        </p>

        <p style={{color:"blue"}}>
          <BlockMath>
            {"\\eta =  \\frac{FF \\cdot I_{sc} \\cdot V_{oc}}{P_{light}} = " +
              efficiency}
          </BlockMath>
        </p>
      </div>
    </>
  );
};

export default ComputeSCparams;

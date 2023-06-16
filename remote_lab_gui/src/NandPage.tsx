import { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import Header from "./Header";
import MeasureMenu from "./MeasureMenu";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Scale,
} from "chart.js";
import InputField from "./Layout/InputFieldNand";
import ComputeSCparams from "./ComputeNANDparams";
import useLogicGate from "./Hooks/useLogicGate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function downloadDatFile(data: number[], filename: string) {
  const tsvData = data.join("\t");
  const blob = new Blob([tsvData], { type: "text/tab-separated-values" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

const downloadTabDat = (ch1: number[], ch2: number[]) => {
  let result = "Señal A\tSeñal B\n";
  for (let i = 0; i < ch1.length; i++) {
    result += ch1[i] + "\t" + ch2[i] + "\n";
  }

  const blob = new Blob([result], { type: "text/tab-separated-values" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "NandData.dat";
  a.click();

  URL.revokeObjectURL(url);
};

export default () => {
  const [labels, setLabels] = useState<number[]>(
    Array.from({ length: 100 }, (_, i) => i / 10)
  );
  const [dataTest, setDataTest] = useState<number[]>(labels.map((x) => 0));
  const [dataTest2, setDataTest2] = useState<number[]>(labels.map((x) => 0));

  //Download the data
  const downloadData = () => {
    downloadDatFile(labels, "Voltaje.dat");
    downloadDatFile(dataTest, "Corriente.dat");
    downloadDatFile(dataTest2, "Potencia.dat");
  };

  //Generate random data for the graph
  const generateData = () => {
    setDataTest(labels.map((x) => getRandomNumber(0, 10)));
    setDataTest2(labels.map((x) => getRandomNumber(0, 10)));
  };

    const {
      signalAparams,
      signalBparams,
      signalA,
      signalB,
      signalOut,
      time,
      submit,
      errors,
    } = useLogicGate();

  //Get the data from the API
  const getData = () => {
    //Get API_URL + /solarCell/curveIV and extract from the response the data x and y
    fetch(API_URL + "/solarCell/curveIV").then((response) => {
      response.json().then((data) => {
        console.log("data");
        console.log(data);

        //Extract newLabels and newData from the response as floats
        const newLabel: number[] = data.x.map((x: any) => parseFloat(x));
        const newData: number[] = data.y.map((y: any) => parseFloat(y));

        console.log("newLabel");
        console.log(newLabel);
        console.log("newData");
        console.log(newData);

        //Multiply newData by newLabel
        const multipliedData = newData.map((y, i) =>{
          const temp = Math.abs(y * newLabel[i]);;
          if(temp > 0){
            return temp
          }else{
            return temp * -1; 
          }
        });

        setLabels(newLabel);
        setDataTest(newData);
        setDataTest2(multipliedData);
      });
    });
  };
  const data: ChartData<"line", number[]> = {
    labels,
    datasets: [
      {
        label: "A",
        fill: false,
        data: signalA,
        borderColor: "rgb(70, 108, 232)",
        backgroundColor: "rgba(70, 108, 232, 0.5)",
      },
      {
        label: "B",
        fill: false,
        data: dataTest,
        borderColor: "rgb(69, 43, 196)",
        backgroundColor: "rgba(69, 43, 196, 0.5)",
      },
      {
        label: "Salida",
        fill: false,
        data: signalOut,
        borderColor: "rgb(99, 158, 98)",
        backgroundColor: "rgba(99, 158, 98, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Señales de entrada/salida de compuerta NAND",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo (s)",
        },
        ticks: {
          distribution: "series",
          stepSize: 10,
          values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          beginAtZero: true,
          callback: function (value: any, index: number, values: any) {
            //Get label from the index
            const label: number = labels[index];
            console.log("label");
            console.log(label);
            console.log("value");
            console.log(value);

            return value % 10 === 0 ? label + "" : "";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Voltaje (V)",
        },
      },
    },
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto absolute w-screen w-100 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-100 to-gray-300">
      <div className="flex flex-row w-screen">
        <div className="w-3/5">
          <Line data={data} options={options} redraw />
        </div>
        <div className="w-2/5 ml-10">
          <InputField getData={submit} signalAparams={signalAparams} signalBparams={signalBparams} errors={errors}/>
        </div>
      </div>
      <div className="flex flex-row w-screen justify-center items-center">
        <div className="w-3/5 h-1/5 flex justify-evenly">
          <ComputeSCparams />
        </div>
        <div className="w-2/5 h-1/5">
          <MeasureMenu
            getData={function (): void {
              alert("No hay datos aún");
            }}
            genData={function (): void {
              alert("No hay datos aún");
            }}
            downloadData={function (): void {
              downloadTabDat(signalA,signalB)
            }}
          />
        </div>
      </div>
    </div>
  );
};

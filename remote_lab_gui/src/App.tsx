import "./App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  Scale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { SolarCellGraph } from "./SolarCellGraph";
import { useSolarCellData } from "./useSolarCellData";
import { useState } from "react";
import Header from "./Header";
import Switch from "./Switch";
import MeasureMenu from "./MeasureMenu";
import Auth from "./Auth";
import MenuW8 from "./MenuW8";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


  function downloadDatFile(data: number[], filename: string) {
      const tsvData = data.join("\t");
      const blob = new Blob([tsvData], { type: "text/tab-separated-values" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      URL.revokeObjectURL(url);
  }

export default function App() {

  //State of authentication
  const [isAuth, setIsAuth] = useState(false);

  return isAuth ? <SolarCellPage /> : <Auth setIsAuth={setIsAuth} />;
}



const SolarCellPage = () => {
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

  //Get the data from the API
  const getData = () => {
    //Get http://localhost:8000/solarCell/curveIV and extract from the response the data x and y
    fetch("http://localhost:8000/solarCell/curveIV").then((response) => {
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
        const multipliedData = newData.map((y, i) => y * newLabel[i]);

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
         label: "Corriente (A)",
         fill: false,
         data: dataTest,
         borderColor: "rgb(255, 99, 132)",
         backgroundColor: "rgba(255, 99, 132, 0.5)",
       },
       {
         fill: false,
         label: "Potencia (W)",
         data: dataTest2,
         borderColor: "rgb(53, 162, 235)",
         backgroundColor: "rgba(53, 162, 235, 0.5)",
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
         text: "Curva caracteristica de la celda solar",
       },
     },
     scales: {
       x: {
         title: {
           display: true,
           text: "Voltaje (V)",
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
           text: "Corriente (A)",
         },
       },
     },
   };
  return (
    <div className="pt-12 overflow-x-hidden overflow-y-auto pb-5 absolute w-screen h-screen  bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-100 to-gray-300">
      <Header />
      <div className="flex flex-row w-screen">
        <div className="w-screen">
          <Line data={data} options={options} redraw />
        </div>
        <div className="w-80 flex items-center justify-center">
          <MeasureMenu
            getData={getData}
            genData={generateData}
            downloadData={downloadData}
          />
        </div>
      </div>
    </div>
  );
};
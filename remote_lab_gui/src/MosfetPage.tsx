import { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
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
import InputField from "./Layout/InputField";
import ComputeSCparams from "./ComputeSCparams";
import ComputeMosParams from "./ComputeMosParams";
import InputFieldMos from "./Layout/InputFieldMos";
import zoomPlugin from "chartjs-plugin-zoom";
import Hammer from "hammerjs";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);
//ChartJS.pluginService.register(ChartZoomPlugin);


//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

//Boton eje logaritmico Y

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

//Trafer f. = Id Vgs (Curvas de transferencia)
//Output =  Id  Vds (linear a saturacion)

//Give an array of numbers, return string column
const downloadTabDat = (dataY: number[], dataX: number[]) => {
  let result = "Corriente\tVoltaje\n";
  for (let i = 0; i < dataY.length; i++) {
    result += dataY[i] + "\t" + dataX[i] + "\n";
  }

  const blob = new Blob([result], { type: "text/tab-separated-values" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "MosfetData.dat";
  a.click();

  URL.revokeObjectURL(url);
};

export default () => {
  const [labels, setLabels] = useState<number[]>(
    Array.from({ length: 100 }, (_, i) => i / 10)
  );
  const [dataTest, setDataTest] = useState<number[]>(labels.map((x) => 0));
  const [dataTest2, setDataTest2] = useState<number[]>(labels.map((x) => 0));

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Get the data from the API
  const getData = (
    vstart: number,
    vend: number,
    step: number,
    fixedVoltaje: number
  ) => {
    setIsLoading(!isLoading)
    return;
    
    //Get `${API_URL}/remote_lab/mosfet/curveIV` with
    fetch(
      API_URL +
        "/remote_lab/mosfet/curveIV?Vstart=" +
        vstart +
        "&Vend=" +
        vend +
        "&step=" +
        step +
        "&fixedVoltaje=" +
        fixedVoltaje
    ).then((response) => {
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
        //const multipliedData = newData.map((y, i) => y * newLabel[i]);

        setLabels(newLabel);
        setDataTest(newData);
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
        text: "Curva caracteristica de MOSFET",
      },
       zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          // drag:{
          //   enabled:true
          // },
          mode: "xy" as "xy",
          speed: 100
        },
        pan: {
          enabled: true,
          mode: "xy" as "xy",
          speed: 0.5
        }
      }
      
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
    }
  /*   pan: {
      enabled: true,
      mode: "xy",
      speed: 10,

    },
    zoom: {
      enabled: true,
      drag: false,
      mode: "xy",
      rangeMin: {
        x: 0,
        y: 0,
      },
      rangeMax: {
        x: 100,
        y: 100,
      },

    }, */
  };


  const [isOnTransfer, setIsOnTransfer] = useState<boolean>(true);

  return (
    <div className="overflow-x-hidden overflow-y-auto absolute w-screen w-100 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-100 to-gray-300">
      <div className="flex flex-row w-screen">
        <div className="w-3/5">
          {isLoading ? (
            <Line data={data} options={options} redraw />
          ) : (
            <>
              <div className="flex justify-center items-center h-96">
                <button
                  onClick={() => {
                    alert("hola");
                  }}
                  className="z-20 w-16 h-16 text-white bg-inaoe rounded-full mx-auto bottom-10 right-10 flex items-center justify-center cursor-pointer"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 absolute border-b-2 border-inaoe"></div>
              </div>
            </>
          )}
        </div>
        <div className="w-2/5 ml-10">
          <InputFieldMos
            getData={getData}
            isOnTransfer={isOnTransfer}
            setIsOnTransfer={setIsOnTransfer}
          />
        </div>
      </div>
      <div className="flex flex-row w-screen items-center">
        <div className="w-3/5 h-1/5 flex justify-evenly">
          <ComputeMosParams isOnTransfer={isOnTransfer} />
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
              downloadTabDat(dataTest, labels);
            }}
          />
        </div>
      </div>
    </div>
  );
};

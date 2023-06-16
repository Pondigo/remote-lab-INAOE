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
import InputField from "./Layout/InputField";
import ComputeSCparams from "./ComputeSCparams";

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

function getDatContent(
  Voltage: number[],
  Current: number[],
  Power: number[]
): string {
  let datContent = `# Datos celda solar\n`;
  datContent += `Voltaje: ${Voltage.join(",")}\n`;
  datContent += `Corriente: ${Current.join(",")}\n`;
  datContent += `Potencia: ${Power.join(",")}\n`;
  return datContent;
}

const downloadTabDat = (voltaje: number[], corriente: number[], potencia: number[]) => {
  let result = "Voltaje\tCorriente\tPotencia\n";
  for (let i = 0; i < voltaje.length; i++) {
    result += voltaje[i] + "\t" + corriente[i] + "\t" + potencia[i] + "\n";
  }
  const blob = new Blob([result], { type: "text/tab-separated-values" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "SolarCellData.dat";
  a.click();

  URL.revokeObjectURL(url);
};

export const SolarCellPage = () => {
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
  const getData = (vstart:number, vend: number, step: number) => {
    //Get API_URL + /solarCell/curveIV and extract from the response the data x and y
    //With vstart, vend and step as parameters
    fetch(
      `${API_URL}/remote_lab/solar_cell/curveIV?vstart=${vstart}&vend=${vend}&step=${step}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLabels(data.x);
        setDataTest(data.y);
        setDataTest2(data.y.map((x: number, i: number) => x * data.x[i]));
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
        borderColor: "rgb(128, 0, 128, 0.5)",
        backgroundColor: "rgba(128, 0, 128, 0.5)",
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
        /*     console.log("label");
            console.log(label);
            console.log("value");
            console.log(value); */

            return value % 10 === 0 ? label.toFixed(2) : "";
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
    <div className="overflow-x-hidden overflow-y-auto absolute w-screen w-100 bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-100 to-gray-300">
      <div className="flex flex-row w-screen">
        <div className="w-3/5">
          <Line data={data} options={options} redraw />
        </div>
        <div className="w-2/5 ml-10">
          <InputField getData ={getData}/>
        </div>
      </div>
      <div className="flex flex-row w-screen">
        <div className="w-3/5 h-1/5 flex justify-evenly">
          <ComputeSCparams />
        </div>
        <div className="w-2/5 h-1/5">
          <MeasureMenu
            getData={function (): void {
              const datContent = getDatContent(
                labels,
                dataTest,
                dataTest2
              );
              //Copy the content to the clipboard
              navigator.clipboard.writeText(datContent);
              //Show a message
              alert("Datos copiados al portapapeles");
            }}
            genData={function (): void {
                 const datContent = getDatContent(labels, dataTest, dataTest2);
                 //Copy the content to the clipboard
                 navigator.clipboard.writeText(datContent);
                 //Show a message
                 alert("Datos copiados al portapapeles");
            }}
            downloadData={function (): void {
              /* //Generate the content of the dat file
              const datContent = getDatContent( 
                labels,
                dataTest,
                dataTest2
              );
              //Create a blob with the content
              const blob = new Blob([datContent], { type: "text/plain" });
              //Create a URL with the blob
              const url = URL.createObjectURL(blob);

              //Create a link element
              const a = document.createElement("a");

              //Set the link element href to the URL
              a.href = url;
              //Set the link element download to the filename
              a.download = "Datos.dat";
              //Simulate a click on the link element
              a.click();

              //Revoke the URL to avoid memory leaks
              URL.revokeObjectURL(url); */

              downloadTabDat(labels, dataTest, dataTest2);

            }}
          />
        </div>
      </div>
    </div>
  );
};

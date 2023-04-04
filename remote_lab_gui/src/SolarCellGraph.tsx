import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";

const generateRandomData = (length: number) => {
  const data = [];
  const labels = [];
  for (let i = 1; i <= length; i++) {
    data.push(Math.floor(Math.random() * 10) + 1);
    labels.push(i);
  }
  return { data, labels };
};

export const SolarCellGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState(generateRandomData(4));

  useEffect(() => {
    if (canvasRef.current) {
      const myChart = new Chart(canvasRef.current, {
        type: "line",

        
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Dataset 1",
              data: chartData.data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            x: {
              beginAtZero: true,
              stacked: true,
              ticks: {
                stepSize: 2,
                callback: function (value: any, index: any, values: any) {
                    return value;
                    },
              },

            },
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [chartData]);

  const handleGenerateData = () => {
    const newData = generateRandomData(4);
    setChartData(newData);
  };

  return (
    <>
      <canvas ref={canvasRef} />
      <button onClick={handleGenerateData}>Generate Data</button>
    </>
  );
};

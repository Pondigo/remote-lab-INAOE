import { useState } from "react";

type DataCharacterization = {
  x: number[];
  y: number[];
};
export type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};
const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

    const generateDataInner = (lengthPrev: number) => {
        const labels = Array.from({ length: 100 }, (_, i) => i / 10);
        //Declare an array of random numbers with the double length as the labels array
        const dataTest = labels.map(() => getRandomNumber(-1000, 1000));
        //Declare an Dataset
        const dataset: Dataset = {
          label: "Dataset " + lengthPrev,
          data: dataTest,
          borderColor:
            "rgb(" +
            getRandomNumber(0, 255) +
            "," +
            getRandomNumber(0, 255) +
            "," +
            getRandomNumber(0, 255) +
            ")",
          backgroundColor:
            "rgba(" +
            getRandomNumber(0, 255) +
            "," +
            getRandomNumber(0, 255) +
            "," +
            getRandomNumber(0, 255) +
            ", 0.5)",
        };
        return { labels, dataset };
    };

export const useSolarCellData = () => {
    //I
    //Declare the state for the datasets
    const [datasets, setDatasets] = useState<Dataset[]>([generateDataInner(0).dataset]);
    //Declare the state for the labels
    const [labels, setLabels] = useState<number[]>(generateDataInner(0).labels);





    //Declare a function to generate the data and update the states
    const generateData = () => {
        const { labels, dataset } = generateDataInner(datasets.length + 1);
        setDatasets([...datasets, dataset]);
        setLabels(labels);
    };

    
    return {
        datasets,
        labels,
        generateData,        
    };
};

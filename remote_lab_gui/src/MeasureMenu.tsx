import React from "react";
import { useState } from "react";

function InputText() {
  return (
    <label htmlFor="medida" className="font-bold mb-5 text-center">
      Ingrese la medida:
    </label>
  );
}

function MeasureMenu(props: {
  getData: () => void;
  genData: () => void;
  downloadData: () => void;
}) {
  //Declare typescript onSubmit event handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.getData();
  };

  const handleGenData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.genData();
  };

  const handleDownload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.downloadData();
    };
    

  return (
    <div className="relative bg-gray-400 bg-opacity-25 rounded-lg p-5 ">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center"
        >
          Obtener datos
        </button>
      </form>
      <br />
      <form className="flex flex-col" onSubmit={handleGenData}>
        <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center"
        >
          Generar datos
        </button>
      </form>
      <br />
      <form className="flex flex-col" onSubmit={handleDownload}>
        <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 flex items-center justify-center"
        >
          Descargar datos
        </button>
      </form>
    </div>
  );
}

export default MeasureMenu;

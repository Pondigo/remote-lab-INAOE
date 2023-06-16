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
    <div className="mx-10 px-10 rounded-lg p-5 ">
      <br />
      <form className="flex flex-col" onSubmit={handleGenData}>
        <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 text-xs flex items-center justify-center"
        >
          Copiar datos
        </button>
      </form>
      <br />
      <form className="flex flex-col" onSubmit={handleDownload}>
        <button
          type="submit"
          className="bg-inaoe text-white border-none rounded-md p-2 text-xs flex items-center justify-center"
        >
          Descargar datos
        </button>
      </form>
    </div>
  );
}

export default MeasureMenu;

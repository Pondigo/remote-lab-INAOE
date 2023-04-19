import React, { useState } from "react";
import Inaoe from "./vectors/inaoe-logo.svg";
import { InaoeLogo } from "../icons/InaoeLogo";
import axios from "axios";

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  // Create state variable for error message
  const [errorMessage, setErrorMessage] = useState("");

  //Handle submit auth form
  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(" ");
    const user = (document.getElementById("user-input") as HTMLInputElement).value;
    const password = (document.getElementById("password-input") as HTMLInputElement).value;
    //Get request auth to the API (Axios)
    axios.post(`${API_URL}/auth`, { user, password })
      .then((res) => {
        //Get token from headers
        const token = res.headers["auth-token"];
        console.log("token", token);
        //Save token in localStorage
        localStorage.setItem("authToken", token);
        //Reload page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // Set error message on failed authentication
        setErrorMessage("Verifique sus credenciales e intente de nuevo");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-md shadow-md p-8 flex flex-col items-center">
        <InaoeLogo />
        <h1 className="text-2xl font-bold text-inaoe pt-5">Iniciar sesion</h1>
        <h2 className="text-sm text-gray-500 mb-8">Laboratorio remoto</h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form className="flex flex-col items-center" onSubmit={handleAuth}>
          <input
            id="user-input"
            type="text"
            placeholder="Usuario"
            className="bg-gray-200 border-none rounded-md p-4 mb-4 w-full"
            required
          />
          <input
            id="password-input"
            type="password"
            placeholder="Password"
            className="bg-gray-200 border-none rounded-md p-4 mb-8 w-full"
            required
          />

          <button
            className="bg-inaoe text-white rounded-md py-4 px-6 font-bold text-sm uppercase tracking-wide"
            type="submit"
          >
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

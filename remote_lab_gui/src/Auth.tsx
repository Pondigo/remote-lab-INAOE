import React, {Dispatch, SetStateAction} from "react";
import Inaoe from "./vectors/inaoe-logo.svg";
import { InaoeLogo } from "./InaoeLogo";

//Handle submit
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const Login = (props:{setIsAuth: Dispatch<SetStateAction<boolean>>}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-md shadow-md p-8 flex flex-col items-center">
        <InaoeLogo />
        <h1 className="text-2xl font-bold text-inaoe pt-5">Iniciar sesion</h1>
        <h2 className="text-sm text-gray-500 mb-8">Laboratorio remoto</h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            className="bg-gray-200 border-none rounded-md p-4 mb-4 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-200 border-none rounded-md p-4 mb-8 w-full"
            required
          />

          <button
          onClick={() => {props.setIsAuth(true)}}
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

import { useState } from "react";
import useSquareSignal, { useSquareSignal as IUseSquareSignal } from "./useSquareSignal";
import axios from "axios";

//Get API_URL from .env
const API_URL = process.env.REACT_APP_API_URL;

//Check if the API_URL is defined
if (!API_URL) throw new Error("REACT_APP_API_URL is not defined");

export interface useLogicGate {
  signalAparams: IUseSquareSignal;
  signalBparams: IUseSquareSignal;

  signalA: number[];
  signalB: number[];
  signalOut: number[];
  time: number[];

  submit: () => Promise<void>;
  errors?: {
    signalA?: string;
    signalB?: string;
  };
}

export default function useLogicGate(): useLogicGate {
    const signalAparams = useSquareSignal();
    const signalBparams = useSquareSignal();

    const [signalA, setSignalA] = useState<number[]>([]);
    const [signalB, setSignalB] = useState<number[]>([]);
    const [signalOut, setSignalOut] = useState<number[]>([]);
    const [time, setTime] = useState<number[]>([]);
    const [errors, setErrors] = useState({});

    const submit = async () => {
        //Validate signals
        if (!signalAparams.validate() || !signalBparams.validate()) {
            alert("Error en los parametros de las señales");
            return;
        }
        //If Signal B have a higher period than Signal A
        if (signalBparams.period > signalAparams.period) {
            alert("La señal B no puede tener un periodo mayor a la señal A");
            return;
        }
        //Send signals to api in params
        const res = await axios.get(
          API_URL + "/remote_lab/logic_gate/logicTest",
          {
            params: {
              frec1: signalAparams.frequency,
              vpp1: signalAparams.voltagePeakToPeak,
              dutyCicle1: signalAparams.dutyCycle,
              frec2: signalBparams.frequency,
              vpp2: signalBparams.voltagePeakToPeak,
              dutyCicle2: signalBparams.dutyCycle,
            },
          }
        );
        //Set signals from api response
        setSignalA(res.data.ch1);
        setSignalB(res.data.signalB);
        setSignalOut(res.data.ch2);
        setTime(res.data.time);
    };

    return {
        signalAparams,
        signalBparams,
        signalA,
        signalB,
        signalOut,
        time,
        submit,
        errors,
    };
}
    


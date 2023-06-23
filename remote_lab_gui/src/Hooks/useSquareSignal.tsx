import { useState, useEffect } from 'react';

export interface useSquareSignal {
    frequency: number;
    period: number;
    pulseWidth: number;
    dutyCycle: number;
    voltagePeakToPeak: number;
    handleFrequencyChange: (newFrecuency: number) => void;
    handlePeriodChange: (newPeriod: number) => void;
    handlePulseWidthChange: (newPulseWidth: number) => void;
    handleDutyCycleChange: (newDutyCycle: number) => void;
    handleVoltagePeakToPeakChange: (newVoltagePeakToPeak: number) => void;
    errors: {
        frecuency?: string;
        period?: string;
        pulseWidth?: string;
        dutyCycle?: string;
        voltagePeakToPeak?: string;
    };
    validate: () => boolean;
}


export default function useSquareSignal(): useSquareSignal {
    const [frequency, setFrequency] = useState<number>(0);
    const [period, setPeriod] = useState<number>(0);
    const [pulseWidth, setPulseWidth] = useState<number>(0);
    const [dutyCycle, setDutyCycle] = useState<number>(0);
    const [voltagePeakToPeak, setVoltagePeakToPeak] = useState<number>(0);
    const [errors, setErrors] = useState({});

    const validateFrecuency = (newFrequency: number) => {
        //Check if newFrequency < 1000 and > 0
        if (newFrequency < 0 || newFrequency > 1000) {
            setErrors({frecuency: "La frecuencia debe estar entre 0 y 1000"});
            //Remove error after 10 seconds
            setTimeout(() => {
                setErrors((errors) => {
                    return {...errors, frecuency: undefined};
                });
            }, 10000);
            return false;
        }
        return true;
    }

    function handleFrequencyChange (newFrequency: number) {
        //Check if newFrequency < 1000 and > 0
        if (!validateFrecuency(newFrequency)) return;
        setFrequency(newFrequency);
        setPeriod(1 / newFrequency);
        setPulseWidth((dutyCycle / 100) * (1 / newFrequency));
    }

    const validatePeriod = (newPeriod: number) => {
        //Check if the calculated frequency is < 1000 and > 0
        if (1 / newPeriod < 0 || 1 / newPeriod > 1000) {
            setErrors({period: "La frecuencia debe estar entre 0 y 1000"});
            //Remove error after 10 seconds
            setTimeout(() => {
                setErrors((errors) => {
                    return {...errors, period: undefined};
                });
            }, 10000);
            return false;
        }
        return true;
    }

    function handlePeriodChange (newPeriod: number) {
        //Check if the calculated frequency is < 1000 and > 0
        if (!validatePeriod(newPeriod)) return;
        setPeriod(newPeriod);
        setFrequency(1 / newPeriod);
        setPulseWidth((dutyCycle / 100) * newPeriod);
    }

    const validatePulseWidth = (newPulseWidth: number) => {
        //Check if newPulseWidth < period and > 0
        if (newPulseWidth < 0 || newPulseWidth >= period) {
            setErrors({pulseWidth: "El ancho del pulso debe ser mayor a 0 y menor al periodo"});
            //Remove error after 10 seconds
            setTimeout(() => {
                setErrors((errors) => {
                    return {...errors, pulseWidth: undefined};
                });
            }, 10000);
            return false;
        }
        return true;
    }


    function handlePulseWidthChange (newPulseWidth: number) {
        //Check if newPulseWidth < period and > 0
        if (!validatePulseWidth(newPulseWidth)) return;
        setPulseWidth(newPulseWidth);
        setDutyCycle((newPulseWidth / period) * 100);
    }

    const validateDutyCycle = (newDutyCycle: number) => {
        //Check if newDutyCycle < 100 and > 0
        if (newDutyCycle < 0 || newDutyCycle >= 100) {
            setErrors({dutyCycle: "El ciclo de trabajo debe ser mayor a 0 y menor a 100"});
            //Remove error after 10 seconds
            setTimeout(() => {
                setErrors((errors) => {
                    return {...errors, dutyCycle: undefined};
                });
            }, 10000);
            return false;
        }
        return true;
    }
    
    function handleDutyCycleChange (newDutyCycle: number) {
        //Check if newDutyCycle < 100 and > 0
        if (!validateDutyCycle(newDutyCycle)) return;
        setDutyCycle(newDutyCycle);
        setPulseWidth((newDutyCycle / 100) * period);
    }

    const validateVoltagePeakToPeak = (newVoltagePeakToPeak: number) => {
        //Max voltagePeakToPeak is 10
        if (newVoltagePeakToPeak < 0 || newVoltagePeakToPeak >= 10) {
            setErrors({voltagePeakToPeak: "El voltaje pico a pico debe ser mayor a 0 y menor a 10"});
            //Remove error after 10 seconds
            setTimeout(() => {
                setErrors((errors) => {
                    return {...errors, voltagePeakToPeak: undefined};
                });
            }, 10000);
            return false;
        }
        return true;
    }

    function handleVoltagePeakToPeakChange (newVoltagePeakToPeak: number) {
        //Max voltagePeakToPeak is 10
        if (!validateVoltagePeakToPeak(newVoltagePeakToPeak)) return;
        setVoltagePeakToPeak(newVoltagePeakToPeak);
    }

    function validate() {
        return validateFrecuency(frequency) && validatePeriod(period) && validatePulseWidth(pulseWidth) && validateDutyCycle(dutyCycle) && validateVoltagePeakToPeak(voltagePeakToPeak);
    }

    return {
        frequency,
        period,
        pulseWidth,
        dutyCycle,
        voltagePeakToPeak,
        handleFrequencyChange,
        handlePeriodChange,
        handlePulseWidthChange,
        handleDutyCycleChange,
        handleVoltagePeakToPeakChange,
        errors,
        validate
    };
    
}
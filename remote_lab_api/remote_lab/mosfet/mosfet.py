from fastapi import APIRouter
import matplotlib.pyplot as plt
import os
from pyvisa import ResourceManager
from pydantic import BaseModel

rm = ResourceManager()

router = APIRouter()


@router.get("/")
async def read_mosfet():
    return {"message": "MOSFET sub-API!"}

@router.get("/matrixSwith")
async def matrix_swith(switch: bool):
    #Print divider  
    print("--------------------------------------------------")
    if switch:
        print("Matrix setted to forward transfer")
    else:
        print("Matrix setted to characteristic output")
    print("--------------------------------------------------")

    return {"swith": switch}


def swipe_svmc_k2460(Lower_range, Upper_range, Definition, V_range, I_lim, smu):
    waitTime = 0.5
    NSamples = (Upper_range - (Lower_range))/Definition
    smu.write("*RST")
    smu.write('SENS:FUNC "CURR"')
    smu.write("SENS:CURR:RANG:AUTO ON")
    smu.write("SENS:CURR:RSEN ON")
    smu.write("SOUR:FUNC VOLT")
    smu.write("SOUR:VOLT:RANG " + str(V_range))
    smu.write("SOUR:VOLT:ILIM " + str(I_lim))
    smu.write("SOUR:SWE:VOLT:LIN " + str(Lower_range) + ", " +
              str(Upper_range + Definition) + ", " + str(NSamples) + " , " + str(waitTime))
    smu.write(":INIT")
    smu.write("*WAI")

    #Query data 'TRAC:DATA? 1, '+ (NSamples + "") +', "defbuffer1", SOUR, READ'
    data = smu.query('TRAC:DATA? 1, ' + (str(NSamples) + "") +
                     ', "defbuffer1", SOUR, READ')
    return data


def k2460_readBufferParser(read):
    #Split data
    data = read.split(',')
    #Convert to float
    data = [float(i) for i in data]
    #Split data into two lists (voltage and current / even and odd)
    voltage = data[::2]
    current = data[1::2]
    return voltage, current


@router.get("/curveIV")
async def get_curve_iv(Vstart: float, Vend: float, step: float, fixedVoltaje:float):

    Lower_range = Vstart
    Upper_range = Vend
    Definition = step
    #TODO: Alerta min - max (current-voltage)
    V_range = 11
    I_lim = 0.08
    #Print divider
    print("--------------------------------------------------")
    #Print requested curve
    print("Solar Cell IV Curve requested: ")
    print("------------")
    print("Lower range: " + str(Lower_range))
    print("Upper range: " + str(Upper_range))
    print("Definition: " + str(Definition))
    print("V range: " + str(V_range))
    print("I limit: " + str(I_lim))
    print("Fixed Voltage: " + str(fixedVoltaje))
    #Print divider
    print("--------------------------------------------------")

    #Remove old graph if exists
    if os.path.exists('graph.png'):
        os.remove('graph.png')

    #return {"x": [1,2,3,4,5,6,7,8,9,10], "y": [1,2,3,4,5,6,7,8,9,10]}

    #Get SMU
    smu = rm.open_resource('USB0::0x05E6::0x2450::04534114::INSTR')
    #Set SMU timeouts as 20 minutes
    smu.timeout = 1200000 * .5

    print("Swipe")
    read = swipe_svmc_k2460(Lower_range, Upper_range,
                            Definition, 11, 0.08, smu)

    print(read)
    parsedRead = k2460_readBufferParser(read)

    #Graph data
    plt.plot(parsedRead[0], parsedRead[1])
    #Save graph and open it
    plt.savefig('graph.png')
    #Open graph
    os.system('graph.png')

    return {"x": parsedRead[0], "y": parsedRead[1]}



   # return {"Vstart": Vstart, "Vend": Vend, "Step": step, "Fixed voltage": fixedVoltaje}

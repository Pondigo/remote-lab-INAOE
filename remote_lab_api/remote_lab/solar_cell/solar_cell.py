import csv
import os
import time
from fastapi import APIRouter
from pyvisa import ResourceManager
import requests
import matplotlib.pyplot as plt

from pydantic import BaseModel
rm = ResourceManager()


router = APIRouter()

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


class SwipeP(BaseModel):
    vstart: float
    vend: float
    step: float

@router.get("/lightChange")
async def light_change(ligth: bool):
    if ligth:
        print("Ligth on")
    else:
        print("Ligth off")

    return {"ligth": ligth}  


@router.get("/curveIV")
async def get_curve_iv(vstart: float, vend: float, step: float):
    api_url = f"./remote_lab/solarCell/curveIV?vstart={vstart}&vend={vend}&step={step}"
    #Lower_range, Upper_range, Definition, V_range, I_lim, smu
    Lower_range = vstart
    Upper_range = vend
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
    #Print divider
    print("--------------------------------------------------")

    #xTest = [1,2,3,4,5,6,7,8,9,10]
   # yTest = [1,2,3,4,5,6,7,8,9,10]

    #Remove old graph if exists
    if os.path.exists('graph.png'):
        os.remove('graph.png')

    

    #return {"x": [1,2,3,4,5,6,7,8,9,10], "y": [1,2,3,4,5,6,7,8,9,10]}

    #Get SMU
    smu = rm.open_resource('USB0::0x05E6::0x2450::04534114::INSTR')
    #Set SMU timeouts as 20 minutes
    smu.timeout = 1200000 * .5
    
    print("Swipe")
    read = swipe_svmc_k2460(Lower_range, Upper_range,Definition, 11, 0.08, smu)

    print(read)
    parsedRead = k2460_readBufferParser(read)   

    #Graph data
    plt.plot(parsedRead[0], parsedRead[1])
    #Save graph and open it
    plt.savefig('graph.png')
    #Open graph
    os.system('graph.png')

    return {"x": parsedRead[0], "y": parsedRead[1]}


@router.get("/fake/curveIV")
async def get_curveIV():
    with open('Mediciones con luz.csv') as csvfile:
        data = csv.reader(csvfile, delimiter=',')
        x = []
        y = []
        for row in data:
            x.append(row[0])
            y.append(row[1])

    # Remove first element of each array
    x.pop(0)
    y.pop(0)
    # Parse arrays to float
    x = [float(i) for i in x]
    y = [float(i) for i in y]

    #Wait 1 second
    time.sleep(8)

    return {"x": x, "y": y}

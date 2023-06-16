from fastapi import APIRouter
from pyvisa import ResourceManager
import matplotlib.pyplot as plt

router = APIRouter()
rm = ResourceManager()
#Get available resources
available_resources = rm.list_resources()

#Get AWG device
#awg = rm.open_resource("USB0::0x0699::0x0353::2152273::INSTR")
#Get OSC device
#osc = rm.open_resource("USB0::0x0699::0x03C4::C010900::INSTR")

#Reset OSC
#osc.write("*RST")

#Set OSC timeout as 20
#osc.timeout = 20000
#osc.write("HORIZONTAL:MAIN:SCALE 1")
#osc.write("CH1:SCALE 5")
#osc.write("CH2:SCALE 5")

""" @router.get("/test")
async def test_logic_gate(frec1: float, vpp1: float, dutyCicle1, frec2:float, vpp2:float, dutyCicle2:float): """

@router.get("/logicTest")
async def test_logic_gate(frec1: float, vpp1: float, dutyCicle1, frec2:float, vpp2:float, dutyCicle2:float):
    #Print divider
    print("--------------------------------------------------")
    #Print signal 1
    print("Signal 1: ")
    print("------------")
    print("Frequency: " + str(frec1))
    print("Vpp: " + str(vpp1))
    print("Duty cicle: " + str(dutyCicle1))
    #Print signal 2
    print("Signal 2: ")
    print("------------")
    print("Frequency: " + str(frec2))
    print("Vpp: " + str(vpp2))
    print("Duty cicle: " + str(dutyCicle2))
    print("--------------------------------------------------")

    #Return 200 for test
    #return {"status": 200}

    #Get AWG device
    awg = rm.open_resource("USB0::0x0699::0x0353::2152273::INSTR")
    #Get OSC device
    osc = rm.open_resource("USB0::0x0699::0x03C4::C010900::INSTR")

    #Reset devices
    awg.write("*RST")
    osc.write("*RST")

    #Set devices timeouts as 20
    awg.timeout = 20000
    osc.timeout = 20000

    #Set oscilloscope scale
    osc.write("HORIZONTAL:MAIN:SCALE 1")
    osc.write("CH1:SCALE 5")
    osc.write("CH2:SCALE 5")

    #Set AWG signals
    #Shape
    awg.write("SOURce1:FUNCtion:SHAPe SQUare")
    awg.write("SOURce2:FUNCtion:SHAPe SQUare")
    #Frequency
    awg.write("SOURce1:FREQuency:FIXed " + str(frec1) + "Hz")
    awg.write("SOURce2:FREQuency:FIXed " + str(frec2) + "Hz")
    #Vpp in terms of offset and amplitude 
    Offset1 = vpp1/2
    awg.write("SOURce1:VOLTage:LEVel:IMMediate:OFFSet " + str(Offset1) + "V") 
    awg.write("SOURce1:VOLTage:LEVel:IMMediate:AMPLitude " + str(vpp1) + "Vpp")
    Offset2 = vpp2/2
    awg.write("SOURce2:VOLTage:LEVel:IMMediate:OFFSet " + str(Offset2) + "V")
    awg.write("SOURce2:VOLTage:LEVel:IMMediate:AMPLitude " + str(vpp2) + "Vpp")

    #Set AWG duty cicle
    awg.write("SOURce1:PULSe:DCYCle " + str(dutyCicle1))
    awg.write("SOURce2:PULSe:DCYCle " + str(dutyCicle2))

    #Set oscilloscope
    osc.write("SELECT:CH1 ON;CH2 ON")
    osc.write("DATA:ENCDG RIBINARY")
    osc.write("ACQUIRE:MODE SAMPLE")
    osc.write("ACQUIRE:STOPAFTER SEQUENCE")
    osc.write("HORIZONTAL:MAIN:SCALE 1")

    osc.write("ACQUIRE:STATE ON")
    osc.write("MEASUREMENT:IMMED:TYPE AMPLITUDE")
    osc.write("MEASUREMENT:IMMED:SOURCE CH1")
    #Set AWG output
    awg.write("OUTPut1:STATe ON;OUTPut2:STATe ON")

    #Wait for osc to be ready
    print("Waiting for osc to be ready...")
    #wait scpi
    osc.write("*WAI")
    #wait opc
    #await osc.query("*OPC?")
    print("Osc ready!")

    #Get channel 1 data CURVE?
    osc.write("DATA:SOURCE CH1")
    ch1 = osc.query_binary_values("CURVE?", datatype='B', is_big_endian=True)

    #Get channel 2 data CURVE?
    osc.write("DATA:SOURCE CH2")
    ch2 = osc.query_binary_values("CURVE?", datatype='B', is_big_endian=True)

    #Set AWG output off
    awg.write("OUTPut1:STATe OFF;OUTPut2:STATe OFF")

    #Close devices
    awg.close()
    osc.close()

    print("ch1: ", ch1)
    print("ch2: ", ch2)

    #Plot channel 1 data
    plt.plot(ch1)
    plt.ylabel('Amplitude')
    plt.xlabel('Time')
    plt.title('Channel 1')
    plt.show()

    #Return data
    return {"ch1": ch1, "ch2": ch2}

@router.get("/")
async def read_logic_gate():
    #Print available resources with their info (IDN)
    """ osc.write("SELECT:CH1 ON;CH2 ON")
    osc.write("DATA:ENCDG RIBINARY")
    awg.write("SOURce1:FUNCtion:SHAPe SQUare")
    awg.write("SOURce2:FUNCtion:SHAPe SQUare")
    awg.write("SOURce1:FREQuency:FIXed 0.2Hz")
    awg.write("SOURce2:FREQuency:FIXed 0.4Hz")

    awg.write("OUTPut1:STATe ON;OUTPut2:STATe ON") """
    res = waitOsc()
    print("res: ", res)
    #awg.write("OUTPut1:STATe OFF;OUTPut2:STATe OFF")

    return res

#Define waitOsc function
def waitOsc():
    #Wait for osc to be ready
    print("Waiting for osc to be ready...")
    return getCh1()

def getCh1():
    #osc.write("DATA:SOURCE CH1")
    #Get channel 1 data CURVE?
    #ch1 = osc.query_binary_values("CURVE?", datatype='B', is_big_endian=True)
    ch1 = [1,2,3,4,5,6,7,8,9,10]

    #print("ch1: ", ch1)
    return ch1
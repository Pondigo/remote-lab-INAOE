from fastapi import APIRouter
from pyvisa import ResourceManager

router = APIRouter()
rm = ResourceManager()
#Get available resources
available_resources = rm.list_resources()

#Get AWG device
awg = rm.open_resource("USB0::0x0699::0x0353::2152273::INSTR")
#Get OSC device
osc = rm.open_resource("USB0::0x0699::0x03C4::C010900::INSTR")

#Reset OSC
osc.write("*RST")

#Set OSC timeout as 20
osc.timeout = 20000
osc.write("HORIZONTAL:MAIN:SCALE 1")
osc.write("CH1:SCALE 5")
osc.write("CH2:SCALE 5")



@router.get("/")
async def read_logic_gate():
    #Print available resources with their info (IDN)
    osc.write("SELECT:CH1 ON;CH2 ON")
    osc.write("DATA:ENCDG RIBINARY")
    awg.write("SOURce1:FUNCtion:SHAPe SQUare")
    awg.write("SOURce2:FUNCtion:SHAPe SQUare")
    awg.write("SOURce1:FREQuency:FIXed 0.2Hz")
    awg.write("SOURce2:FREQuency:FIXed 0.4Hz")


    awg.write("OUTPut1:STATe ON;OUTPut2:STATe ON")
    res = waitOsc()
    print("res: ", res)
    awg.write("OUTPut1:STATe OFF;OUTPut2:STATe OFF")

    return res

#Define waitOsc function
def waitOsc():
    osc.write("ACQUIRE:STATE OFF")
    osc.write("SELECT:CH1 ON")
    osc.write("ACQUIRE:MODE SAMPLE")
    osc.write("ACQUIRE:STOPAFTER SEQUENCE")
    osc.write("ACQUIRE:STATE ON")
    osc.write("MEASUREMENT:IMMED:TYPE AMPLITUDE")
    osc.write("MEASUREMENT:IMMED:SOURCE CH1")
    osc.write("*WAI")
    return getCh1()




def getCh1():
    osc.write("DATA:SOURCE CH1")
    #Get channel 1 data CURVE?
    ch1 = osc.query_binary_values("CURVE?", datatype='B', is_big_endian=True)

    #print("ch1: ", ch1)
    return ch1


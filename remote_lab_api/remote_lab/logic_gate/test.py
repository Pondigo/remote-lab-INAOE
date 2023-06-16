from pyvisa import ResourceManager
rm = ResourceManager()
#Get SMU
smu = rm.open_resource('USB0::0x05E6::0x2450::04534114::INSTR')
#Set SMU timeouts as 20 minutes
smu.timeout = 1200000

#Define swipe_svmc_k2460
def swipe_svmc_k2460(Lower_range, Upper_range, Definition, V_range, I_lim):
    waitTime = 1e-3
    NSamples = (Upper_range - (Lower_range))/Definition
    smu.write("*RST")
    smu.write('SENS:FUNC "CURR"')
    smu.write("SENS:CURR:RANG:AUTO ON")
    smu.write("SENS:CURR:RSEN ON")
    smu.write("SOUR:FUNC VOLT")
    smu.write("SOUR:VOLT:RANG " + str(V_range))
    smu.write("SOUR:VOLT:ILIM " + str(I_lim))
    smu.write("SOUR:SWE:VOLT:LIN " + str(Lower_range) + ", " + str(Upper_range + Definition) + ", " + str(NSamples) + " , " + str(waitTime))
    smu.write(":INIT")
    smu.write("*WAI")

    #Query data 'TRAC:DATA? 1, '+ (NSamples + "") +', "defbuffer1", SOUR, READ'
    data = smu.query('TRAC:DATA? 1, '+ (str(NSamples) + "") +', "defbuffer1", SOUR, READ')
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
 
read = swipe_svmc_k2460(0, 0.6, 0.1, 11, 0.007)
parsedRead = k2460_readBufferParser(read)
print(parsedRead)

#Graph data
import matplotlib.pyplot as plt

plt.plot(parsedRead[0], parsedRead[1])
plt.show()

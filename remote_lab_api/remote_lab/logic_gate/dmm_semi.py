from pyvisa import ResourceManager
from numpy import arange

rm = ResourceManager()
#Get DMM
DMM = rm.open_resource("USB0::0x05E6::0x6500::04534317::0::INSTR")

resolution = arange(0, 10, 0.1)
result = []
for i in resolution:
    input("Press Enter on "+ str(i)+" v")
    result.append(DMM.query(":READ?"))
        
#Save data
with open("data.txt", "w") as f:
    f.write(','.join(result))
    



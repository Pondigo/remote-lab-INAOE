from pyvisa import ResourceManager
rm = ResourceManager()
#Print list
print(rm.list_resources())
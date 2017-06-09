#!/usr/bin/python

import getDeviceNames

rv = getDeviceNames.getDevices()

print rv[0]

for device in rv: 
  print device['id']  + " " + device['name'] + " " + str(device['location']['lat']) + " " + str(device['location']['lng'])

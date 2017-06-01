#!/usr/bin/env python

# Usage:
#   $ API_KEY=<YOUR MASTER API KEY> python example.py
# UI for devices available here: https://m2x.att.com/account
# lguadagna May 2017.
# uploads bandwidth available at site to a historical time series
# for use on iConnectWhere user web site
# 
import os

from m2x.client import M2XClient
from m2x.v2.devices import Device
API_KEY="d982d65a305a92955aa3ae84ba8cb855"
# maybe declare this in the env before python server start 
client = M2XClient(API_KEY)
import json

params = {
	"status": "enabled",
	"limit": "10"
}
# url to access devices here:  
# https://m2x.att.com/devices?page=1
# 
# want this json like dictionary returned for JavaScript variable:
#  var locations = [
#           {title: '1010 Last Chance Rd', location: {lat:37.0960644, lng: -122.2622506 }, bpsu: 11345, bpsd: 2000 },
#           {title: '101 Cooper St', location: {lat: 36.9752703, lng: -122.0283402 }, bpsu: 10200, bpsd: 3000},
#           {title: '3538 El Grande Dr', location: {lat: 37.3941051, lng: -121.8350167 }, bpsu: 56000, bpsd: 30000},
#           {title: 'Valencia Apartments, San Louis Obispo', location: {lat: 35.29287, lng:-120.6762382 }, bpsu: 44000, bpsd: 40000}
#         ];

def getDevices():
	#print "in getDevices"
	response = Device.search(api = client, params = params)
	devTxt = {}
	fullData = [] 
	if len(response) > 0:
 	#return response
	   for device in response:
		print device
		print device.id
		devTxt = {}
		devTxt['location'] = {}
		for key, val in device.data.items():
			
			if key == 'location':
			        #print key
				for key2, val2 in val.items():
# 					 @36.975266,-122.028351 cooper St
# 					37.3941009,-121.8350275  El Grande
					 # {name: 'Valencia Apartments, San Louis Obispo', location: {lat: 35.29287, lng:-120.6762382, region: "MID" }, bpsu: 44000, bpsd: 40000},
					 # {name: 'Swanton Berry Farm', location: {lat:  37.0303727, lng: -122.2205668, region: "BA" }, bpsu: 773, bpsd: 45000},
					if key2 == 'latitude':
						devTxt['location']['lat'] = val2
						if val2 < 36:
							devTxt['location']['region'] = "MID"
						else:
							devTxt['location']['region'] = "BA"
							
					if key2 == 'longitude':
						devTxt['location']['lng'] = val2
						if val2 < -122.0 :
							devTxt['location']['region'] = "SC"
						
	
						
				# LOC = {"location": {"lng": LA, "lng": LO }
			else: 
				devTxt[key] = val
			# devTxt = {"id" :  device.id , "title": device.name , "location": "something"		
		fullData.append(devTxt)
	else:
	    print("Devices not available in this search criteria")
	# print "full data: "
	# print fullData
	return fullData


def getStream(deviceID):
	rStream = 'rcvd_bits_per_second'
	sStream = 'sent_bits_per_second'
	rates = {}
	deviceRates = []
	print "in getDeviceStream"
	device = client.device(deviceID)
	print "identified device: " + device.name
	# Create a data stream associated with target Device
	stream = device.stream('sent_bits_per_second')					  
	valObj = {}
	valObj = stream.values()
	bpsu =  valObj['values'][0]['value']
	rates['bpsu'] = bpsu
	
	stream2 = device.stream('rcvd_bits_per_second')					  
	valObj = {}
	valObj = stream2.values()
	# print stream2.stats()
	bpsd =  valObj['values'][0]['value']
	rates['bpsd'] = bpsd
	return rates

	
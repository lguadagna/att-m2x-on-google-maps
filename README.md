# att-m2x-devices-on-google-maps

##IOT devices from att m2x repository posted on google maps with updated streams information
Uses python API to att m2x IOT repository and posts location on a map. Pulls streams of data from each
device location and displays in a window when clicked

## Motivation
Use the att API to post location and stream data on a google map for Udacity course

## Installation
Needs the following code and libraries installed:
1. python 2.7
   pip- python also needs to be able to install needed libraries. pip is useful and can be installed if your python
	does not include it. You need internet access for this installation methond. 
   
2. pip install flask
   *to install to anything but standard location this command looks like:
   pip install --target=home/lisa/python flask
   You will need to include this new target directory in your PYTHONPATH like: 
   PYTHONPATH=/home/lisa/python
   
3. pip install flask-cors
   OR to install to non standard location: 
   pip install --target=/home/lisa/python flask-cors
   
4. install python libraries for m2x
   pip install m2x
   OR 
   pip install --target=/home/lisa/python m2x
   
   Read about the att m2x client here. The key for access my devices is included with my code. 
   https://github.com/attm2x/m2x-python/blob/master/README.md


after installing all above, pull this respository. 

The m2x repository did not resurn jsonp, and did not have endpoints that were useful to
my web page. So i put a front end flask application on and used the python libraries to access
the m2x data. 
   
## Running Web Page and server
Startup the flask server with

'startFlask.sh'

in js/ibConnect.js file 
change the varible flaskServerName where the flask application is running 
    var flaskServerName = "cowbell.employees.org"

point your browser to the index.html file 

## Running and update to device streams
https://iperf.fr/
this is an extra component if you want to measure and update device streams. Full details available
upon request

##Testing
Upon loading page should display default locations and pull their most current stream data. 
When the "update locations" button is pushed, page will pull all new locations associated with
the account and then pull updated stream data for the devices.

## Contributions
Any suggestions for updating welcome!
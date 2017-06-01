# att-m2x-devices-on-google-maps

##IOT devices from att m2x repository posted on google maps with updated streams information
Uses python API to att m2x IOT repository and posts location on a map. Pulls streams of data from each
device location and displays in a window when clicked

## Motivation
Use the att API to post location and stream data on a google map for Udacity course

## Installation
Needs the following code and libraries installed:
1. python 2.7
2. install python libraries for m2x
   https://github.com/attm2x/m2x-python/blob/master/README.md
3. pip install flask
4. pip install flask-cors

after installing all above, pull this respository. 

The m2x repository did not resurn jsonp, and did not have endpoints that were useful to
my web page. So i put a front end flask application on and used the python libraries to access
the m2x data. 

## Running Web Page and server
Startup the flask server ./flask*.py
Hit the index.html file with a browser

## Running and update to device streams
https://iperf.fr/


##Testing
Upon loading page should display default locations and pull their most current stream data. 
When the "update locations" button is pushed, page will pull all new locations associated with
the account and then pull updated stream data for the devices.

## Contributions
Any suggestions for updating welcome!
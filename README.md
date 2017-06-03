# att-m2x-devices-on-google-maps

## IOT devices from att m2x repository posted on google maps with updated streams information
Uses python API to att m2x IOT repository and posts location on a map. Pulls streams of data from each
device location and displays in a window when clicked

## Motivation
Use the att API to post location and stream data on a google map for Udacity course

## installation running here:

* [iConnect] (http://cowbell.employees.org/~lisa/m2x/index.html) 


## Installation
Pull the respsitory.
update the python environment 
```
pip install -r  python.requirements.txt
```

## Running

Open the index.html page

If you choose to also run your own flask server locally,
in js/ibConnect.js change the varible flaskServerName where the flask application is runnin
```
 var flaskServerName = "<your server name>"

```


startup the flask server

```
startFlask.sh
```

## Testing
Upon loading page should display default locations and pull their most current stream data. 
When the "update locations" button is pushed, page will pull all new locations associated with
the account and then pull updated stream data for the devices.

## Contributions
Any suggestions for updating welcome!

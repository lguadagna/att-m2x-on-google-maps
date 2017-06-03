#!/usr/bin/python 
# from datetime import timedelta
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response, request, current_app, jsonify
# from functools import update_wrapper
from functools import wraps
from flask_cors import CORS, cross_origin
import json
import getDeviceNames

app = Flask(__name__)
app.debug = True

# had issues with the origins set to null so trying this
# from https://stackoverflow.com/questions/22181384/javascript-no-access-control-allow-origin-header-is-present-on-the-requested
# cors = CORS(app, resources={r"*": {"origins": "*"}})
CORS(app)

def support_jsonp(f):
    """Wraps JSONified output for JSONP"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            content = str(callback) + '(' + str(f().data) + ')'
            return current_app.response_class(content, mimetype='application/json')
        else:
            return f(*args, **kwargs)
    return decorated_function


@app.route("/")
def home():
    return "hi"

@app.route("/index")

@app.route('/getM2XNames/', methods=['GET', 'POST', 'PUT', 'OPTIONS'])
@cross_origin()
@support_jsonp
def getDevices():
   print "hello"
   message = "hello"
   if request.method == 'GET':
        # datafromjs = request.form['mydata']
        devices = getDeviceNames.getDevices()
        print devices
        
        devicesJSONified = jsonify(devices)
        resp = make_response(devicesJSONified)
       
        print "from server: "
        print  resp
        # resp = make_response('{"response": 1}')
        resp.headers['Content-Type'] = "application/jsonp"
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    
    
@app.route('/getStream/<deviceID>', methods=['GET', 'POST', 'PUT', 'OPTIONS'])
@cross_origin()
@support_jsonp
def getStream(deviceID):
   print "hello"
   if request.method == 'GET':
        # datafromjs = request.form['mydata']
        rates_dict = getDeviceNames.getStream(deviceID)
        print rates_dict
        
        ratesJSONIFIED = jsonify(json.dumps(rates_dict))
        resp = make_response(ratesJSONIFIED)
      
        print "from server: "
        print  resp
        # resp = make_response('{"response": 1}')
        resp.headers['Content-Type'] = "application/json"
        # resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    
if __name__ == "__main__":
   app.run(debug = True)
   

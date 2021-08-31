import import_ipynb
from mainfile import final
from flask import Flask, jsonify , request
from flask_restx import Api
from flask_cors import CORS, cross_origin
from gevent.pywsgi import WSGIServer
import json
import os 

app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='APIs for Python Functions', validate=False)
@app.route('/', methods=['POST'])
@cross_origin(origin='*')
def func():
    '''
    Recieves data from the web-app and sends the data to main python file to retrieve the final recommended output
    '''
    string = json.loads(request.data)
    detail_analysis,winner = final(string) 
    return jsonify({"detail_analysis": detail_analysis,"winner":winner}) 

if __name__ == "__main__": 
    app.run(debug=True,host='0.0.0.0')

from Sentiment_disney import final
from flask import Flask, jsonify , request
from flask_restx import Api
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
import json
import os 
import time

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
def func():
    '''
    This function recieves the request and sends back the output response to the web app
    '''
    string = json.loads(request.data)
    time.sleep(1)
    try:
        ans = final() 
        time.sleep(2)
    except:
        ans = "tweepy couldnt handle request"
        # Error handling in case tweepy couldn't process the query
    response = jsonify(ans)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 
if __name__ == "__main__": 
    app.run(debug=True)

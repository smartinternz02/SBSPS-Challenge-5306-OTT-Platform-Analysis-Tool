from Sentiment_netflix import final
from flask import Flask, jsonify , request
from flask_restx import Api
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
import json
import time
import os 

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
def func():
    string = json.loads(request.data)
    time.sleep(1)
    try:
        # Calling the main python function for output
        ans = final() 
        time.sleep(2)
    except:
        # Exception handling incase tweepy cannot handle requests.
        ans = "tweepy couldnt handle request"
    response = jsonify(ans)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

if __name__ == "__main__": 
    app.run(debug=True)

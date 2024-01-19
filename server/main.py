from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
import pickle
import os
import google.generativeai as genai
import io
from PIL import Image
from google.auth import credentials
from firebase_admin import credentials as firebase_credentials, firestore, initialize_app
from google.cloud.firestore_v1 import Query
from flask_mail import Mail, Message
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import requests

app = Flask(__name__)
CORS(app)

gemini_api_key = "AIzaSyAD6vm7g8PSXBH2npVkRSwLINbFcyYIpxY"
genai.configure(api_key = gemini_api_key)

alerts = []

@app.route('/alerts', methods=['GET'])
def get_alerts():
    url = "https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails"
    response = requests.get(url)
    data_response = response.json()

    for i in range(3):
        latitude, longitude = map(float, data_response[i]['centroid'].split(','))
        
        ai21.api_key = 'iPUIaBJRH2WHx2yrJKYM0LCJnYV3gVxF'

        mess = ai21.Paraphrase.execute(text=data_response[i]['warning_message'], style="general")

        alert = {
            'level': data_response[i]['severity'],
            'start': data_response[i]['effective_start_time'],
            'end': data_response[i]['effective_end_time'],
            'type': data_response[i]['disaster_type'],
            'message':mess['suggestions'][0]['text'],
            'color': data_response[i]['severity_color'],
            'loc': [latitude, longitude],
            'source': data_response[i]['alert_source']
        }
        alerts.append(alert)

    return jsonify(alerts)

@app.route('/alerts22', methods=['GET'])
def get_alerts22():


    alerts2=[]

    for i in range(3):

        mes_pf = f"""
        You are a disaster bot that takes alerts as an input and suggest precautions to be taken by the people.
        Display the steps to be taken by the people in case of the following alert. Dont bold or anything, just give plain text. Give 2-3 points
        alert: {alerts[i]['message']}
        """

        model = genai.GenerativeModel('gemini-pro')
        mes = model.generate_content(mes_pf)


        alert22 = {
            'level': alerts[i]['level'],
            'start': alerts[i]['start'],
            'end': alerts[i]['end'],
            'type': alerts[i]['type'],
            'message':mes.text,
            'color': alerts[i]['color'],
            'loc': alerts[i]['loc'],
            'source': alerts[i]['source']
        }
        alerts2.append(alert22)

    return jsonify(alerts2)

@app.route('/relief-blogs/<disaster>', methods=['GET'])
def get_relief_blogs(disaster):
    blog_dict = {}
    article=[]

    url = f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]={disaster}&preset=latest"

    blog_response = requests.get(url)
    blogs = blog_response.json()

    for i in range(4):
        blog = blogs["data"][i]
        blog_dict[blog['href']] = blog["fields"]["title"]

    for key in blog_dict.keys():
        body_response=requests.get(key)
        blog_body=body_response.json()

        articles = {
            'title' : blog_dict[key],
            'link': blog_body['data'][0]['fields']['url_alias']
        }
        article.append(articles)


    return jsonify(article)

@app.route('/disasters/<disaster>', methods=['GET'])
def get_disasters(disaster):
    dis_dict = {}
    disas = []

    url = f"https://api.reliefweb.int/v1/disasters?appname=apidoc&query[value]={disaster}&filter[field]=country&filter[value]=India&preset=latest"

    dis_response = requests.get(url)
    dis = dis_response.json()

    for i in range(4):
        di = dis["data"][i]
        dis_dict[di['href']] = di["fields"]['name']

    for key in dis_dict.keys():
        dis_response=requests.get(key)
        dis_body=dis_response.json()
        disa = {
            'title': dis_dict[key],
            'link': dis_body['data'][0]['fields']['url_alias'],
            'loc': dis_body['data'][0]['fields']['primary_country']['location']
        }

        disas.append(disa)

    return jsonify(disas)


@app.route('/earthquake-alerts', methods=['GET'])
def get_earthquake_alerts():
    url = "https://sachet.ndma.gov.in/cap_public_website/FetchEarthquakeAlerts"
    response = requests.post(url)
    earthq = response.json()

    earthquake_alerts = []

    for i in range(5):
        timee = earthq['alerts'][i]['effective_start_time']

        earthquakes = {
            'lng': earthq['alerts'][i]['longitude'],
            'lat': earthq['alerts'][i]['latitude'],
            'magnitude': earthq['alerts'][i]['magnitude'],
            'loc': earthq['alerts'][i]['direction'],
            'time': timee[4:10]+" 2024 - " + timee[10:19] + " IST"
        }
        earthquake_alerts.append(earthquakes)

    return jsonify(earthquake_alerts)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
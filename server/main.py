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

# Replace './serviceAccountKey.json' with the actual path to your service account key file
service_account_path = './serviceAccountKey.json'

# Initialize Firebase
cred = firebase_credentials.Certificate(service_account_path)
initialize_app(cred)

tweet_collection = firestore.client().collection('tweets')
result_collection = firestore.client().collection('analyzed_results')
subscribers = firestore.client().collection('subscribers')

gemini_api_key = "AIzaSyCTvuhFY7Y3UrfhLn4uALtBPv5cOcUmSsI"
genai.configure(api_key = gemini_api_key)

app = Flask(__name__)
CORS(app)

@app.route('/alerts', methods=['GET'])
def get_alerts():
    url = "https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails"
    response = requests.get(url)
    data_response = response.json()

    alerts = []

    for i in range(9):
        latitude, longitude = map(float, data_response[i]['centroid'].split(','))
        alert = {
            'level': data_response[i]['severity'],
            'start': data_response[i]['effective_start_time'],
            'end': data_response[i]['effective_end_time'],
            'type': data_response[i]['disaster_type'],
            'message':data_response[i]['warning_message'],
            'color': data_response[i]['severity_color'],
            'loc': [latitude, longitude],
            'source': data_response[i]['alert_source']
        }
        alerts.append(alert)

    return jsonify(alerts)


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

# From tweet data
@app.route('/predictFromTweets', methods=['POST'])
def predict_from_tweets():
    try:
        pf1 = f"""
        You are an agent which decides whether the tweet is about disaster or not.
        For this you have to read the tweet and decide whether it is about disaster or not and also decide the type of disaster it is. If its not a disaster then reply ND.
        For example:
        Input: The city is flooded with water. #floods #disaster
        Output: 
        Flood

        Input:{request.get_json()['text']}
        Output:
        """
        pf2 = f"""You are an agent which decides which city the tweet is about.
        For this you have to read the tweet and decide which city it is about and if there is no city mentioned then reply ND.
        For example:
        Input: Snowfall and avalanches reported in Uttarakhand. Residents in hilly areas advised to stay indoors.
        Output: 
        Uttarakhand

        Input:{request.get_json()['text']}
        Output:
        """
        model = genai.GenerativeModel('gemini-pro')
        resDisaster = model.generate_content(pf1)
        resCity = model.generate_content(pf2)

        # Store the result in the database
        tweet_data = {
            'text': request.get_json()['text'],
            'predicted_disaster': resDisaster.text,
            'location': request.get_json()['coordinates'],
            'city': resCity.text,
            'hashtags': request.get_json()['hashtags']
        }
        tweet_collection.add(tweet_data)

        return jsonify({
            'predicted_disaster': resDisaster.text,
            'location': request.get_json()['coordinates'],
            'city': resCity.text,
            'hashtags': request.get_json()['hashtags']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

@app.route('/getInfo', methods=['GET'])
def get_tweets_by_predicted_disaster():
    try:
        # Get the predicted_disaster value from the request parameters
        predicted_disaster = request.args.get('predicted_disaster')

        # Query the database to get all tweets where predicted_disaster matches the given value
        # query = tweet_collection.where('predicted_disaster', '==', predicted_disaster)

        # # Execute the query and get the documents
        # query_result = query.stream()

        # # Extract tweet texts from the query results
        # tweet_texts = [tweet.to_dict()['text'] for tweet in query_result]

        # # print(tweet_texts)

        pf1 = f"""
        You are an agent which helps in the disaster management.
        For this you have to read the list of text that I have provided and 
        give decision support that assists emergency responders and authorities 
        in making informed decisions during {predicted_disaster}.
        """

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(pf1)

        # remove ** and \n from the response
        response_text = response.text.replace('**', '').replace('\n', '')

        return jsonify({'decision_support': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

@app.route('/generateDisasterReport', methods=['POST'])
def generate_disaster_report():
    try:
        # Extract parameters from the request
        type_of_disaster = request.json.get('type_of_disaster')
        area_affected_sqm = request.json.get('area_affected_sqm')
        num_casualties = request.json.get('num_casualties')
        num_injured = request.json.get('num_injured')
        severity = request.json.get('severity')
        location = request.json.get('location')

        # Construct the prompt based on parameters
        prompt = f"""
        Generate a post disaster strategies and recovery planning based on
        the following details:

        Type of Disaster: {type_of_disaster}
        Area Affected (in square meters): {area_affected_sqm}
        Number of Casualties: {num_casualties}
        Number of Injured: {num_injured}
        Severity: {severity}
        Location: {location}
        Output:
        """

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)

        return jsonify({'disaster_report': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# New endpoint to get 'predicted_disaster' field for all tweets
@app.route('/getAllPredictedDisasters', methods=['GET'])
def get_all_predicted_disasters():
    try:
        all_tweets = tweet_collection.stream()
        predicted_disasters = [tweet.to_dict()['predicted_disaster'] for tweet in all_tweets if 'predicted_disaster' in tweet.to_dict()]
        return jsonify({'all_predicted_disasters': predicted_disasters})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Disaster From Image data
@app.route('/predictDisasterFromImage', methods=['POST'])
def predict_disaster_from_images():
    try:
        image_file = request.files['image']

        # Convert image file to PIL Image object
        image = Image.open(io.BytesIO(image_file.read()))
        model = genai.GenerativeModel('gemini-pro-vision')
        response = model.generate_content(["Detect which disaster is in the image And also write down 5 steps to mitigate it.", image], stream=True)
        response.resolve()
        # print(response.text)
        return jsonify({'description': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Vulnerablity of infrastructure
@app.route('/predictVulnerabilityOfInfraFromImage', methods=['POST'])
def predict_vulnerability():
    try:
        image_file = request.files['image']

        # Convert image file to PIL Image object
        image = Image.open(io.BytesIO(image_file.read()))
        model = genai.GenerativeModel('gemini-pro-vision')
        response = model.generate_content(["Detect whether the infrastructure given in the iamge is damaged or not. If its damaged provide recommendations for retrofitting or reinforcing structures to enhance resilience and reduce potential damage in 5-6 points", image], stream=True)
        response.resolve()
        # print(response.text)
        return jsonify({'reply': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    

@app.route('/getSubs', methods=['GET'])
def get_records():
    # Query the collection
    loc = request.args.get('location')
    results = []
    docs = subscribers.where('location', '==', loc).stream()

    for doc in docs:
        results.append(doc.to_dict())

    c = len(results)

    # Return the results
    return jsonify({'results': results,
                    'count': c})


@app.route('/sendNotification', methods=['POST'])
def send_notification(): 
    sender_email = "tripathirishi80@gmail.com"
    password = "nwor nmgu ltun zmfd"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, password)
    message = MIMEMultipart()

    message["From"] = sender_email

    body = """
    Disaster Alert Issued! - Rakshak
    """
    loc = request.args.get('location')
    results = []
    docs = subscribers.where('location', '==', loc).stream()

    # from the docs extract the email ids and store them in a list
    for doc in docs:
        results.append(doc.to_dict()['email'])

    print(results)

    # send the email to all the email ids in the list
    message["To"] = ', '.join(results)  # Set the 'To' header once with a comma-separated list of emails

    message["Subject"] = "Disaster Alert Issued!"
    message.attach(MIMEText(body, "plain"))

    try:
        server.sendmail(sender_email, results, message.as_string())
        server.quit()

        return jsonify({'success': True, 'message': 'Emails sent successfully'})
    except smtplib.SMTPException as e:
        return jsonify({'success': False, 'error': str(e)}), 500



@app.route('/getResponse', methods=['POST'])
def getBotResponse():
    try:
        question = request.json.get('userInput')
        pf1 = f"""
        You are an agent which helps in the disaster management. Keep your answer short and precise. Also 
        donot use any markdowns. And you are replying people from India. Dont use ** or '\n' in your answer.
        Answer the question : {question}.
        """

        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(pf1)
        # remove ** and \n from the response
        response_text = response.text.replace('**', '').replace('\n', '')

        return jsonify({'answer': response_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
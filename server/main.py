from flask import Flask, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai
import io
from PIL import Image


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

@app.route('/predictImage', methods=['POST'])
def predict_vulnerability():
    try:
        image_file = request.files['image']

        # Convert image file to PIL Image object
        image = Image.open(io.BytesIO(image_file.read()))
        model = genai.GenerativeModel('gemini-pro-vision')
        response = model.generate_content(["Detect whether the infrastructure given in the image is damaged or not. If its damaged provide recommendations for retrofitting or reinforcing structures to enhance resilience and reduce potential damage in 5-6 points", image], stream=True)
        response.resolve()
        print(response.text)
        return jsonify({'reply': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
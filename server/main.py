from flask import Flask, jsonify
from flask_cors import CORS
import requests

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
<<<<<<< HEAD
            'link': blog_body['data'][0]['fields']['url_alias'],
=======
            'link': blog_body['data'][0]['fields']['url_alias']
>>>>>>> 5f72fd86cca6baee85a0c27c52fc08a2dbd05abd
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
        earthquakes = {
            'lng': earthq['alerts'][i]['longitude'],
            'lat': earthq['alerts'][i]['latitude'],
            'magnitude': earthq['alerts'][i]['magnitude'],
            'loc': earthq['alerts'][i]['direction']
        }
        earthquake_alerts.append(earthquakes)

    return jsonify(earthquake_alerts)

if __name__ == '__main__':
    app.run(debug=True)
import requests
import json
url = "https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails"

response = requests.get(url)
data_response = response.json()

alerts = []

for i in range(3):

    alert = {
        'level': data_response[i]['severity'],
        'start': data_response[i]['effective_start_time'],
        'end': data_response[i]['effective_end_time'],
        'type': data_response[i]['disaster_type'],
        'message':data_response[i]['warning_message'],
        'color': data_response[i]['severity_color'],
        'loc': data_response[i]['centroid'],
        'source': data_response[i]['alert_source']
    }

    alerts.append(alert)

alerts_json = json.dumps(alerts)

print(alerts)

        
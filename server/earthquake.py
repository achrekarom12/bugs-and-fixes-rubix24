import requests

url = "https://sachet.ndma.gov.in/cap_public_website/FetchEarthquakeAlerts" 

response = requests.post(url)
earthq = response.json()

for i in range(3):
    print(earthq['alerts'][i]['warning_message'])


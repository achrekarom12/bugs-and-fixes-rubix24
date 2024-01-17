import requests

url = "https://sachet.ndma.gov.in/cap_public_website/FetchEarthquakeAlerts" 

response = requests.post(url)
earthq = response.json()

# print(earthq['alerts'])


for i in range(3):
    print(earthq['alerts'][i]['warning_message'])


# if response.status_code == 200:
#     print("POST request successful!")
# else:
#     print("POST request failed with status code:", response.status_code)

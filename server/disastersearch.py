import requests
import json

dis_dict = {}
article_dict={}
loc_dict={}

disaster = "Flood"

url = f"https://api.reliefweb.int/v1/disasters?appname=apidoc&query[value]={disaster}&filter[field]=country&filter[value]=India&preset=latest"

dis_response = requests.get(url)
dis = dis_response.json()

for i in range(1):
    di = dis["data"][i]
    dis_dict[di['href']] = di["fields"]['name']

for key in dis_dict.keys():
    dis_response=requests.get(key)
    dis_body=dis_response.json()

    title = dis_dict[key]
    article_dict[title] = dis_body['data'][0]['fields']['url_alias']

    loc_dict[dis_body['data'][0]['fields']['primary_country']['name']] = dis_body['data'][0]['fields']['primary_country']['location']
    print(loc_dict)
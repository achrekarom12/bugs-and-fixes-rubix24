import requests
import json

blog_dict = {}
article_dict={}

disaster = "Flood"

url = f"https://api.reliefweb.int/v1/reports?appname=apidoc&query[value]={disaster}&preset=latest"

blog_response = requests.get(url)
blogs = blog_response.json()

for i in range(3):
    blog = blogs["data"][i]
    blog_dict[blog['href']] = blog["fields"]["title"]


for key in blog_dict.keys():
    body_response=requests.get(key)
    blog_body=body_response.json()

    title = blog_dict[key]
    article_dict[title] = blog_body['data'][0]['fields']['url_alias']


print(article_dict)
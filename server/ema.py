import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import requests

url = "http://127.0.0.1:5000/alerts"

response = requests.get(url)   
data = response.json()

sender_email = "tripathirishi80@gmail.com"
password = "nwor nmgu ltun zmfd"

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()
server.login(sender_email, password)
message = MIMEMultipart()

message["From"] = sender_email

body = """

"""

for i in range():
    receiver_email = []
    message["To"] = receiver_email[i]

    message["Subject"] = "Disaster Alert Issued!"

    message.attach(MIMEText(body, "plain"))

    server.sendmail(sender_email, receiver_email, message.as_string())

server.quit()
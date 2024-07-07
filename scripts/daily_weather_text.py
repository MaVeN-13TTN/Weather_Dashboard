"""
This script fetches weather data and sends it via SMS using Twilio daily at 8 AM.
"""

# pylint: disable=line-too-long

import os
import time
import requests
from twilio.rest import Client
from dotenv import load_dotenv
import schedule

# Load environment variables
load_dotenv()

# OpenWeatherMap API settings
OWM_API_KEY = os.getenv("OWM_API_KEY")
CITY = os.getenv("USER_CITY")
UNITS = os.getenv("UNITS")

# Twilio API settings
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
USER_PHONE_NUMBER = os.getenv("USER_PHONE_NUMBER")


def get_weather():
    """Fetch weather data from OpenWeatherMap API."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={OWM_API_KEY}&units={UNITS}"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as err:
        print(f"Error fetching weather data: {err}")
        return None

    data = response.json()
    temp = data["main"]["temp"]
    feels_like = data["main"]["feels_like"]
    description = data["weather"][0]["description"]
    humidity = data["main"]["humidity"]

    temp_unit = "C" if UNITS == "metric" else "F"
    weather_message = (
        f"Good morning! Here's today's weather in {CITY}:\n"
        f"Temperature: {temp}°{temp_unit}\n"
        f"Feels like: {feels_like}°{temp_unit}\n"
        f"Description: {description}\n"
        f"Humidity: {humidity}%"
    )

    return weather_message


def send_weather_sms():
    """Send weather update via SMS using Twilio."""
    weather_message = get_weather()

    if weather_message:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=weather_message, from_=TWILIO_PHONE_NUMBER, to=USER_PHONE_NUMBER
        )
        print(f"Weather SMS sent. Message SID: {message.sid}")
    else:
        print("Failed to fetch weather data. SMS not sent.")


def schedule_weather_sms():
    """Schedule weather SMS to be sent daily at 8 AM."""
    schedule.every().day.at("08:00").do(send_weather_sms)

    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    schedule_weather_sms()

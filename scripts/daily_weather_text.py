"""
This script fetches daily weather data and sends it via SMS using Twilio.
It is designed to run continuously and send updates at a scheduled time.
"""

# pylint: disable=line-too-long

import os
import time
from datetime import datetime
import requests
import schedule
from twilio.rest import Client
from dotenv import load_dotenv

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
    response = requests.get(url, timeout=10)
    data = response.json()

    if response.status_code == 200:
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        description = data["weather"][0]["description"]
        humidity = data["main"]["humidity"]

        temp_unit = "C" if UNITS == "metric" else "F"
        weather_message = (
            f"Good morning! Here's your weather update for {CITY}:\n"
            f"Temperature: {temp}°{temp_unit}\n"
            f"Feels like: {feels_like}°{temp_unit}\n"
            f"Description: {description}\n"
            f"Humidity: {humidity}%"
        )

        return weather_message
    return "Sorry, I couldn't fetch the weather information."


def send_weather_update():
    """Send weather update via SMS using Twilio."""
    weather_message = get_weather()

    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=weather_message, from_=TWILIO_PHONE_NUMBER, to=USER_PHONE_NUMBER
    )

    print(f"Message sent at {datetime.now()}")
    return message.sid


def main():
    """Main function to schedule and run the weather update task."""
    schedule.every().day.at("08:00").do(send_weather_update)

    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute


if __name__ == "__main__":
    main()

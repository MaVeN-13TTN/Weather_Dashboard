"""
This script fetches current weather data and sends it via SMS using Twilio.
It sends the SMS immediately after running the script.
"""

# pylint: disable=line-too-long

import os
import requests
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

print("Loaded environment variables:")
print(f"OWM_API_KEY: {OWM_API_KEY}")
print(f"CITY: {CITY}")
print(f"UNITS: {UNITS}")
print(f"TWILIO_ACCOUNT_SID: {TWILIO_ACCOUNT_SID}")
print(f"TWILIO_AUTH_TOKEN: {TWILIO_AUTH_TOKEN}")
print(f"TWILIO_PHONE_NUMBER: {TWILIO_PHONE_NUMBER}")
print(f"USER_PHONE_NUMBER: {USER_PHONE_NUMBER}")


def get_weather():
    """Fetch weather data from OpenWeatherMap API."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={OWM_API_KEY}&units={UNITS}"
    print(f"Making API request to: {url}")

    response = requests.get(url, timeout=10)
    print(f"API response status code: {response.status_code}")

    data = response.json()
    print(f"API response data: {data}")

    if response.status_code == 200:
        temp = data["main"]["temp"]
        feels_like = data["main"]["feels_like"]
        description = data["weather"][0]["description"]
        humidity = data["main"]["humidity"]

        temp_unit = "C" if UNITS == "metric" else "F"
        weather_message = (
            f"Here's the current weather in {CITY}:\n"
            f"Temperature: {temp}°{temp_unit}\n"
            f"Feels like: {feels_like}°{temp_unit}\n"
            f"Description: {description}\n"
            f"Humidity: {humidity}%"
        )

        print(f"Weather message: {weather_message}")
        return weather_message

    print("Failed to fetch weather information.")
    return "Sorry, I couldn't fetch the weather information."


def send_weather_update():
    """Send weather update via SMS using Twilio."""
    weather_message = get_weather()

    print("Sending weather update via SMS...")
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=weather_message, from_=TWILIO_PHONE_NUMBER, to=USER_PHONE_NUMBER
    )

    print(f"Weather update sent. Message SID: {message.sid}")


if __name__ == "__main__":
    print("Starting weather update script...")
    send_weather_update()
    print("Weather update script completed.")

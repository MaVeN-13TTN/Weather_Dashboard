# Weather Dashboard Project

This project consists of a web-based Weather Dashboard and a Python script for daily weather text updates.

## Features

- Web-based Weather Dashboard with current weather, 5-day forecast, and weather trend charts
- Daily weather text updates via SMS

## Project Structure

```
weather-dashboard/
│
├── web/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── config.js
│       └── app.js
│
├── scripts/
│   └── daily_weather_text.py
│
├── README.md
├── requirements.txt
├── .env
└── .gitignore
```

## Setup

1. Clone this repository.
2. Create a `.env` file in the root directory and add your API keys and settings (see `.env` section below).
3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
4. Update `web/js/config.js` with your OpenWeatherMap API key.

## Usage

### Web Dashboard

1. Open `web/index.html` in a web browser.
2. Enter a city name and click "Get Weather" to see the weather information.

### Daily Weather Text

1. Run the Python script:
   ```
   python scripts/daily_weather_text.py
   ```
2. The script will send a weather update text message every day at 8:00 AM.

## .env File

Create a `.env` file in the root directory with the following content:

```
OWM_API_KEY=your_openweathermap_api_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
USER_CITY=your_city
USER_PHONE_NUMBER=your_phone_number
UNITS=metric
```

Replace the placeholder values with your actual API keys and preferences.

## Contributing

Feel free to fork this project and submit pull requests with any improvements or bug fixes.

## License

This project is open source and available under the MIT License.

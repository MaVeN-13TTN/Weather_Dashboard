# 🌦️ Weather Dashboard

A modern, responsive weather dashboard application with both frontend and backend components. The frontend is built with vanilla JavaScript and OpenWeatherMap API featuring a beautiful glassmorphism design, while the backend provides automated SMS weather notifications using Python and Twilio.

## ✨ Features

- **Real-time Weather Data**
  - Current weather conditions with detailed metrics
  - Interactive 5-day weather forecast carousel
  - Dynamic weather trend charts
  - Temperature, humidity, and wind information

- **Modern UI/UX**
  - Sleek glassmorphism design
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Interactive forecast carousel with touch support
  - Dynamic weather icons

- **Technical Features**
  - Pure vanilla JavaScript frontend
  - OpenWeatherMap API integration
  - Chart.js for weather trends
  - GSAP for smooth animations
  - Responsive CSS with modern features

- **Backend Features**
  - Automated daily weather notifications via SMS
  - Python-based weather data processing
  - Twilio integration for SMS delivery
  - Configurable notification schedules
  - Customizable weather alerts

## 🚀 Quick Start

### Prerequisites

Frontend:
- Modern web browser
- OpenWeatherMap API key
- Basic understanding of HTML/CSS/JavaScript

Backend:
- Python 3.8 or higher
- Twilio account and API credentials
- OpenWeatherMap API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MaVeN-13TTN/Weather_Dashboard
   cd Weather_Dashboard
   ```

2. Frontend Setup:
   - Create `web/js/config.js` with your API key:
     ```javascript
     const weatherDashboardConfig = {
       OWM_API_KEY: 'your_api_key_here'
     };
     ```

3. Backend Setup:
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Create `.env` file in the scripts directory:
     ```env
     OWM_API_KEY=your_openweathermap_api_key
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     USER_CITY=your_city
     USER_PHONE_NUMBER=your_phone_number
     UNITS=metric
     ```

## 🎯 Usage

### Frontend Dashboard
1. **View Weather Information**
   - Enter a city name in the search bar
   - Press Enter or click the search icon
   - View current weather conditions

2. **Explore Forecast**
   - Scroll through the 5-day forecast using:
     - Arrow buttons
     - Touch/mouse drag
     - Keyboard arrows

3. **Customize Display**
   - Toggle between °C and °F
   - View different weather metrics
   - Interact with weather trend charts

### Backend Services
1. **SMS Weather Updates**
   - Configure your settings in `.env`
   - Run the notification script:
     ```bash
     python scripts/daily_weather_text.py
     ```
   - Receive daily weather updates at configured time

2. **Testing SMS Service**
   - Test the SMS functionality:
     ```bash
     python scripts/test_weather_sms.py
     ```

## 🛠️ Project Structure

```
Weather_Dashboard/
├── web/                    # Frontend files
│   ├── assets/            # Images and icons
│   │   └── favicon/       # Favicon files
│   ├── css/              # Stylesheets
│   │   └── styles.css    # Main CSS file
│   ├── js/               # JavaScript files
│   │   ├── app.js       # Main application logic
│   │   └── config.js    # Configuration
│   └── index.html       # Main HTML file
├── scripts/              # Backend Python scripts
│   ├── daily_weather_text.py    # SMS notification service
│   ├── test_weather_sms.py      # SMS testing utility
│   └── trial_weather_text.py    # Development testing
├── requirements.txt      # Python dependencies
└── README.md            # Documentation
```

## 🎨 Customization

### Theme Colors
Modify the color scheme in `web/css/styles.css`:
```css
:root {
    --background: #0f1729;
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --text-color: #ffffff;
    /* ... other color variables */
}
```

### Weather Icons
The dashboard uses Font Awesome 6 icons. Customize icons in `web/js/app.js`:
```javascript
const weatherIcons = {
    2: "bolt",            // Thunderstorm
    3: "cloud-rain",      // Drizzle
    5: "cloud-showers-heavy", // Rain
    // ... other weather conditions
};
```

## 📱 Mobile Support

The dashboard is fully responsive and tested on:
- Mobile phones (Android & iOS)
- Tablets
- Desktop browsers (Chrome, Firefox, Safari, Edge)

Features like touch support and mobile-optimized layouts ensure a great experience across all devices.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- Animations by [GSAP](https://greensock.com/gsap/)
- SMS notifications powered by [Twilio](https://www.twilio.com/)

## 🔑 API Keys and Configuration

This project requires the following API keys:
- **OpenWeatherMap API**: For weather data (both frontend and backend)
- **Twilio API**: For SMS notifications (backend only)

### Frontend Configuration
Update `web/js/config.js`:
```javascript
const weatherDashboardConfig = {
  OWM_API_KEY: 'your_key_here'
};
```

### Backend Configuration
Create `.env` in the scripts directory:
```env
OWM_API_KEY=your_openweathermap_api_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
USER_PHONE_NUMBER=your_phone_number
USER_CITY=your_city
UNITS=metric
```

---
Created with ❤️ by [MaVeN-13TTN](https://github.com/MaVeN-13TTN)

# 🌦️ Weather Dashboard

A modern, responsive weather dashboard application built with vanilla JavaScript and the OpenWeatherMap API. Features a beautiful glassmorphism design, real-time weather updates, and interactive forecasts.

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
  - Pure vanilla JavaScript (no frameworks)
  - OpenWeatherMap API integration
  - Chart.js for weather trends
  - GSAP for smooth animations
  - Responsive CSS with modern features

## 🚀 Quick Start

### Prerequisites

- Modern web browser
- OpenWeatherMap API key
- Basic understanding of HTML/CSS/JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MaVeN-13TTN/Weather_Dashboard.git
   cd Weather_Dashboard
   ```

2. Configure your API key:
   - Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api)
   - Create `web/js/config.js` with your API key:
     ```javascript
     const weatherDashboardConfig = {
       OWM_API_KEY: 'your_api_key_here',
       DEFAULT_CITY: 'Nairobi'
     };
     ```

3. Open `web/index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   # Then visit http://localhost:8000/web/
   ```

## 🎯 Usage

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

## 🛠️ Project Structure

```
Weather_Dashboard/
├── web/                    # Web application files
│   ├── assets/            # Images and icons
│   │   └── favicon/       # Favicon files
│   ├── css/              # Stylesheets
│   │   └── styles.css    # Main CSS file
│   ├── js/               # JavaScript files
│   │   ├── app.js       # Main application logic
│   │   └── config.js    # Configuration (API keys)
│   └── index.html       # Main HTML file
└── README.md             # Documentation
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

---
Created with ❤️ by [MaVeN-13TTN](https://github.com/MaVeN-13TTN)

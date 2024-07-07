// GSAP Animations
function initAnimations() {
  gsap.from(".animate-in", {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });
}

function animateWeatherDetails() {
  gsap.from(".weather-detail", {
    duration: 0.5,
    scale: 0.5,
    opacity: 0,
    stagger: 0.1,
    ease: "back.out(1.7)",
  });
}

function animateForecastCards() {
  gsap.from(".forecast-card", {
    duration: 0.5,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: "power3.out",
  });
}

// Call initAnimations when the DOM is loaded
document.addEventListener("DOMContentLoaded", initAnimations);

// Weather Icons mapping
const weatherIcons = {
  2: "bolt", // Thunderstorm
  3: "cloud-rain", // Drizzle
  5: "cloud-showers-heavy", // Rain
  6: "snowflake", // Snow
  7: "smog", // Atmosphere
  800: "sun", // Clear
  8: "cloud", // Clouds
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  loadLastCity();
  setupEventListeners();
});

function loadLastCity() {
  const lastCity =
    localStorage.getItem("lastCity") || weatherDashboardConfig.DEFAULT_CITY;
  document.getElementById("city-input").value = lastCity;
  getWeather();
}

function setupEventListeners() {
  document.getElementById("search-btn").addEventListener("click", getWeather);
  document
    .getElementById("city-input")
    .addEventListener("keypress", handleEnterPress);
  document.querySelectorAll('input[name="unit"]').forEach((radio) => {
    radio.addEventListener("change", getWeather);
  });
}

function handleEnterPress(event) {
  if (event.key === "Enter") {
    getWeather();
  }
}

// Weather data fetching and display
async function getWeather() {
  const city = document.getElementById("city-input").value;
  const unit = document.querySelector('input[name="unit"]:checked').value;

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    const [currentWeather, forecast] = await Promise.all([
      fetchWeatherData("weather", city, unit),
      fetchWeatherData("forecast", city, unit),
    ]);

    if (currentWeather.cod === 200 && forecast.cod === "200") {
      displayCurrentWeather(currentWeather, unit);
      displayForecast(forecast, unit);
      createCharts(forecast, unit);
      localStorage.setItem("lastCity", city);
    } else {
      showError(currentWeather.message || forecast.message);
    }
  } catch (error) {
    showError("An error occurred while fetching the weather data.");
    console.error("Error:", error);
  }
}

async function fetchWeatherData(type, city, unit) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/${type}?q=${city}&appid=${weatherDashboardConfig.OWM_API_KEY}&units=${unit}`
  );
  return response.json();
}

function displayCurrentWeather(data, unit) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `
      <div class="weather-detail">
          <i class="fas fa-${getWeatherIcon(data.weather[0].id)}"></i>
          <p>${data.weather[0].description}</p>
      </div>
      <div class="weather-detail">
          <i class="fas fa-thermometer-half"></i>
          <h3>${data.main.temp.toFixed(1)}${tempUnit}</h3>
          <p>Feels like: ${data.main.feels_like.toFixed(1)}${tempUnit}</p>
      </div>
      <div class="weather-detail">
          <i class="fas fa-tint"></i>
          <p>Humidity: ${data.main.humidity}%</p>
      </div>
      <div class="weather-detail">
          <i class="fas fa-wind"></i>
          <p>Wind: ${data.wind.speed} ${windUnit}</p>
      </div>
  `;

  animateWeatherDetails();
}

function displayForecast(data, unit) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const forecastCards = document.getElementById("forecast-cards");
  forecastCards.innerHTML = "";

  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);

  if (dailyForecasts.length === 0) {
    console.error("No forecast data available");
    return;
  }

  dailyForecasts.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const card = createForecastCard(date, day, tempUnit);
    forecastCards.appendChild(card);
  });

  initializeCarousel();
  animateForecastCards();
}

function createForecastCard(date, day, tempUnit) {
  const card = document.createElement("div");
  card.className = "forecast-card";
  card.innerHTML = `
      <h3>${date.toLocaleDateString("en-US", { weekday: "short" })}</h3>
      <p>${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}</p>
      <i class="fas fa-${getWeatherIcon(day.weather[0].id)}"></i>
      <p>${day.main.temp.toFixed(1)}${tempUnit}</p>
      <p>${day.weather[0].description}</p>
  `;
  return card;
}

function initializeCarousel() {
  const carousel = document.getElementById("forecast-cards");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = carousel.children[0].offsetWidth;
    const maxTranslate = (carousel.children.length - 1) * cardWidth;
    const translate = Math.min(currentIndex * cardWidth, maxTranslate);
    carousel.style.transform = `translateX(-${translate}px)`;
  }

  function showPrevCard() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  function showNextCard() {
    if (currentIndex < carousel.children.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  prevBtn.addEventListener("click", showPrevCard);
  nextBtn.addEventListener("click", showNextCard);

  // Initial update
  updateCarousel();

  // Update on window resize
  window.addEventListener("resize", updateCarousel);
}

function getWeatherIcon(weatherId) {
  const weatherCode = weatherId.toString()[0];
  return weatherIcons[weatherCode] || weatherIcons[weatherId] || "question";
}

// Chart creation
function createCharts(data, unit) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const currentDayData = data.list.slice(0, 8);
  const [temperatures, humidity] = processCurrentDayData(currentDayData);

  createChart(
    "temp-chart",
    `Temperature (${tempUnit})`,
    temperatures,
    "--pink-lavender",
    tempUnit
  );
  createChart(
    "humidity-chart",
    "Humidity (%)",
    humidity,
    "--non-photo-blue",
    "%"
  );
}

function processCurrentDayData(data) {
  return [
    data.map((item) => ({
      x: new Date(item.dt * 1000),
      y: item.main.temp,
    })),
    data.map((item) => ({
      x: new Date(item.dt * 1000),
      y: item.main.humidity,
    })),
  ];
}

function createChart(canvasId, label, data, color, unit) {
  const ctx = document.getElementById(canvasId).getContext("2d");

  if (window[canvasId] instanceof Chart) {
    window[canvasId].destroy();
  }

  // Extract the color value from the CSS variable
  const computedColor = getComputedStyle(document.documentElement)
    .getPropertyValue(color)
    .trim();

  const gradientFill = createGradient(ctx, computedColor);

  window[canvasId] = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: label,
          data: data,
          borderColor: computedColor,
          backgroundColor: gradientFill,
          borderWidth: 2,
          pointBackgroundColor: computedColor,
          pointBorderColor: "#fff",
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
        },
      ],
    },
    options: createChartOptions(label, unit),
  });

  gsap.from(`#${canvasId}`, {
    duration: 1,
    scaleY: 0,
    opacity: 0,
    ease: "power3.out",
  });
}

function createGradient(ctx, color) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color.replace(/[\d\.]+\)$/g, "0.4)")); // 40% opacity
  gradient.addColorStop(1, color.replace(/[\d\.]+\)$/g, "0)")); // 0% opacity
  return gradient;
}

function createChartOptions(label, unit) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: label,
        color: "#ffffff",
        font: { size: 18, weight: "bold" },
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y}${unit}`,
        },
      },
    },
    scales: {
      x: createTimeScale(),
      y: createLinearScale(label, unit),
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      line: { tension: 0.3 },
    },
  };
}

function createTimeScale() {
  return {
    type: "time",
    time: {
      unit: "hour",
      displayFormats: { hour: "HH:mm" },
    },
    title: {
      display: true,
      text: "Time",
      color: "#ffffff",
      font: { size: 14, weight: "bold" },
    },
    ticks: {
      color: "#ffffff",
      maxRotation: 0,
      autoSkip: true,
      maxTicksLimit: 6,
    },
    grid: {
      color: "rgba(255, 255, 255, 0.1)",
      drawBorder: false,
    },
  };
}

function createLinearScale(label, unit) {
  return {
    title: {
      display: true,
      text: label,
      color: "#ffffff",
      font: { size: 14, weight: "bold" },
    },
    ticks: {
      color: "#ffffff",
      callback: (value) => value + unit,
    },
    grid: {
      color: "rgba(255, 255, 255, 0.1)",
      drawBorder: false,
    },
  };
}

// Error handling
function showError(message) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `<p class="error"><i class="fas fa-exclamation-triangle"></i> ${message}</p>`;
  document.getElementById("forecast-cards").innerHTML = "";
  clearCharts();

  gsap.from(".error", {
    duration: 0.5,
    y: -20,
    opacity: 0,
    ease: "power3.out",
  });
}

function clearCharts() {
  ["temp-chart", "humidity-chart"].forEach((id) => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (window[id] instanceof Chart) {
      window[id].destroy();
      window[id] = null;
    }
  });
}

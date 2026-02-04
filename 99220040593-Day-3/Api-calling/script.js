// ===== Configuration =====
const API_KEY = '4c8bb1a2cfb1ce17e5c9f83534ca6ed6';
const API_BASE_URL = 'http://api.weatherstack.com/current';

// ===== DOM Elements =====
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const retryBtn = document.getElementById('retryBtn');

const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMessage = document.getElementById('errorMessage');

// Weather Display Elements
const locationName = document.getElementById('locationName');
const locationRegion = document.getElementById('locationRegion');
const localTime = document.getElementById('localTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const visibility = document.getElementById('visibility');
const windDirection = document.getElementById('windDirection');
const pressure = document.getElementById('pressure');
const cloudCover = document.getElementById('cloudCover');
const uvIndex = document.getElementById('uvIndex');

// ===== State Management =====
let currentCity = '';

// ===== Utility Functions =====
function showLoading() {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
}

function showError(message) {
    errorState.classList.remove('hidden');
    loadingState.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
    errorMessage.textContent = message;
}

function showWeather() {
    weatherDisplay.classList.remove('hidden');
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
}

function formatTime(timeString) {
    try {
        const time = new Date(timeString);
        return time.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return timeString;
    }
}

// ===== API Functions =====
async function fetchWeatherByCity(city) {
    try {
        showLoading();

        const url = `${API_BASE_URL}?access_key=${API_KEY}&query=${encodeURIComponent(city)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info || 'Failed to fetch weather data');
        }

        if (!data.current) {
            throw new Error('Invalid weather data received');
        }

        displayWeather(data);
        currentCity = city;

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message || 'Unable to fetch weather data. Please try again.');
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        showLoading();

        const url = `${API_BASE_URL}?access_key=${API_KEY}&query=${lat},${lon}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info || 'Failed to fetch weather data');
        }

        if (!data.current) {
            throw new Error('Invalid weather data received');
        }

        displayWeather(data);
        currentCity = data.location.name;

    } catch (error) {
        console.error('Error fetching weather:', error);
        showError(error.message || 'Unable to fetch weather data. Please try again.');
    }
}

// ===== Display Functions =====
function displayWeather(data) {
    const { location, current } = data;

    // Location Information
    locationName.textContent = location.name;
    locationRegion.textContent = `${location.region ? location.region + ', ' : ''}${location.country}`;
    localTime.textContent = formatTime(location.localtime);

    // Weather Icon
    weatherIcon.src = current.weather_icons[0] || '';
    weatherIcon.alt = current.weather_descriptions[0] || 'Weather icon';

    // Temperature and Description
    temperature.textContent = current.temperature;
    weatherDescription.textContent = current.weather_descriptions[0] || 'N/A';

    // Weather Details
    windSpeed.textContent = `${current.wind_speed} km/h`;
    humidity.textContent = `${current.humidity}%`;
    feelsLike.textContent = `${current.feelslike}°C`;
    visibility.textContent = `${current.visibility} km`;
    windDirection.textContent = `${current.wind_dir} (${current.wind_degree}°)`;
    pressure.textContent = `${current.pressure} mb`;
    cloudCover.textContent = `${current.cloudcover}%`;
    uvIndex.textContent = current.uv_index;

    // Show the weather display
    showWeather();
}

// ===== Event Handlers =====
function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    fetchWeatherByCity(city);
}

function handleLocationRequest() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            console.error('Geolocation error:', error);
            let message = 'Unable to retrieve your location';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Location access denied. Please enable location permissions.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    message = 'Location request timed out';
                    break;
            }

            showError(message);
        }
    );
}

function handleRetry() {
    if (currentCity) {
        fetchWeatherByCity(currentCity);
    } else {
        errorState.classList.add('hidden');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// ===== Event Listeners =====
searchBtn.addEventListener('click', handleSearch);
locationBtn.addEventListener('click', handleLocationRequest);
retryBtn.addEventListener('click', handleRetry);
cityInput.addEventListener('keypress', handleKeyPress);

// ===== Focus on input when page loads =====
window.addEventListener('load', () => {
    cityInput.focus();
});

// ===== Initialize with a default city (optional) =====
// Uncomment the line below to load weather for a default city on page load
// fetchWeatherByCity('New York');

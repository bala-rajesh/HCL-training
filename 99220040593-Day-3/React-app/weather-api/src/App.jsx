import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // REPLACE 'YOUR_API_KEY_HERE' WITH YOUR ACTUAL API KEY
  const API_KEY = 'YOUR_API_KEY_HERE';

  const fetchWeather = async (city) => {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
      setError('Please set your Weatherstack API Key in App.jsx');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error.info || 'City not found or API error.');
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
        Enter a city to get the latest weather updates.
      </p>

      <SearchBar onSearch={fetchWeather} />

      {loading && (
        <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          Loading...
        </div>
      )}

      {error && (
        <div style={{ marginTop: '2rem', color: '#ff6b6b', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
          {error}
        </div>
      )}

      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;

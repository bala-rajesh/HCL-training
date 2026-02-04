import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for API Key management
  const [apiKey, setApiKey] = useState(localStorage.getItem('weatherstack_api_key') || '');
  const [tempKey, setTempKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(!!localStorage.getItem('weatherstack_api_key'));

  const handleKeySubmit = (e) => {
    e.preventDefault();
    if (tempKey.trim()) {
      setApiKey(tempKey.trim());
      localStorage.setItem('weatherstack_api_key', tempKey.trim());
      setIsKeySet(true);
    }
  };

  const clearKey = () => {
    localStorage.removeItem('weatherstack_api_key');
    setApiKey('');
    setIsKeySet(false);
    setWeather(null);
  };

  const fetchWeather = async (city) => {
    if (!apiKey) {
      setError('API Key is missing.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
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

  if (!isKeySet) {
    return (
      <div className="App fade-in">
        <h1 style={{ marginBottom: '0.5rem' }}>Welcome</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Start your weather journey</p>

        <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>Enter your API Key to continue</p>
          <form onSubmit={handleKeySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input
              type="text"
              className="glass-input"
              placeholder="Paste Weatherstack API Key"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              style={{ textAlign: 'center' }}
            />
            <button type="submit" className="glass-btn">
              Get Started
            </button>
          </form>
          <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '1.5rem' }}>
            Your key is safely stored in your browser
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App fade-in">
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
        <button
          onClick={clearKey}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
        >
          Reset Key
        </button>
      </div>

      <h1 className="fade-in">Weather Forecast</h1>
      <p className="fade-in delay-1" style={{ marginBottom: '2.5rem', opacity: 0.8, fontSize: '1.2rem' }}>
        Discover the weather in your city
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

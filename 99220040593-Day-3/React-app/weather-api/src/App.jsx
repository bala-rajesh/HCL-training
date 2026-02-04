import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Calculator from './components/Calculator';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for view toggle
  const [view, setView] = useState('weather'); // 'weather' or 'calculator'

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
      {/* Top Bar with Reset Key and Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '2rem',
        width: '100%'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '25px',
          padding: '4px',
          display: 'flex',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={() => setView('weather')}
            style={{
              background: view === 'weather' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: view === 'weather' ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            Weather
          </button>
          <button
            onClick={() => setView('calculator')}
            style={{
              background: view === 'calculator' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: view === 'calculator' ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            Calculator
          </button>
        </div>

        <button
          onClick={clearKey}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            padding: '0.4rem',
            transition: 'color 0.3s'
          }}
          title="Reset API Key"
        >
          Reset Key
        </button>
      </div>

      <h1 className="fade-in">
        {view === 'weather' ? 'Weather Forecast' : 'Calculator'}
      </h1>

      {view === 'weather' && (
        <>
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
            <div className="fade-in" style={{ marginTop: '2rem', color: '#ff6b6b', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', display: 'inline-block' }}>
              {error}
            </div>
          )}

          <WeatherCard weather={weather} />
        </>
      )}

      {view === 'calculator' && (
        <Calculator />
      )}
    </div>
  );
}

export default App;

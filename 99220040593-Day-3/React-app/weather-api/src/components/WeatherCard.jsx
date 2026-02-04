import React from 'react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const { current, location } = weather;

    return (
        <div className="glass-panel" style={{ marginTop: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '2rem' }}>{location.name}</h2>
                <p style={{ margin: 0, opacity: 0.8 }}>{location.country}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>{location.localtime}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                <img
                    src={current.weather_icons[0]}
                    alt={current.weather_descriptions[0]}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                />
                <div style={{ textAlign: 'left' }}>
                    <h1 style={{ margin: 0, fontSize: '3.5rem', lineHeight: 1 }}>{current.temperature}°</h1>
                    <p style={{ margin: 0, fontSize: '1.1rem', textTransform: 'capitalize' }}>{current.weather_descriptions[0]}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', textAlign: 'left', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '12px' }}>
                <div className="detail-item">
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Humidity</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{current.humidity}%</div>
                </div>
                <div className="detail-item">
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Wind</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{current.wind_speed} km/h</div>
                </div>
                <div className="detail-item">
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Pressure</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{current.pressure} mb</div>
                </div>
                <div className="detail-item">
                    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>UV Index</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{current.uv_index}</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

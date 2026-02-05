import React from 'react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const { current, location } = weather;

    return (
        <div className="glass-panel fade-in delay-2" style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 600 }}>{location.name}</h2>
                <p style={{ margin: '0.2rem 0 0', opacity: 0.8, fontSize: '1rem', letterSpacing: '1px' }}>{location.country}</p>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', opacity: 0.6, fontStyle: 'italic' }}>{location.localtime}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.2)', filter: 'blur(20px)', borderRadius: '50%', zIndex: 0
                    }}></div>
                    <img
                        src={current.weather_icons[0]}
                        alt={current.weather_descriptions[0]}
                        style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '24px', zIndex: 1, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                    />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <h1 style={{
                        fontSize: '4.5rem',
                        margin: 0,
                        background: 'linear-gradient(to bottom, #fff, #bfdbfe)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none',
                        lineHeight: 1
                    }}>
                        {current.temperature}°
                    </h1>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', textTransform: 'capitalize', fontWeight: 500 }}>
                        {current.weather_descriptions[0]}
                    </p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
                textAlign: 'left',
                background: 'rgba(0,0,0,0.25)',
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <DetailItem label="Humidity" value={`${current.humidity}%`} />
                <DetailItem label="Wind" value={`${current.wind_speed} km/h`} />
                <DetailItem label="Pressure" value={`${current.pressure} mb`} />
                <DetailItem label="UV Index" value={current.uv_index} />
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.85rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
        <span style={{ fontSize: '1.4rem', fontWeight: 600, color: '#e0e7ff' }}>{value}</span>
    </div>
);

export default WeatherCard;

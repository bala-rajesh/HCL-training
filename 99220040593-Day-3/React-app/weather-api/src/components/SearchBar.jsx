import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '0 auto' }}>
            <input
                type="text"
                className="glass-input"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="glass-btn">
                Search
            </button>
        </form>
    );
};

export default SearchBar;

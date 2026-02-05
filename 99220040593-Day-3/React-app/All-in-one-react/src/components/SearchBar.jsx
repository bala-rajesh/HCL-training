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
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto', position: 'relative' }} className="fade-in delay-1">
            <input
                type="text"
                className="glass-input"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="glass-btn" style={{ whiteSpace: 'nowrap' }}>
                Search
            </button>
        </form>
    );
};

export default SearchBar;

import React, { useState } from "react";

function Weather() {
    const [city, setCity] = useState(""); // user input
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiKey = "8a12130d796b9aac4b814f7240f9d69e";

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page reload

        setLoading(true);
        setError("");

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed To Get Weather Data");
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <h1 className="weather-title">Weather Report</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="weather-form">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="weather-input"
                />

                <button type="submit" className="weather-button">
                    Get Weather
                </button>
            </form>

            {/* LOADING */}
            {loading && <p>Loading Weather...</p>}

            {/* ERROR */}
            {error && <p>{error}</p>}

            {/* RESULT */}
            {weatherData && (
                <div>
                    <h3>City Name: {weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
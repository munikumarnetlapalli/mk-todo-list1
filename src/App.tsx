import React, { useState } from 'react';
import { Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { SearchBar } from './components/SearchBar';
import type { WeatherData, ForecastData } from './types/weather';

const API_KEY = '1234567890'; // Replace with your OpenWeatherMap API key

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError('');

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="text-blue-500 w-12 h-12" />
            <h1 className="text-4xl font-bold text-gray-800 ml-2">Weather App</h1>
          </div>
          <p className="text-gray-600">Check the weather forecast for any city</p>
        </div>

        <SearchBar onSearch={fetchWeather} />

        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="space-y-6">
            <WeatherCard data={weatherData} />
            {forecastData && <ForecastCard data={forecastData} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
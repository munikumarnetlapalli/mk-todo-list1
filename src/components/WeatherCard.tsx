import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
          <p className="text-gray-600 mt-1">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center">
          <Thermometer className="text-blue-500 mr-2" />
          <span className="text-5xl font-bold text-gray-800">
            {kelvinToCelsius(data.main.temp)}°C
          </span>
        </div>
        <p className="text-center text-gray-600 mt-2">
          Feels like {kelvinToCelsius(data.main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
          <Wind className="text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-600">Wind</span>
          <span className="text-lg font-semibold text-gray-800">{data.wind.speed} m/s</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
          <Droplets className="text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-600">Humidity</span>
          <span className="text-lg font-semibold text-gray-800">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
          <Cloud className="text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-600">Pressure</span>
          <span className="text-lg font-semibold text-gray-800">{data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
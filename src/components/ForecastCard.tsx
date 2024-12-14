import React from 'react';
import type { ForecastData } from '../types/weather';

interface ForecastCardProps {
  data: ForecastData;
}

export function ForecastCard({ data }: ForecastCardProps) {
  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-4 gap-4">
        {data.list.slice(0, 8).map((item, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <span className="text-sm text-gray-600">{formatDate(item.dt_txt)}</span>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].main}
              className="w-10 h-10"
            />
            <span className="text-sm font-semibold">{kelvinToCelsius(item.main.temp)}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
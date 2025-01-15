import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { fetchWeather } from '../store/slices/weatherSlice';
import { RootState } from '../store';
import type { AppDispatch } from '../store';

const WeatherWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather('London')); // Default city
  }, [dispatch]);

  const getWeatherIcon = () => {
    if (!data?.description) return <Cloud className="w-8 h-8" />;
    
    if (data.description.includes('rain')) {
      return <CloudRain className="w-8 h-8" />;
    } else if (data.description.includes('cloud')) {
      return <Cloud className="w-8 h-8" />;
    } else if (data.description.includes('wind')) {
      return <Wind className="w-8 h-8" />;
    }
    return <Sun className="w-8 h-8" />;
  };

  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="h-20 flex items-center justify-center">
          <span className="text-gray-500">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 shadow-xl">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather</h3>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
          {getWeatherIcon()}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{Math.round(data.temperature)}°C</p>
          <p className="text-gray-600 capitalize">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Weather } from '../../types';

interface WeatherState {
  data: Weather | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      
      return {
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        throw new Error(error.response?.data.message || 'Failed to fetch weather data');
      }
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const BASE_URL = import.meta.env.VITE_WEATHER_URL;
// const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherByCoords: builder.query({
      query: ({ lat, lon }) =>
        `weather?lat=${lat}&lon=${lon}&appid=30dbf5fbfaa3fa2517f8ed20337f8437&units=metric`,
    }),
  }),
});
export const { useGetWeatherByCoordsQuery, useLazyGetWeatherByCoordsQuery } =
  weatherApi;

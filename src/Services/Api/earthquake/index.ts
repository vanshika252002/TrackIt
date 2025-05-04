import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const earthquakeApi = createApi({
  reducerPath: 'earthquakeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/',
  }),
  endpoints: (builder) => ({
    getEarthquakes: builder.query({
      query: ({ startTime, endTime }) =>
        `query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=5`,
    }),
  }),
});
export const { useGetEarthquakesQuery, useLazyGetEarthquakesQuery } =
  earthquakeApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://opensky-network.org/api';

export const openSkyApi = createApi({
  reducerPath: 'openSkyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAllFlights: builder.query({
      query: () => '/states/all',
    }),
  }),
});

export const { useGetAllFlightsQuery, useLazyGetAllFlightsQuery } = openSkyApi;

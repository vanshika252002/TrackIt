import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    demoApi: build.query({
      query: () => ``,
    }),
  }),
  overrideExisting: false,
});
export const { useDemoApiQuery } = userApi;

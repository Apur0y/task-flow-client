import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createBaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskflow-server-pi.vercel.app",
  }),
  endpoints: () => ({}),
});

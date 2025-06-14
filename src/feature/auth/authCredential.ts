import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authCreation = createApi({
  reducerPath: "authenticationCreate",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://taskflow-server-pi.vercel.app",
  }),
  endpoints: (build) => ({
    userCreation: build.mutation({
      query: (user) => ({
        url: "api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useUserCreationMutation } = authCreation;

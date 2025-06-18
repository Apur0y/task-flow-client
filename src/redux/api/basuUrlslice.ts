import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const createBaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
   prepareHeaders: (headers, { getState }) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
 
  } else {
    console.warn("No token found in Redux for API call.");
  }
  return headers;
},

  }),
  endpoints: () => ({}),
});



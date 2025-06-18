import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const createBaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
   prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth?.accessToken;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
    console.log("Setting token in header:", token);
  } else {
    console.warn("No token found in Redux for API call.");
  }
  return headers;
},

  }),
  endpoints: () => ({}),
});



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../store/store"; // Update this import based on your store location

// export const createBaseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5100/api",
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//       const token =
//         (getState() as RootState).auth?.accessToken || // Replace 'accessToken' with the actual property name that holds the token in your TAuthState
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ1ZG95QGZpbmVtZWQuY29tIiwidXNlclBob25lIjoiMDE5MDg5OTg3NzEiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NDUxMjc0MTYsImV4cCI6MTc0NTIxMzgxNn0.4p_Dk4KBfxrr4HoP0kN7FgsReoiKUNsx4b9WVSM4yRo";

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),

// });

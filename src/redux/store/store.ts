import { configureStore } from "@reduxjs/toolkit";
import { createBaseApi } from "../api/basuUrlslice";
import authReducer from "@/feature/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [createBaseApi.reducerPath]: createBaseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(createBaseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

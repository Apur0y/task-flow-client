import { configureStore } from "@reduxjs/toolkit";
import { createBaseApi } from "../api/basuUrlslice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [createBaseApi.reducerPath]: createBaseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(createBaseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { authCreation } from "@/feature/auth/authCredential";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [authCreation.reducerPath]: authCreation.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authCreation.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

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



// store/store.ts

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // uses localStorage for web

// import authReducer from "@/feature/auth/authSlice";
// import { createBaseApi } from "../api/basuUrlslice"; // assuming this is your baseApi

// const rootReducer = combineReducers({
//   auth: authReducer,
//   [createBaseApi.reducerPath]: createBaseApi.reducer,
// });


// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["accessToken","auth"], 
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const makeStore = () =>
//   configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false, 
//       }).concat(createBaseApi.middleware),
//   });


// export const store = makeStore(); 
// export const persistor = persistStore(store);
  
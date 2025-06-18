// redux/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { createBaseApi } from "../api/basuUrlslice";
import authReducer from "@/feature/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "redux";

// 1. Configure persist for the auth slice
const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "userEmail", "userEmployeeId", "role"],// optionally limit what persists
};

// 2. Wrap the auth reducer
const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

// 3. Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  [createBaseApi.reducerPath]: createBaseApi.reducer, // RTK Query reducer (no need to persist)
});

// 4. Create the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createBaseApi.middleware),
});

// 5. Persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


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
  
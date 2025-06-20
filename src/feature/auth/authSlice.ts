import { createSlice } from "@reduxjs/toolkit";

export type TAuthState = {
  userEmail: null | string;
  userEmployeeId: null | string | number;
  role: null | string;
  accessToken:string|null
};

const initialState: TAuthState = {
  userEmail: null,
  userEmployeeId: null,
  role: null,
  accessToken:null ,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
  const { userEmail, userEmployeeId, role, accessToken } = action.payload.payload;
  state.userEmail = userEmail;
  state.userEmployeeId = userEmployeeId;
  state.role = role;
  state.accessToken = accessToken; 
},

    logout: (state) => {
      state.userEmail = null;
      state.userEmployeeId = null;
      state.role = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

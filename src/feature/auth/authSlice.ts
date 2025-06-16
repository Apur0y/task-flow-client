import { RootState } from "@/redux/store/store";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  userEmail: null | string;
  role: null | string;
};

const initialState: TAuthState = {
  userEmail: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userEmail, role } = action.payload.payload;
      state.userEmail = userEmail;
      state.role = role;
    },
    logout: (state) => {
      state.userEmail = null;
      state.role = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// export const useCurrentToken = (state: RootState) => state.userEmail;
// export const selectCurrentUser = (state: RootState) => state.role;

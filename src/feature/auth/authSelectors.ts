import { RootState } from "../../redux/store/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;


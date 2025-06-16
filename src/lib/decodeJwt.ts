"use client";
import { useAppDispatch } from "./hooks";
import { setUser } from "@/feature/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { TAuthState } from "@/feature/auth/authSlice";

const DecodeJwt = ({ token }) => {
  console.log(token, "token in decodeJwt");
  const dispatch = useAppDispatch();

  const decoded: TAuthState = jwtDecode(token);
  console.log(decoded, "decoded in decodeJwt");
  dispatch(
    setUser({
      type: "TYPE_AUTH",
      payload: {
        userEmail: decoded?.userEmail,
        userEmployeeId: decoded.userEmployeeId,
        role: decoded?.role,
      },
    })
  );
};

export default DecodeJwt;

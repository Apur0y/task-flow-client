"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { authSlice, logout } from "@/feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "@/redux/store/store";

export function NavUser({
 
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
 
  const router = useRouter();
  const dispatch = useDispatch();

 const handleLogOut=()=>{
  dispatch(authSlice.actions.logout());
   persistor.purge(); 
  logout();
  localStorage.removeItem("accessToken");
  router.push('/login')

 }

  return (
   <button onClick={()=>handleLogOut()} className="cursor-pointer flex">
    <LogOut className="rotate-180"></LogOut> Logout
   </button>
  );
}

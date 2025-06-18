"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/feature/auth/authSelectors";
import { logout } from "@/feature/auth/authSlice";

export function NavUser({
 
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
     const auth = useSelector(selectAuth);
  const router = useRouter();

 const handleLogOut=()=>{
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

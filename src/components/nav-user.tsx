"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { logout } from "@/feature/auth/authSlice";

export function NavUser({
 
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
 
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

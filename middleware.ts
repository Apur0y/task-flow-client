'use client'
import { useRouter } from "next/router";
import { useEffect } from "react";

export const middleware=()=>{
    
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    }
  }, []);

}
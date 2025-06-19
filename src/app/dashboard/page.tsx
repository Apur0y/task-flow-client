"use client";


import { useSelector } from "react-redux";
import DashboardOverview from "./(components)/admin-control/(components)/LandingPage";
import { selectAuth } from "@/feature/auth/authSelectors";
import { useEffect, useState } from "react";
import UserView from "./(components)/UserView"



export default function Page() {
  const [role ,setRole] = useState("")

  const auth = useSelector(selectAuth);

  useEffect(()=>{
      if(auth?.role){
        setRole(auth.role)
      }
  },)

      

  return (
  <div>
      <header className='flex justify-between px-8'>
          <h1 className='text-xl font-semibold'>Manage Dashboard</h1>
          <p>Dashboard </p>
        </header>
        {
          role === "user"? <><UserView></UserView></>:<><DashboardOverview></DashboardOverview></>
        }




   
  </div>
  )
}

"use client";

import { selectAccessToken, selectAuth } from "@/feature/auth/authSelectors";

import { useSelector } from "react-redux";
import DashboardOverview from "./(components)/admin-control/(components)/LandingPage";



export default function Page() {

   const auth = useSelector(selectAuth);
  const accessToken = useSelector(selectAccessToken);
      

  return (
  <div>
      <header className='flex justify-between px-8'>
          <h1 className='text-xl font-semibold'>Manage Dashboard</h1>
          <p>Dashboard </p>
        </header>

<DashboardOverview></DashboardOverview>


   
  </div>
  )
}

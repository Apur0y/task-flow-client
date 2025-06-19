"use client";


import DashboardOverview from "./(components)/admin-control/(components)/LandingPage";



export default function Page() {
;
      

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

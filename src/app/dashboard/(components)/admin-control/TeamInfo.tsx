import React from 'react'
import TeamSection from './(components)/TeamSection'

export default function TeamInfo() {
  return (
    <div>
          <header className='flex justify-between px-8'>
          <h1 className='text-xl font-semibold'>Team Informations</h1>
          <p>Dashboard - Teams</p>
        </header>

        <TeamSection></TeamSection>
     
    </div>
  )
}

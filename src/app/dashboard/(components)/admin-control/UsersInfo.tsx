import React from 'react'
import UserTable from './(components)/UserTable'

export default function UsersInfo() {
  return (
    <div>
        
        <header className='flex justify-between px-8'>
          <h1 className='text-xl font-semibold'>User Informations</h1>
          <p>Dashboard - Users</p>
        </header>
        <UserTable></UserTable>
    </div>
  )
}

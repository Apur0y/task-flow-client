'use client'
import UserTable from './(components)/UserTable'
// import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice'
// import { ClockFading } from 'lucide-react'

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

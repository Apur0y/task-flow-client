'use client'
import React, { useEffect, useState } from 'react'
import UsersInfo from '../(components)/admin-control/UsersInfo';
import ProjectInfo from '../(components)/admin-control/ProjectInfo';
import TeamInfo from '../(components)/admin-control/TeamInfo';
import AssignRole from '../(components)/leader-control/AssignRole'
import ProjectUpdate from '../(components)/leader-control/ProjectUpdate'

interface PageProps {
  params: { [key: string]: string };
}

export default function page({ params }: PageProps) {

    const [role, setRole] = useState("")
 
    const  route  = decodeURIComponent(params.route);
    useEffect(()=>{
         setRole("teamLeader")
    },[])

console.log(route,"My route is")

 let adminRoutes = route === "Users" && role ==="admin"
   ? <div><UsersInfo></UsersInfo></div>
   : route === "Projects"  && role ==="admin"
     ? <div><ProjectInfo></ProjectInfo></div>
     :  route === "Teams"  && role ==="admin"
     ? <div><TeamInfo></TeamInfo></div>
     : null;

 let leaderRoutes = route === "Role Assign" && role ==="teamLeader"
   ? <div><AssignRole></AssignRole></div>
   : route === "Project Update"  && role ==="teamLeader"
     ? <div><ProjectUpdate></ProjectUpdate></div>
     :  route === "Teams"  && role ==="admin"
     ? <div><TeamInfo></TeamInfo></div>
     : null;


  return (
    <div>
      {
       adminRoutes  || leaderRoutes
      }
    </div>
  )
}

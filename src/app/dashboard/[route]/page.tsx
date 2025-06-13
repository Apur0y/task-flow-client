'use client'
import React from 'react'
import UsersInfo from '../(components)/admin-control/UsersInfo';
import ProjectInfo from '../(components)/admin-control/ProjectInfo';
import TeamInfo from '../(components)/admin-control/TeamInfo';

interface PageProps {
  params: { [key: string]: string };
}

export default function page({ params }: PageProps) {

 
    const  route  = params.route;
    const role="admin"

console.log(route,"My route is")

 let adminRoutes = route === "Users" && role ==="admin"
   ? <div><UsersInfo></UsersInfo></div>
   : route === "Projects"  && role ==="admin"
     ? <div><ProjectInfo></ProjectInfo></div>
     :  route === "Teams"  && role ==="admin"
     ? <div><TeamInfo></TeamInfo></div>
     : null;

 let leaderRoutes = route === "Users" && role ==="admin"
   ? <div><UsersInfo></UsersInfo></div>
   : route === "Projects"  && role ==="admin"
     ? <div><ProjectInfo></ProjectInfo></div>
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

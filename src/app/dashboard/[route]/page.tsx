'use client'
import React, { useEffect, useState } from 'react'
import UsersInfo from '../(components)/admin-control/UsersInfo';
import ProjectInfo from '../(components)/admin-control/ProjectInfo';
import TeamInfo from '../(components)/admin-control/TeamInfo';
import AssignRole from '../(components)/leader-control/AssignRole'
import ProjectUpdate from '../(components)/leader-control/ProjectUpdate'
import { useSelector } from 'react-redux';
import { selectAccessToken, selectAuth } from '@/feature/auth/authSelectors';

interface PageProps {
  params: Promise<{
    route: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const [role, setRole] = useState("teamLeader")
  const [route, setRoute] = useState("")
   const auth = useSelector(selectAuth);
  // const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
       if(auth?.role){
      setRole(auth.role)
    }else{
      
    }
   
    params.then(resolvedParams => {
      const decodedRoute = decodeURIComponent(resolvedParams.route);
      setRoute(decodedRoute);
    });
    
    
  }, [params])
 

  const adminRoutes = route === "Users" && role === "admin"
    ? <div><UsersInfo /></div>
    : route === "Projects" && role === "admin"
    ? <div><ProjectInfo /></div>
    : route === "Teams" && role === "admin"
    ? <div><TeamInfo /></div>
    : null;

  const leaderRoutes = route === "Role Assign" && role === "teamLeader"
    ? <div><AssignRole /></div>
    : route === "Project Update" && role === "teamLeader"
    ? <div><ProjectUpdate /></div>
    : null;

  return (
    <div>
      {adminRoutes || leaderRoutes}
    </div>
  )
}
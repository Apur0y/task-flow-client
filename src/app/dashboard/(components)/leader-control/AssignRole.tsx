'use client'
import { selectAuth } from '@/feature/auth/authSelectors';
import { useGetProjectsCatchallQuery } from '@/feature/projectCreate/projectCreateSlice'
import { useGetAllTeamQuery } from '@/feature/team/teamApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Team } from '../admin-control/(components)/TeamSection';

export interface Project {
  _id: string;
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  projectValue: number;
  projectDescription: string;
  deadline: string; // ISO date string
  cancellationNote: string;
  teamName: string | null;
  frontendRoleAssignedTo: string | null;
  backendRoleAssignedTo: string | null;
  uiRoleAssignedTo: string | null;
  lastUpdate: string | null;
  lastMeeting: string | null;
  projectStatus: string;
  estimatedDelivery: string;
  rating: number | null;
  clientStatus: string | null;
  figmaLink: string | null;
  backendLink: string | null;
  liveLink: string | null;
  deliveryDate: string | null;
  requirementDoc: string;
  notes: any[]; // Define more specifically if possible
  createdAt: string;
  updatedAt: string;
}


export default function AssignRole() {
  const [user,setUser]=useState('')
  const [projects,setProjects]=useState<Project[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [fileteredTeam, setFilteredTeams]=useState<Team[]>([]);

     const auth = useSelector(selectAuth);
  

  const {data:allProjects} = useGetProjectsCatchallQuery({});
  const {data:allTeam} =useGetAllTeamQuery({})


  useEffect(()=>{
    if(auth?.userEmail){
      setUser(auth.userEmail)
    }

    if(allTeam?.data){
      setTeams(allTeam.data)
    }

    if(allProjects?.data){
      setProjects(allProjects.data)
    }


  },[allProjects?.data,allTeam?.data,auth?.userEmail])


  useEffect(()=>{
    const getTeam = teams.filter(t => t.teamLeaderEmail === user)
    setFilteredTeams(getTeam);

    const getedProject = projects.filter(p => fileteredTeam.some(t => t.teamName === p.teamName));
    setFilteredProjects(getedProject)

  },[])

console.log(filteredProjects)

  return (
    <div>Assigning Role</div>
  )
}

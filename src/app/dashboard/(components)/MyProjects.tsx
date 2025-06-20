
'use client'
import { selectAuth } from '@/feature/auth/authSelectors';
import { useGetProjectsCatchallQuery } from '@/feature/projectCreate/projectCreateSlice'
import { useGetAllTeamQuery } from '@/feature/team/teamApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import { Team } from '../admin-control/(components)/TeamSection';
// import { Button } from '@/components/ui/button';

import { useForm } from "react-hook-form";
import { Team } from './admin-control/(components)/TeamSection';


export interface Project {
  _id: string;
  projectId: string;
  projectName: string;
  station: string;
  clientId: string;
  projectValue: number;
  projectDescription: string;
  deadline: string; // ISO date string
  cancellationNote: string | null;
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

export default function MyProjects() {

      const [user,setUser]=useState('')
      const [projects,setProjects]=useState<Project[]>([])
      const [teams, setTeams] = useState<Team[]>([])
      // const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
      const [fileteredTeam, setFilteredTeams]=useState<Team[]>([]);
      const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    
      const auth = useSelector(selectAuth);
      const {data:allProjects} = useGetProjectsCatchallQuery({});
      const {data:allTeam} =useGetAllTeamQuery({})
      
      const { reset } = useForm({});
    
    
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
        const getTeam = teams.filter(t => t.teamLeaderEmail === user || t.teamColeaderEmail ===user || t.teamMembersEmails.map(t=>t).includes(user))
        setFilteredTeams(getTeam);
       
        const getPro = projects.filter(p => fileteredTeam.map(f => f.teamName).includes(p.teamName ?? ''))
        setSelectedProject(getPro.length > 0 ? getPro[0] : null);
        console.log(getPro);
      
    
      },[teams, projects, user,selectedProject, reset])
        const getPro = projects.filter(p => fileteredTeam.map(f => f.teamName).includes(p.teamName ?? ''));
        console.log(getPro,"MY score")

    

  return (
    <div className='mx-3 md:mx-9'>

      {getPro.length>0 ? <> {getPro.map((project) => (
        <div
          key={project.projectId}
          className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {project.projectName}
            </h2>
            <p className="text-sm text-gray-500">ID: {project.projectId}</p>
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <p><span className="font-medium">Team:</span> {project.teamName || 'N/A'}</p>
            <p><span className="font-medium">Frontend:</span> {project.frontendRoleAssignedTo || 'Unassigned'}</p>
            <p><span className="font-medium">Backend:</span> {project.backendRoleAssignedTo || 'Unassigned'}</p>
            <p><span className="font-medium">UI:</span> {project.uiRoleAssignedTo || 'Unassigned'}</p>
            <p><span className="font-medium">Status:</span> {project.projectStatus}</p>
            <p><span className="font-medium">Delivery Date:</span> {project.deliveryDate ? new Date(project.deliveryDate).toLocaleDateString() : 'Pending'}</p>
          </div>

          <div className="mt-4 space-y-1 text-sm">
            <p className="font-medium text-gray-800">Links:</p>
            <ul className="list-disc list-inside text-blue-600">
              {project.figmaLink && <li><a href={project.figmaLink} target="_blank" rel="noopener noreferrer">Figma</a></li>}
              {project.backendLink && <li><a href={project.backendLink} target="_blank" rel="noopener noreferrer">Backend</a></li>}
              {project.liveLink && <li><a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live</a></li>}
              {!project.figmaLink && !project.backendLink && !project.liveLink && <li className="text-gray-400">No links available</li>}
            </ul>
          </div>

          <div className="mt-3">
            <a
              href={project.requirementDoc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-indigo-600 underline hover:text-indigo-800"
            >
              View Requirement Document
            </a>
          </div>
        </div>
      ))}</>:
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <span className="text-2xl mb-2">No projects found</span>
        <span className="text-sm">You don&apos;t have any assigned projects yet.</span>
      </div>
     
      
      }

    
    </div>
  )
}

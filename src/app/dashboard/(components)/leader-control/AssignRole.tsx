'use client'
import { selectAuth } from '@/feature/auth/authSelectors';
import { useGetProjectsCatchallQuery, useUpdateProjectMutation } from '@/feature/projectCreate/projectCreateSlice'
import { useGetAllTeamQuery } from '@/feature/team/teamApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Team } from '../admin-control/(components)/TeamSection';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


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


export default function AssignRole() {
  const [user,setUser]=useState('')
  const [projects,setProjects]=useState<Project[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [fileteredTeam, setFilteredTeams]=useState<Team[]>([]);

  const auth = useSelector(selectAuth);
  const {data:allProjects} = useGetProjectsCatchallQuery({});
  const {data:allTeam} =useGetAllTeamQuery({})
  const [updateProject] =useUpdateProjectMutation();


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
    // const getedProject = projects.filter(p => fileteredTeam.some(t => t.teamName === p.teamName));
    const getPro = projects.filter(p => fileteredTeam.map(f => f.teamName).includes(p.teamName ?? ''));
    setFilteredProjects(getPro)
  },[teams, projects, user])

    const getPro = projects.filter(p => fileteredTeam.map(f => f.teamName).includes(p.teamName ?? ''));


      const { register, handleSubmit, reset } = useForm({
  });


      const handleEdit = (project: Project) => {
    // setSelectedProject(project);
    // reset(project); // Pre-fill form
    // setOpen(true);
    console.log(";asd")
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };



  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  


  
  const onSubmit = async (formData: Partial<Project>) => {
    console.log(formData)
    const cancellationNote=formData;
    const projectId= 'PRJ0113';

    const responce = await updateProject({ projectId, cancellationNote }).unwrap();
    if(responce){
      console.log(responce)
    }

    if (!selectedProject) return;
    // await updateProject({ id: selectedProject._id, data: formData });
    setOpen(false);
  };

  return (
    <div>
       <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Project Name</th>
            <th className="border p-2">Station</th>
            <th className="border p-2">Team</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
      {getPro.map((project) => (
            <tr key={project._id}>
              <td className="border p-2">{project.projectName}</td>
              <td className="border p-2">{project.station}</td>
              <td className="border p-2">{project.teamName ?? "N/A"}</td>
              <td className="border p-2">
                <Button variant="outline" onClick={() => handleEdit(project)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
              </tbody>
      </table>


     {/* Open the modal using document.getElementById('ID').showModal() method */}

 <dialog id="my_modal_2" className="modal">
      <div className="modal-box max-w-4xl bg-white">
        <h3 className="font-bold text-lg mb-4">Update Project</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
          <input {...register('frontendRoleAssignedTo')} placeholder="Frontend Role Assigned To" className="input bg-white shadow-2xl input-bordered w-full" />
          <input {...register('backendRoleAssignedTo')} placeholder="Backend Role Assigned To" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('uiRoleAssignedTo')} placeholder="UI Role Assigned To" className="input bg-white shadow-lg input-bordered w-full" />
          <div className='flex'>
    <label htmlFor="">Last Update</label>
          <input {...register('lastUpdate')} placeholder="Last Update" type="datetime-local" className="input bg-white shadow-lg input-bordered w-full" />
          </div>

      <div className='flex'>
         <label htmlFor="">Last Meeting</label>
          <input {...register('lastMeeting')} placeholder="Last Meeting" type="datetime-local" className="input bg-white shadow-lg input-bordered w-full" />

      </div>
          <input {...register('projectStatus')} placeholder="Project Status" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('estimatedDelivery')} placeholder="Estimated Delivery" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('rating')} placeholder="Rating" type="number" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('clientStatus')} placeholder="Client Status" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('figmaLink')} placeholder="Figma Link" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('backendLink')} placeholder="Backend Link" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('liveLink')} placeholder="Live Link" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('deliveryDate')} placeholder="Delivery Date" type="date" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('requirementDoc')} placeholder="Requirement Doc URL" className="input bg-white shadow-lg input-bordered w-full" />

          <div className="col-span-full flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </div>
  )
}

'use client'
import { selectAuth } from '@/feature/auth/authSelectors';
import { useGetProjectsCatchallQuery, useUpdateProjectMutation } from '@/feature/projectCreate/projectCreateSlice'
import { useGetAllTeamQuery } from '@/feature/team/teamApi';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Team } from '../admin-control/(components)/TeamSection';
import { Button } from '@/components/ui/button';

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
  // const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [fileteredTeam, setFilteredTeams]=useState<Team[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  const auth = useSelector(selectAuth);
  const {data:allProjects} = useGetProjectsCatchallQuery({});
  const {data:allTeam} =useGetAllTeamQuery({})
  const [updateProject] =useUpdateProjectMutation();
  const { register, handleSubmit,reset } = useForm({});


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
    console.log(getPro)
    // setFilteredProjects(getPro)
     if (selectedProject) {
    reset({
      frontendRoleAssignedTo: selectedProject.frontendRoleAssignedTo || '',
      backendRoleAssignedTo: selectedProject.backendRoleAssignedTo || '',
      uiRoleAssignedTo: selectedProject.uiRoleAssignedTo || '',

    });
  }
  },[teams, projects, user,selectedProject, reset])

    const getPro = projects.filter(p => fileteredTeam.map(f => f.teamName).includes(p.teamName ?? ''));




      const handleEdit = (project: Project) => {
    setSelectedProject(project);
    // reset(project); // Pre-fill form
    // setOpen(true);
    console.log(";asd",project)
    
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };


  // const [open, setOpen] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  
  const onSubmit = async (formData: Partial<Project>) => {
      console.log(formData);
    const cancellationNote=formData;
    const projectId= selectedProject?.projectId;

    const responce = await updateProject({ projectId, cancellationNote }).unwrap();
    if(responce){
      console.log(responce)
    }
    //  reset()
    // if (!selectedProject) return;
    // // await updateProject({ id: selectedProject._id, data: formData });
    // setOpen(false);
  };

  return (
    <div className='mx-9'>
    <div className="mt-6 overflow-x-auto rounded-lg shadow-md">
      <table className="w-full border-collapse bg-white text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="border-b p-4 text-left font-semibold">Project Name</th>
            <th className="border-b p-4 text-left font-semibold">Station</th>
            <th className="border-b p-4 text-left font-semibold">Team</th>
            <th className="border-b p-4 text-left font-semibold">Assign Role</th>
          </tr>
        </thead>
        <tbody>
          {getPro.map((project) => (
            <tr
              key={project._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="border-b p-4 text-gray-800">{project.projectName}</td>
              <td className="border-b p-4 text-gray-800">{project.station}</td>
              <td className="border-b p-4 text-gray-800">
                {project.teamName ?? "N/A"}
              </td>
              <td className="border-b p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                  className="bg-gray-200 border-none"
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

     {/* Open the modal using document.getElementById('ID').showModal() method */}

 <dialog id="my_modal_2" className="modal">
      <div className="modal-box max-w-4xl bg-white">
        <h3 className="font-bold text-lg mb-4">Assign Role</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
               <div >
              <label className="block text-sm font-medium">Frontend Role Assigned To</label>
              <select
                {...register('frontendRoleAssignedTo', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto max-h-60"
                defaultValue=""
              >
                <option value="" disabled>Select leader</option>
                {fileteredTeam.length > 0 && fileteredTeam[0].teamMembersEmails?.map((email) => (
                  <option key={email} value={email} className='overflow-auto'>
                    {email}
                  </option>
                ))}
              </select>
             

            </div>

            <div >
              <label className="block text-sm font-medium">Backend Role Assigned To</label>
              <select
                {...register('backendRoleAssignedTo', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto max-h-60"
                defaultValue=""
              >
                <option value="" disabled>Select leader</option>
                {fileteredTeam.length > 0 && fileteredTeam[0].teamMembersEmails?.map((email) => (
                  <option key={email} value={email} className='overflow-auto'>
                    {email}
                  </option>
                ))}
              </select>
            </div>


            <div >
              <label className="block text-sm font-medium">UI Role Assigned To</label>
              <select
                {...register('uiRoleAssignedTo', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto max-h-60"
                defaultValue=""
              >
                <option value="" disabled>Select leader</option>
                {fileteredTeam.length > 0 && fileteredTeam[0].teamMembersEmails?.map((email) => (
                  <option key={email} value={email} className='overflow-auto'>
                    {email}
                  </option>
                ))}
              </select>
            </div>


          {/* <input {...register('projectId')} placeholder="Project ID" className="input bg-white shadow-2xl input-bordered w-full" readOnly /> */}
          {/* <input {...register('frontendRoleAssignedTo')} placeholder="Frontend Role Assigned To" className="input bg-white shadow-2xl input-bordered w-full" />
          <input {...register('backendRoleAssignedTo')} placeholder="Backend Role Assigned To" className="input bg-white shadow-lg input-bordered w-full" />
          <input {...register('uiRoleAssignedTo')} placeholder="UI Role Assigned To" className="input bg-white shadow-lg input-bordered w-full" />
          */}

          <div className="col-span-full flex justify-end mt-4">
            <button type="submit" className="btn bg-task-primary border-none">Update</button>
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

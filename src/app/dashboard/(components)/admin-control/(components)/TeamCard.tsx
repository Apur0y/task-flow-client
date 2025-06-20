import { DeleteIcon, Mail, Move, Phone } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { Team } from './TeamSection';
import { useDeleteTeamMutation, useGetAllTeamQuery, useMoveMemberMutation } from '@/feature/team/teamApi';
import toast from 'react-hot-toast';
import { useGetProjectsCatchallQuery } from '@/feature/projectCreate/projectCreateSlice';
import { Project } from '../../MyProjects';
// import { useForm } from 'react-hook-form';

export default function TeamCard({ team }: { team: Team }) {
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [deleteTeam] = useDeleteTeamMutation();
    const [newTeam, setNewTeam] = useState("");
    const [moveMember, setMoveMember] = useState("ol")
    const { data: allteams } = useGetAllTeamQuery({})
    const [moveUser] = useMoveMemberMutation();
    const { data: allProjects } = useGetProjectsCatchallQuery({});
    const [getProjects, setProjects] = useState<Project[]>([])



    const { teamName, teamLeaderEmail, teamColeaderEmail, teamMembersEmails, teamID, _id } = team;
    const onlyMembers = teamMembersEmails.filter(
        (member: string) => member !== teamLeaderEmail && member !== teamColeaderEmail
    );

    const handleTeamDelete = async (id: string) => {
        try {
            const response = await deleteTeam(id).unwrap();
            // Optionally, show a success message or update UI
            console.log('Team deleted successfully:', response);
        } catch (error) {
            // Handle error (e.g., show error notification)
            if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {

                console.error('Failed to delete team:', error.data.message);

                toast.error(String(error.data.message || 'Failed to delete team'));
            } else {
                console.error('Failed to delete team:', error);
                toast.error('Failed to delete team');
            }
        }
    }

    useEffect(() => {
        if (allProjects?.data) {
            setProjects(allProjects.data)
        }
    }, [allProjects?.data])



    const getTeamStats = (projects: Project[], teamName: string) => {
        const teamProjects = projects.filter(project => project.teamName === teamName);

        const completed = teamProjects.filter(p => p.projectStatus === 'Completed').length;
        const running = teamProjects.filter(p => p.projectStatus === 'Running').length;

        const totalEarnings = teamProjects
            .filter(p => p.projectStatus === 'Completed') // only completed projects are counted as earnings
            .reduce((sum, p) => sum + (p.projectValue || 0), 0);

        return {
            completed,
            running,
            totalEarnings,
        };
    };

    const { completed, running, totalEarnings } = getTeamStats(getProjects, teamName);
   

    const handleMoveMember = (member: string) => {
     console.log(member)
        setMoveMember(member);
     console.log(moveMember)
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
//  console.log(moveMember,"Underr")
      if (modal) {

        //  console.log(moveMember,"In the modak")
      modal.showModal();

    }
    
    }

//     useEffect(() => {
//   if (moveMember) {
//     const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
//     if (modal) modal.showModal();
//   }
// }, [moveMember]);



    const handleMove = async () => {
        try {
            const response = await moveUser({ memberEmail: moveMember, toTeamName:newTeam }).unwrap();
            console.log(newTeam, "My team", moveMember);
            if (response) {
                console.log(response)
            }
        } catch (error) {
            console.error('Failed to move member:', error);
            toast.error('Failed to move member');
        }
    }

    return (
        <div className="w-full bg-white shadow-md rounded-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold text-lg">
                        {teamName?.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{teamName}</h2>
                        <p className="text-sm text-gray-500">{teamID}</p>
                    </div>
                </div>
                <button
                    onClick={() => handleTeamDelete(_id)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Delete Team"
                >
                    <DeleteIcon />
                </button>
            </div>
        

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 divide-x border-b text-center text-sm bg-gray-50">
                <div className="p-4">
                    <p className="text-gray-500">Completed</p>
                    <p className="text-lg font-bold text-teal-700">{completed}</p>
                </div>
                <div className="p-4">
                    <p className="text-gray-500">Running</p>
                    <p className="text-lg font-bold text-indigo-600">{running}</p>
                </div>
                <div className="p-4">
                    <p className="text-gray-500">Earnings</p>
                    <p className="text-lg font-bold text-green-600">{totalEarnings}</p>
                </div>
            </div>

            {/* Team Members */}
            <div className="p-4">
                <div className="border rounded-md divide-y text-sm overflow-hidden">
                    <div className="flex justify-between p-3 bg-teal-100 text-teal-800 font-medium">
                        <span>{teamLeaderEmail}</span>
                        <span>Leader</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-100 text-gray-500 font-medium">
                        <span>{teamColeaderEmail}</span>
                        <span>Co-Leader</span>
                    </div>
                    {onlyMembers.map((member, idx) => (
                        <div className="flex justify-between p-3 hover:bg-gray-50" key={idx}>
                            <span>{member}</span>
                            <span className="text-gray-500">Member</span>
                            <button onClick={() => handleMoveMember(member)}>Move <Move></Move></button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 border-t py-4 px-4 text-sm">
                <div
                    className="flex items-center gap-2 text-gray-600 hover:text-teal-600 cursor-pointer transition"
                    onClick={() => setShowPhone(!showPhone)}
                >
                    <Phone className="text-teal-500" />
                    <span>0178524789</span>
                </div>
                <div
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 cursor-pointer transition"
                    onClick={() => setShowEmail(!showEmail)}
                >
                    <Mail className="text-indigo-500" />
                    <span>taskflow@mail.com</span>
                </div>
            </div>
                <p>{moveMember}</p>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button> */}
        
        
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-white rounded-md shadow-lg max-w-md w-full">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Move Team Member</h3>

                    {/* Member to move */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Member to move:</p>
                        <div className="px-3 py-2 border rounded-md bg-gray-50 text-gray-700">
                            {moveMember}
                        </div>
                    </div>

                    {/* Select new team */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Move to team:</p>
                        <div className="grid gap-2 max-h-40 overflow-auto">
                            {allteams?.data.map((team: Team) => (
                                <button
                                    key={team.teamID}
                                    onClick={() => setNewTeam(team.teamName)}
                                    className={`px-4 py-2 rounded-md border text-left hover:bg-gray-100 ${newTeam === team.teamName ? 'bg-gray-200 font-semibold' : ''
                                        }`}
                                >
                                    {team.teamName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-2">
                        <form method="dialog">
                            <button className="btn border-none bg-gray-400">Cancel</button>
                        </form>
                        <button
                            type='button'
                            onClick={handleMove}
                            className="btn hover:bg-task-primary border-none"
                        >
                            Move
                        </button>
                    </div>
                </div>

                {/* Modal backdrop */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>




        </div>


    );
}



//   <dialog id="my_modal_2" className="modal">
//       <div className="modal-box bg-white">
//         <h3 className="font-bold text-lg mb-4">Update Team</h3>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//   <div>
//     <label className="block text-sm font-medium">Team Name</label>
//     <input
//       {...register('teamName', { required: 'Team name is required' })}
//       className="input input-bordered bg-white shadow-lg w-full"
//       placeholder="Enter team name"
//     />
//     {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName.message}</p>}
//   </div>

//           <div>
//             <label className="block text-sm font-medium">Team Leader Email</label>
//             <input
//               {...register('teamLeaderEmail', { required: 'Leader email is required' })}
//               className="input input-bordered bg-white shadow-lg w-full"
//               placeholder="Enter leader email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Team Co-leader Email</label>
//             <input
//               {...register('teamColeaderEmail')}
//               className="input input-bordered bg-white shadow-lg w-full"
//               placeholder="Enter co-leader email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Team Members (comma-separated emails)</label>
//             <input
//               {...register('teamMembersEmails')}
//               className="input input-bordered bg-white shadow-lg w-full"
//               placeholder="e.g. user1@example.com,user2@example.com"
//               defaultValue={team.teamMembersEmails.join(',')}
//             />
//           </div>

//           <div className="flex justify-end">
//             <button type="submit" className="btn btn-primary">
//               Update
//             </button>
//           </div>
//         </form>
//       </div>

//       <form method="dialog" className="modal-backdrop">
//         <button>close</button>
//       </form>
//     </dialog>
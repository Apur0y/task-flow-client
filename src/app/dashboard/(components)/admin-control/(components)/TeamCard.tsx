import { DeleteIcon, Mail, Move, Phone } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { Team } from './TeamSection';
import { useDeleteTeamMutation, useGetAllTeamQuery, useMoveMemberMutation } from '@/feature/team/teamApi';
import toast from 'react-hot-toast';
import { useGetProjectsCatchallQuery } from '@/feature/projectCreate/projectCreateSlice';
import { Project } from '../../MyProjects';
import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';

interface TeamStats {
    memberEmails: string[];

}

export default function TeamCard({ team }: { team: Team }) {
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [deleteTeam] = useDeleteTeamMutation();
    const [newTeam, setNewTeam] = useState("");
    const [moveMember, setMoveMember] = useState<string | null>(null);
    // const [member, setMember] = useState<string[]>([moveMember || ""]);

    const { data: allteams ,refetch} = useGetAllTeamQuery({})
    const [moveUser] = useMoveMemberMutation();
    const { data: allProjects } = useGetProjectsCatchallQuery({});
    const [getProjects, setProjects] = useState<Project[]>([]);
    const [moveView, setMoveView]=useState(false)



    const { teamName, teamLeaderEmail, teamColeaderEmail, teamMembersEmails, teamID, _id } = team;
    const onlyMembers = teamMembersEmails.filter(
        (member: string) => member !== teamLeaderEmail && member !== teamColeaderEmail
    );

    const handleTeamDelete = async (id: string) => {

        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
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
});
      
    }
    //     useEffect(() => {
    //     if (moveMember) {
    //         const modal = document.getElementById('my_modal_3') as HTMLDialogElement || null ; modal?.showModal?.();
    //     }
    // }, [moveMember]);


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


    const handleMoveMember = (member2: string) => {
        setMoveView(!moveView);
        // setMember(member2);
        setMoveMember(member2);

        console.log(member2)

    }



    const handleMove = async () => {
        console.log(moveMember, newTeam)
        try {
            const response = await moveUser({ memberEmail: moveMember, toTeamName: newTeam }).unwrap();
            console.log(newTeam, "My team", moveMember);
            if (response.success=== true) {
                toast.success(response.data.message || 'Member moved successfully');
                setMoveView(false);
                console.log(response)
                refetch();
            }
        } catch (error) {
            // console.error('Failed to move member:', error);
            if (
                error &&
                typeof error === 'object' &&
                'data' in error &&
                error.data &&
                typeof error.data === 'object' &&
                'message' in error.data
            ) {
                toast.error(String((error as any).data.message || 'Failed to move member'));
            } else {
                toast.error('Failed to move member');
            }
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
                            <button className='py-1 rounded-sm shadow-lg font-semibold px-4 bg-gray-400 border-none' onClick={() => handleMoveMember(member)}>Move </button>
                  
                        </div>
                    ))}
                </div>


                {/* Move member view */}

                <div className={`p-4 ${moveView ? 'block' : 'hidden'}`}>
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Move Member:</p>
                        <div className="grid gap-2 max-h-40 overflow-auto">
                            {moveMember}
                            {/* {member?.map((memberEmail: string, idx: number) => (
                                <button
                                    key={memberEmail + idx}
                                    onClick={() => setNewTeam(memberEmail)}
                                    className={`px-4 py-2 rounded-md border text-left hover:bg-gray-100 ${newTeam === memberEmail ? 'bg-gray-200 font-semibold' : ''
                                        }`}
                                >
                                    {memberEmail}
                                </button>
                            ))} */}
                        </div>


                    </div>
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
                    <button onClick={()=>handleMove()} className='btn'>Move</button>
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




        </div>


    );
}



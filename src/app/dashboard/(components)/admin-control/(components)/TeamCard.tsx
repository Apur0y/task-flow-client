import { DeleteIcon, Edit, Mail, Phone } from 'lucide-react';

import React, { useState } from 'react';
import { Team } from './TeamSection';
import { useDeleteTeamMutation } from '@/feature/team/teamApi';
import toast from 'react-hot-toast';

export default function TeamCard({ team }: { team: Team }) {
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [deleteTeam] = useDeleteTeamMutation();


    const {teamName, teamLeaderEmail,teamColeaderEmail,teamMembersEmails,teamID,_id} =team;
    const onlyMembers = teamMembersEmails.filter(
        (member: string) => member !== teamLeaderEmail && member !== teamColeaderEmail
    );

    const handleTeamDelete=async(id:string)=>{
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

    return (
        <div className="mx-auto  bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">

            <div className="px-6 py-4 flex justify-between border-b gap-2">

                <div className='flex gap-2'>
                    {/* <Image src="https://admin.pixelstrap.net/riho/assets/images/social-app/timeline-3.png" alt="" height={10} width={10} className='h-15 w-15 rounded-full bg-gray-500'></Image> */}
                    <p className='h-15 w-15 rounded-full bg-gradient-to-br from-green-700 via-green-900 to-emerald-700'></p>
                    <div className='mt-2'>
                        <h2 className="text-md font-bold">{teamName} </h2>
                        <p className="text-sm">{teamID}</p>
                    </div>
                </div>


                <div className='flex gap-2'>
                    <button className='flex gap-1 font-semibold'><Edit></Edit> Edit</button>
                    <button onClick={()=>handleTeamDelete(_id)} className='flex gap-1 font-semibold text-red-700 cursor-pointer'><DeleteIcon></DeleteIcon></button>

                </div>
            </div>

            <div className="my-4 flex justify-center gap-2  text-center text-sm  divide-x divide-gray-300">
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Completed</p>
                    <p className='font-semibold'>12</p>
                </div>
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Running</p>
                    <p className='font-semibold'>3</p>
                </div>
                <div className="px-2 sm:px-4 py-3">
                    <p className="font-bold ">Earnings</p>
                    <p className='font-semibold'>$15,000</p>
                </div>
            </div>


            <div className='m-3 border border-gray-200 rounded-lg max-h-36 overflow-auto'>
                <div className=" p-2 flex justify-between text-white bg-task-primary rounded-t-md">
                    <p className=" font-semibold ">{teamLeaderEmail}</p>
                    <p className=""> Leader</p>
                </div>

                <div className="p-2 bg-teal-100 flex justify-between">
                    <p className="font-semibold ">{teamColeaderEmail}</p>
                    <p className="">Co-Leader</p>
                </div>

                <div>
                    {
                    onlyMembers.map((member: string, idx: number) => (
                            <div className="p-2  flex justify-between" key={idx}>
                                <p className="font-semibold ">{member}</p>
                                <p className="">Member</p>
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className="flex justify-center md:gap-3 py-3">
                <div
                    className={`group flex items-center transition-all gap-1 duration-1000bg-green-200 p-2 rounded-full `}
                    onClick={() => setShowPhone(!showPhone)}
                >
                    <Phone />
                    <p
                        className={`group-hover:opacity-100 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap text-xs md:text-base`}
                    >
                        0178524789
                    </p>
                </div>

                <div
                    className={`group flex items-center transition-all duration-1000  p-2 gap-1 rounded-full 
                        `}
                    onClick={() => setShowEmail(!showEmail)}
                >
                    <Mail />
                    <p
                        className={`group-hover:opacity-100  group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap text-xs md:text-base`}
                    >
                        taskflow@mail.com
                    </p>
                </div>
            </div>


        </div>
    );
}

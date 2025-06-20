// import { Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import TeamCard from './TeamCard';
import { useForm } from 'react-hook-form';
import { useCreateTeamMutation, useGetAllTeamQuery } from '@/feature/team/teamApi';
import toast from 'react-hot-toast';
import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice';
import { Search } from 'lucide-react';

// import { Select } from '@radix-ui/react-select';

export interface Team {

  teamName: string;
  teamID: string;
  teamLeaderEmail: string;
  teamColeaderEmail: string;
  teamMembersEmails: string[];
  _id:string

}

export interface People {
  userEmail: string;
  userName: string;
  userRole: string;
}


export default function TeamSection() {

  const [teams, setTeams] = useState<Team[]>([]);
  // const [filteredUsers, setFilteredUsers] = useState<[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<People[]>([]);
  // const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  // const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  const [errorMe,setErrorMe]=useState("")

  const [teamCreation] = useCreateTeamMutation();
  const { data: people } = useGetAllUserQuery({});
  const { data: allteams,refetch } = useGetAllTeamQuery({});

const unassignedPeople = useMemo(() => {
  if (!people?.data || !allteams?.data) return [];

  // Step 1: Collect all emails that are already assigned to teams
  const teamMemberEmails = new Set<string>();
  allteams.data.forEach((team: Team) => {
    teamMemberEmails.add(team.teamLeaderEmail);
    teamMemberEmails.add(team.teamColeaderEmail);
    team.teamMembersEmails.forEach(email => teamMemberEmails.add(email));
  });

  // Step 2: Filter users
  return people.data.filter((person: People) => {
    return (
      person.userRole !== 'admin' && person.userRole !== 'client' &&  // exclude admins
      !teamMemberEmails.has(person.userEmail) // exclude users already in any team
    );
  });
}, [people, allteams]);



  useEffect(() => {
    if (people?.data) {
      setFilteredMembers(people.data);
    }

    if (allteams?.data) {
      setTeams(allteams.data);
   
    }
  }, [people?.data, allteams?.data]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Team>();



  const handleSearch = (searchInput: string) => {
    const lowerSearch = searchInput.toLowerCase();
    console.log(lowerSearch);

    console.log(allteams?.data)
      const filtered = allteams?.data.filter((team: Team) =>
        team.teamName.toLowerCase().includes(lowerSearch)
      );

     setTeams(filtered)

  }

  const onSubmit = async (data: Team) => {
    const res = await teamCreation(data) as { data?: any; error?: any };

    if (!('error' in res)) {
   
      toast.success("Team creation success")

      refetch();
      reset();
      setErrorMe("");
       (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();

    } else {
    console.log("Else error",res)
      setErrorMe(res.error.data.message);
   
    }
  }



  return (
    <div className=' bg-white py-7 px-4 mx-5 rounded-lg'>

      <section className='flex justify-between border-b mb-5 pb-4 gap-2'>
        <div >

       <div className="relative md:w-full max-w-sm ml-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="pl-10 py-2 md:px-15 border rounded-lg w-full"
              placeholder="Search Teams"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div> 
        </div>

        <div>
          <button onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement | null)?.showModal()} className="bg-task-primary text-white font-medium
             px-3 py-2 text-sm 
             xs:px-3 xs:py-2
             sm:px-6 sm:py-3
             md:text-base
             rounded hover:bg-task-primary/90 transition-all duration-200">+ Add New Team</button>
        </div>

      </section>

      <div className="flex flex-col  justify-center gap-4">
        {teams.map((team) => (
          <div
            key={team.teamID}

            // className="w-full  lg:w-[48%]  xl:w-[32%] 2xl:w-[24%]"
          >
            <TeamCard team={team} />
          </div>
        ))}
      </div>




      <dialog id="my_modal_2" className="modal bg-white px-3">
        <div className="modal-box w-full max-w-2xl bg-white   ">
          <h3 className="font-bold text-lg mb-4">Create New User</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Team Name</label>
              <input
                type="text"
                {...register('teamName', { required: 'Name is required' })}
                className="input input-bordered bg-white border border-gray-200  w-full"
              />
              {errors.teamName && <p className="text-red-500 text-xs">{errors.teamName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Team ID</label>
              <input
                type="text"
                {...register('teamID')}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div>


            <div >
              <label className="block text-sm font-medium">Leader</label>
              <select
                {...register('teamLeaderEmail', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto max-h-60"
                defaultValue=""
              >
                <option value="" disabled>Select leader</option>
                {unassignedPeople.map((p: People) => (
                  <option key={p.userEmail} value={p.userEmail} className='overflow-auto'>
                  {p.userEmail}
                  </option>
                ))}
              </select>
              {errors.teamLeaderEmail && (
                <p className="text-red-500 text-xs">{errors.teamLeaderEmail.message}</p>
              )}

            </div>


            <div >
              <label className="block text-sm font-medium">Co-Leader</label>
              <select
                {...register('teamColeaderEmail', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto max-h-60"
                defaultValue=""
              >
                <option value="" disabled>Select Co-leader</option>
                {unassignedPeople.map((p:People) => (
                  <option key={p.userEmail} value={p.userEmail} className='overflow-auto'>
                    {p.userEmail}
                  </option>
                ))}
              </select>
              {errors.teamLeaderEmail && (
                <p className="text-red-500 text-xs">{errors.teamLeaderEmail.message}</p>
              )}

            </div>



            <div className="col-span-full">
              <label className="block text-sm font-medium">Members</label>
              <select
                {...register('teamMembersEmails', { required: 'Select at least one member' })}
                className="input input-bordered border bg-white border-gray-200 h-44 w-full"
                multiple
                size={5}
              >
                {unassignedPeople.map((p:People) => (
                  <option key={p.userEmail} value={p.userEmail}>
                    {p.userEmail}
                  </option>
                ))}
              </select>
              {errors.teamMembersEmails && (
                <p className="text-red-500 text-xs">{errors.teamMembersEmails.message}</p>
              )}
            </div>

          <div className='text-red-500'>
            {errorMe}
          </div>

            <div className="col-span-full mt-4">
              <button type="submit" className="btn border-none bg-task-primary w-full">
                Create Team
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  )
}

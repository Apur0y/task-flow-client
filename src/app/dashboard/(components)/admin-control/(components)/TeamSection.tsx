import { Calendar, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TeamCard from './TeamCard';
import { useForm } from 'react-hook-form';
import { useCreateTeamMutation } from '@/feature/team/teamApi';
import toast from 'react-hot-toast';
import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice';

interface User {

  teamName: string;
  teamID: string;
  teamLeaderEmail: string;
  teamColeaderEmail: string;
  teamMembersEmails: string[];

}

interface People {
  userEmail: string;
  userName: string
}


export default function TeamSection() {

  const [users, setUsers] = useState<[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<People[]>([]);

  const [teamCreation] = useCreateTeamMutation();
  const { data: people } = useGetAllUserQuery({});

  useEffect(() => {
    if (people?.data) {
      console.log(people.data)
      setFilteredMembers(people.data)
    }
  }, [])

  console.log(people)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();



  const handleSearch = (searchInput: string) => {
    const lowerSearch = searchInput.toLowerCase();

    //   const filtered = users.filter(user =>
    //     user.userEmail.toLowerCase().includes(lowerSearch) ||
    //     user.userName.toLowerCase().includes(lowerSearch)
    //   );

    //   setFilteredUsers(filtered);

  }

  const onSubmit = async (data) => {
    const res = await teamCreation({
      "teamName": "team X",
      "teamID": "TM-008",
      "teamLeaderEmail": "emilik@smtech.com",
      "teamColeaderEmail": "emili@smtech.com",
      "teamMembersEmails": [
        "ema@smtech.com",
        "emilik@smtech.com",
        "emili@smtech.com"
      ]
    })

    if (res) {
      console.log(res)
      toast.success("Team creation success")
    }
  }


console.log(filteredMembers)

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

      <div className='flex flex-wrap gap-3'>
        {
          ["2", "3", "5", "6"].map(p => <TeamCard key={p}></TeamCard>)
        }


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
                {filteredMembers.map((p) => (
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
                {filteredMembers.map((p) => (
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
              <label className="block text-sm font-medium">Members</label>
              <select
                {...register('teamColeaderEmail', { required: 'Role is required' })}
                className="input input-bordered border bg-white border-gray-200 w-full overflow-auto h-100"
                multiple
              >
                <option value="" disabled>Select Members</option>
                {filteredMembers.map((p) => (
                  <option key={p.userEmail} value={p.userEmail} className='overflow-auto'>
                    {p.userEmail}
                  </option>
                ))}
              </select>
              {errors.teamLeaderEmail && (
                <p className="text-red-500 text-xs">{errors.teamLeaderEmail.message}</p>
              )}

            </div>


            {/* <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                {...register('phone')}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Photo URL</label>
              <input
                type="url"
                {...register('photo')}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div> */}

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

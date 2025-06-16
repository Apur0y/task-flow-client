import { Search } from 'lucide-react'
import React, { useState } from 'react'

export default function TeamCard() {

  const [users, setUsers] = useState<[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<[]>([]);



  const handleSearch = (searchInput: string) => {
    const lowerSearch = searchInput.toLowerCase();

    //   const filtered = users.filter(user =>
    //     user.userEmail.toLowerCase().includes(lowerSearch) ||
    //     user.userName.toLowerCase().includes(lowerSearch)
    //   );

    //   setFilteredUsers(filtered);

  }




  return (
    <div className='bg-white py-7 px-4 mx-5 rounded-lg'>

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

      <div>
        

      </div>



    </div>
  )
}

'use client';

import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice';
import { useCreateUserMutation, useDeleteUserMutation } from '@/feature/users/userApi';
import { Calendar, Search } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';


interface User {
  userJoiningDate: string;
  userName: string;
  userEmail: string;
  userRole: string;
  userPassword: string;
  userEmployeeId: string;
  address: string;
  phone: string;
  photo: string;
  _id: string
}

const UserTable: FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      userJoiningDate: '2025-06-01',
      userName: 'John Doe',
      userEmail: 'john@smtech.com',
      userRole: 'teamMember',
      userPassword: 'john@smtech',
      userEmployeeId: 'EMP123',
      address: 'Dhaka, Bangladesh',
      phone: '017XXXXXXXX',
      photo: 'https://example.com/photo.jpg',
      _id: ""
    },
    // Add more sample users if needed
  ]);


  const { data } = useGetAllUserQuery({});
  const [createUser] = useCreateUserMutation()
  const [deleteUser] = useDeleteUserMutation()
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const [errorMe, setErrorMe] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    const originalDate = data.userJoiningDate; // "2025-06-08"
    const [year, month, day] = originalDate.split('-');
    const formattedDate = `${day}-${month}-${year}`; // "08-06-2025"

    const formattedData = {
      ...data,
      userJoiningDate: formattedDate,
    };

    const responce: {
      data: any;
      error?: undefined;
    } | {
      data?: undefined;
      error: any
    } = await createUser(formattedData);
    if ('data' in responce && responce.data) {
      setUsers(users);
      toast.success("User Creation Successfull");
      reset();


      (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
    } else {
      // setErrorMe(responce.error.data.message);
      setErrorMe(responce?.error.data.message);



    }
  };

  const handleUserDelete = async (id: string) => {

    const responce = await deleteUser(id);
    if ('data' in responce && responce.data) {

      toast.success("User deleted")
    }
  }

  const handleSearch = (searchInput: string) => {
    const lowerSearch = searchInput.toLowerCase();

    const filtered = users.filter(user =>
      user.userEmail.toLowerCase().includes(lowerSearch) ||
      user.userName.toLowerCase().includes(lowerSearch)
    );

    setFilteredUsers(filtered);
  }

  useEffect(() => {
    if (data?.data) {
      console.log(data.data)
      setUsers(data?.data)
      setFilteredUsers(data?.data)
    }

  }, [data])



  return (
    <div className="p-6 bg-white md:px-9">

      <section className='flex justify-between border-b mb-5 pb-4 gap-2'>
        <div >

          <div className="relative md:w-full max-w-sm ml-2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="pl-10 py-2 md:px-15 border rounded-lg w-full"
              placeholder="Search by email"
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
             rounded hover:bg-task-primary/90 transition-all duration-200">+ Add New User</button>
        </div>

      </section>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 ">S.L</th>
              <th className="px-4 py-2 ">Join Date</th>
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Email</th>
              <th className="px-4 py-2 ">Role</th>
              <th className="px-4 py-2 ">Password</th>
              <th className="px-4 py-2 ">Employee ID</th>
              <th className="px-4 py-2 ">Address</th>
              <th className="px-4 py-2 ">Phone</th>

              <th className="px-4 py-2  text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="text-sm text-gray-800">
                <td className="px-4 py-2 ">{index + 1}</td>
                <td className="px-4 py-2 ">{user.userJoiningDate}</td>
                <td className="px-4 py-2  flex gap-2">
                  <img
                    src={user.photo}
                    alt=''
                    className="w-10 h-10 hidden lg:flex object-cover  bg-slate-500 rounded-full"
                  />

                  <p className='pt-2'>{user.userName}</p>
                </td>
                <td className="px-4 py-2 ">{user.userEmail}</td>
                <td className="px-4 py-2 ">{user.userRole}</td>
                <td className="px-4 py-2 ">

                  {/* {user.userPassword} */}
                  <button className='text-task-primary hover:underline cursor-pointer'>Manage Password</button>

                </td>
                <td className="px-4 py-2 ">{user.userEmployeeId}</td>
                <td className="px-4 py-2 ">{user.address}</td>
                <td className="px-4 py-2 ">{user.phone}</td>

                <td className="px-4 py-2  text-center space-x-2">

                  <button className="text-task-primary hover:text-yellow-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal bg-white ">
        <div className="modal-box w-full max-w-2xl bg-white   ">
          <h3 className="font-bold text-lg mb-4">Create New User</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register('userName', { required: 'Name is required' })}
                className="input input-bordered bg-white border border-gray-200  w-full"
              />
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register('userEmail', { required: 'Email is required' })}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
              {errors.userEmail && <p className="text-red-500 text-xs">{errors.userEmail.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Role</label>
              <select
                {...register('userRole', { required: 'Role is required' })}
                className="input input-bordered bg-white border border-gray-200 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="client">Client</option>
              </select>
              {errors.userRole && <p className="text-red-500 text-xs">{errors.userRole.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                {...register('userPassword', { required: 'Password is required' })}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                {...register('userEmployeeId')}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                {...register('address')}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Joining Date</label>

              <div className="relative w-full">
                <input
                  type="date"
                  {...register('userJoiningDate')}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 w-full"
                />
                <div className="absolute right-3 top-2.5 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-700" /> {/* 👈 control icon color here */}
                </div>
              </div>
            </div>

            <div>
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
            </div>
         

            <div className="col-span-full mt-4">
                 <div className='flex justify-center text-red-600'>
              {errorMe}
            </div>
              <button type="submit" className="btn border-none bg-task-primary w-full">
                Create User
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default UserTable;

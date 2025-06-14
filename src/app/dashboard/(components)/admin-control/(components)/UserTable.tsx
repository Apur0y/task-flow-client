'use client';

import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice';
import { useCreateUserMutation } from '@/feature/users/userApi';
import { Calendar, Search } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

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
    },
    // Add more sample users if needed
  ]);

  const { data } = useGetAllUserQuery({});
  const [createUser] = useCreateUserMutation()

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

    console.log('Form Submitted:', formattedData);

    const responce = await createUser(formattedData);

    if ('data' in responce && responce.data) {
      toast("User Creation Successfull")
      reset();

      (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();
    } else {
      console.log(responce)
    }



  };


  useEffect(() => {
    if (data?.data) {
      setUsers(data?.data)
    }

  }, [data])

  console.log(users)

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
              <th className="px-4 py-2 border">S.L</th>
              <th className="px-4 py-2 border">Join Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Password</th>
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Photo</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-sm text-gray-800">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{user.userJoiningDate}</td>
                <td className="px-4 py-2 border">{user.userName}</td>
                <td className="px-4 py-2 border">{user.userEmail}</td>
                <td className="px-4 py-2 border">{user.userRole}</td>
                <td className="px-4 py-2 border">{user.userPassword}</td>
                <td className="px-4 py-2 border">{user.userEmployeeId}</td>
                <td className="px-4 py-2 border">{user.address}</td>
                <td className="px-4 py-2 border">{user.phone}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={user.photo}
                    alt={user.userName}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal bg-white">
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
              <input
                type="text"
                {...register('userRole', { required: 'Role is required' })}
                className="input input-bordered bg-white border border-gray-200 w-full"
              />
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

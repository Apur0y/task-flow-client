'use client';

import { useGetAllUserQuery } from '@/feature/auth/authCredentialSlice';
import { Search } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface User {
    joinDate: string;
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
            joinDate: '2025-06-01',
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

    useEffect(() => {
        if (data?.data) {
            setUsers(data?.data)
        }

    }, [data])

    console.log(users)

    return (
        <div className="p-6 bg-white md:px-9">

            <section className='flex justify-between border-b mb-5 pb-4'>
                <div >
                   
                    <div className="relative w-full max-w-sm ml-2">
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
                    <button className='bg-task-primary py-3 px-7 text-white'>+ Add New User</button>
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
                                <td className="px-4 py-2 border">{user.joinDate}</td>
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
        </div>
    );
};

export default UserTable;

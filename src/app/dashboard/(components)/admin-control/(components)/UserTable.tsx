'use client';

import { FC, useState } from 'react';
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
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

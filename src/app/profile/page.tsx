"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/feature/users/userApi";
import { useSelector } from "react-redux";
import { selectAuth } from "@/feature/auth/authSelectors";

export default function UserProfile() {
  const { id } = useParams(); // Optional: for URL-based ID, but we'll prioritize auth
  console.log("Received ID from params:", id); // Debug: Check URL param

  const auth = useSelector(selectAuth);

  // Use userEmployeeId from auth for fetching user data
  const {
    data: singleUser,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useGetSingleUserQuery(auth?.userEmployeeId, {
    skip: !auth?.userEmployeeId, // Skip if userEmployeeId is not available
  });
  console.log("Raw Query Response (singleUser):", {
    singleUser,
    isLoading,
    error,
    isError,
    isSuccess,
  }); // Debug: Full response

  const [updateUser] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    _id: "",
    userName: "",
    userEmail: "",
    address: "",
    phone: "",
    userEmployeeId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Set form data when singleUser.data is fetched
  useEffect(() => {
    if (singleUser?.data && !isLoading && !isError) {
      console.log("Processed user data in useEffect:", singleUser.data); // Debug: Data after processing
      const { _id, userName, userEmail, address, phone, userEmployeeId } =
        singleUser?.data;
      setFormData({
        _id: _id || "",
        userName: userName || "",
        userEmail: userEmail || "",
        address: address || "",
        phone: phone || "",
        userEmployeeId: userEmployeeId || "",
      });
    } else if (isError) {
      console.log("Error in useEffect:", error);
    }
  }, [singleUser, isLoading, isError]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      console.log("Data being sent to update:", formData); // Check data before sending
      const response = await updateUser(formData).unwrap();
      console.log("Update response:", response); // Debug: Update response
      if ("data" in response) {
        toast.success("User updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating user.");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">
        Error loading user data:{" "}
        {typeof error === "object" && error !== null
          ? "message" in error
            ? (error as { message: string }).message
            : "status" in error && "data" in error
              ? JSON.stringify(error.data)
              : "An unknown error occurred."
          : "An unknown error occurred."}
      </p>
    );

  return (
    <div className="bg-gray-100  min-h-screen py-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        {/* User Photo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co/kV5LYzvr/premium-photo-1664474619075-644dd191935f.jpg" // Replace with actual user photo URL from API
            alt="User Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* User Form */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="userName">Username</Label>
            <Input
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="userEmail">Email</Label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="userEmployeeId">Employee ID</Label>
            <Input
              id="userEmployeeId"
              name="userEmployeeId"
              value={formData.userEmployeeId}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Update
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

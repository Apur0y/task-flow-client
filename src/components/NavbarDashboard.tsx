"use client";
import { useGetSignleUserQuery } from "@/feature/auth/authCredentialSlice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { FaBars, FaBell, FaSun, FaMoon } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { TAuthState } from "@/feature/auth/authSlice";
import { Highlighter } from "lucide-react";

export default function Navbar() {
  const [decoded, setDecoded] = useState<TAuthState | null>(null);
  // const [darkMode, setDarkMode] = useState(false);

  const user = useAppSelector((state) => state.auth);

  const { data } = useGetSignleUserQuery(
    user.userEmployeeId || decoded?.userEmployeeId
  );
  const { userEmail, userName } = data?.data || {};

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const decodedToken: TAuthState = jwtDecode(localToken);
      setDecoded(decodedToken);
    }
  }, []);

  // const toggleTheme = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <div className="w-full border-b bg-white dark:bg-gray-800 dark:text-white px-4 py-2 flex items-center justify-between">
      {/* Left: Menu Icon */}
      <div className="flex items-center space-x-4">
        <button className="text-2xl">
        <Highlighter></Highlighter>
        
        </button>
        <span className="text-lg font-semibold"> Welcome, {userName}</span>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">{userEmail}</span>
        {/* Notification Icon */}
        {/* <button className="text-xl relative">
          <FaBell />
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        <button className="text-xl" onClick={toggleTheme}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button> */}

        {/* Profile Image */}
        <Image
          width={50}
          height={50}
          src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg" // replace with real image or placeholder
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";
import { LuLogOut } from "react-icons/lu";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/feature/auth/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function NavSecondary({
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))} */}
          <div>
            <button
              onClick={handleLogout}
              className="text-white font-semibold flex justify-center items-center cursor-pointer"
            >
              <LuLogOut className="text-xl" />{" "}
              <span className="text-md">LogOut</span>
            </button>
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

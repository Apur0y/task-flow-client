"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuth } from "@/feature/auth/authSelectors";
import {  usePathname } from "next/navigation";


export function NavMain({}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const auth = useSelector(selectAuth);

  const [role, setRole] = useState("");
  const [routes, setRoutes] = useState<string[]>([]);
  const [active, setActive] = useState("");
  const [isActive, setIsActive] = useState(true);

  const pathname = usePathname();



if (active) {
  const isActive = pathname.includes(active);
  console.log(isActive, "isActive");
} else {
  console.log("Active is not yet available:", active);
}


  const adminRoutes = ["Users", "Projects", "Teams"]
  const leaderRoutes = ["My Projects","Role Assign", "Project Update","Team Chat"]
  const coLeaderRoutes = ["My Projects","Project Update","Team Chat"]
  const memberRoutes = ["My Projects","Team Chat"]
  const clientRoutes = ["Payment"]


  useEffect(() => {
    if (auth?.role) {
      setRole(auth.role);
    } else {
    }

    if (role === "admin") {
      setRoutes(adminRoutes);
    } else if (role === "teamLeader") {
      setRoutes(leaderRoutes);
    } else if (role === "teamColeader") {
      setRoutes(coLeaderRoutes);
    } else if (role === "teamMember") {
      setRoutes(memberRoutes);
    } else if (role === "client") {
      setRoutes(clientRoutes);
    } else {
      setRoutes([]);
    }

    
if (active) {
  const isActive = pathname.includes(active);
 setIsActive(isActive);
} else{
  setIsActive(false)
}
  }, [role]);

  return (
    <SidebarGroup className="bg-task-primary">
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>{role.toUpperCase()} Control</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {routes.map((item) => (
            <SidebarMenuItem key={item}>
              <SidebarMenuButton tooltip={item}>
                <Link
                  className={`w-full ${active === item || isActive ? "bg-white rounded-lg text-black" : "text-white"} hover:text-black`}
                  href={`/dashboard/${item}`}
                  onClick={() => setActive(item)}
                >
                  <div className="w-full py-3 px-2 rounded-lg  font-medium text-left">
                    {item}
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

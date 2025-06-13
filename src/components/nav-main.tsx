"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {


  const [role,setRole] = useState("admin")
  const [routes,setRoutes] = useState<string[]>([])


  const adminRoutes= ["Users", "Projects", "Teams"]
  const leaderRoutes=["Role Assign", "Project Update"]
  const coLeaderRoutes=["Role Assign", "Project Update"]
  const memberRoutes=["Role Assign", "Project Update"]
  const clientRoutes=["Role Assign", "Project Update"]


  useEffect(()=>{
    
    if(role==="admin"){
      setRoutes(adminRoutes)
    }else if(role==="teamLeader"){
      setRoutes(leaderRoutes)
    }else if(role==="teamColeader"){
      setRoutes(coLeaderRoutes)
    }else if(role==="teamMember"){
      setRoutes(memberRoutes)

    }else if(role==="client"){
      setRoutes(clientRoutes)
    }

  },[role])


  return (
    <SidebarGroup>
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
                
                <span>{item}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

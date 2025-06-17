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
import Link from "next/link"

export function NavMain({
  
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {


  const [role, setRole] = useState("admin")
  const [routes, setRoutes] = useState<string[]>([])
  const [active, setActive] = useState("")


  const adminRoutes = ["Users", "Projects", "Teams"]
  const leaderRoutes = ["Role Assign", "Project Update"]
  const coLeaderRoutes = ["Project Update"]
  const memberRoutes = ["View Resource"]
  const clientRoutes = ["Payment"]


  useEffect(() => {

    if (role === "admin") {
      setRoutes(adminRoutes)
    } else if (role === "teamLeader") {
      setRoutes(leaderRoutes)
    } else if (role === "teamColeader") {
      setRoutes(coLeaderRoutes)
    } else if (role === "teamMember") {
      setRoutes(memberRoutes)

    } else if (role === "client") {
      setRoutes(clientRoutes)
    }

    setRole("admin")

  }, [role])


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
                  className={`w-full ${active === item ? "bg-white rounded-lg" : ""}`}
                  href={`/dashboard/${item}`}
                  onClick={() => setActive(item)}
                >
                  <div className="w-full py-3 px-2 rounded-lg  text-left">
                    {item}
                  </div>
                </Link>

              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

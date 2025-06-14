"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { useState } from "react";
import UsersInfo from "./(components)/admin-control/UsersInfo";

export default function Page() {
  const [selectedRoute, setSelectedRoute] = useState("home");

  // Render content based on selected route
  const renderContent = () => {
    switch (selectedRoute) {
      case "home":
        return (
          <>
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </>
        );
      case "componentA":
        return <UsersInfo></UsersInfo>;
      // case "componentB":
      //   return <ComponentB />
      default:
        return <div>Select a route</div>;
    }
  };

  return <div>


  </div>;
}

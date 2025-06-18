import { AppSidebar } from "@/components/app-sidebar";
import AuthGuard from "@/components/AuthGaurd";

import Navbar from "@/components/NavbarDashboard";

import { SiteHeader } from "@/components/site-header";
import {  SidebarProvider } from "@/components/ui/sidebar";
// import { Providers } from "../Provider";




export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <div>
      {/* <Providers> */}
         <AuthGuard >
         <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
     
        <div className="flex flex-1 flex-col bg-gray-300">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 md:gap-6">

                     <SiteHeader />
       <Navbar></Navbar>
                         {children}

            </div>
          </div>
        </div>
      </SidebarProvider>
      </AuthGuard>
      {/* </Providers> */}

     
     
    </div>
  );
}

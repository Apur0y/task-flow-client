import { createBaseApi } from "@/redux/api/basuUrlslice";


export const userCreation = createBaseApi.injectEndpoints({
    endpoints:(build)=>({
        createTeam: build.mutation({
             query: (user) => ({
        url: "/api/team",
        method: "POST",
        body: user,
      }),
        }),
           deleteTeam: build.mutation({
             query: (id) => ({
        url: `/api/team/${id}`,
        method: "DELETE",
        
        
      }),
        }),
           updateTeam: build.mutation({
             query: (body) => ({
        url: '/api/team',
        method: "UPDATE",
        body:body
        
      }),
        }),
             getAllTeam: build.query({
             query: () => ({
        url: '/api/team',
        method: "GET",
      
        
      }),
        }),
                   moveMember: build.mutation({
             query: (body) => ({
        url: '/api/team/move-member',
        method: "PATCH",
        body:body
        
      }),
        }),
        

    })
})


export const { useGetAllTeamQuery,useCreateTeamMutation, useDeleteTeamMutation,useMoveMemberMutation} = userCreation;

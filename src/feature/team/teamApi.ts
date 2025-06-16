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
        url: `/api/user/${id}`,
        method: "DELETE",
        
      }),
        }),
           updateTeam: build.mutation({
             query: (body) => ({
        url: '/api/user/update-user',
        method: "UPDATE",
        body:body
        
      }),
        }),

    })
})


export const { useCreateTeamMutation, useDeleteTeamMutation} = userCreation;

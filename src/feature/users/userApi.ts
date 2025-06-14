import { createBaseApi } from "@/redux/api/basuUrlslice";


export const userCreation = createBaseApi.injectEndpoints({
    endpoints:(build)=>({
        createUser: build.mutation({
             query: (user) => ({
        url: "/api/user",
        method: "POST",
        body: user,
      }),
        })
    })
})


export const { useCreateUserMutation} = userCreation;

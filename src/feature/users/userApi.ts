// import { createBaseApi } from "@/redux/api/basuUrlslice";

// export const userCreation = createBaseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createUser: build.mutation({
//       query: (user) => ({
//         url: "/api/user",
//         method: "POST",
//         body: user,
//       }),
//     }),
//     deleteUser: build.mutation({
//       query: (id) => ({
//         url: `/api/user/${id}`,
//         method: "DELETE",
//       }),
//     }),
//     updateUser: build.mutation({
//       query: (body) => ({
//         url: "/api/user/update-user",
//         method: "UPDATE",
//         body: body,
//       }),
//     }),
//     getSingleUser: build.mutation({
//       query: ({ _id, ...body }) => ({
//         url: `/api/user/${_id}`,
//         method: "GET",
//         body: body,
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateUserMutation,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//   useGetSingleUserMutation,
// } = userCreation;

import { createBaseApi } from "@/redux/api/basuUrlslice";

export const userCreation = createBaseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (user) => ({
        url: "/api/user",
        method: "POST",
        body: user,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: `/api/user/${body._id}`, // Use _id in URL
        method: "PATCH", // Changed from "UPDATE" to "PUT"
        body: body,
      }),
    }),
    getSingleUser: build.query({
      query: (id) => `/api/user/${id}`, // Use userEmployeeId
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery, // Changed from useGetSingleUserMutation
} = userCreation;

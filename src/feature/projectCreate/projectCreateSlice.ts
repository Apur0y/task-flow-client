// import { createBaseApi } from "@/redux/api/basuUrlslice";

// export const projectSlice = createBaseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createProject: builder.mutation({
//       query: (projectData) => ({
//         url: "/api/project",
//         method: "POST",
//         body: projectData,
//       }),
//     }),
//     getProjectsCatchall: builder.query({
//       query: () => "/api/project",
//     }),
//   }),
// });

// export const { useCreateProjectMutation, useGetProjectsCatchallQuery } =
//   projectSlice;

import { createBaseApi } from "@/redux/api/basuUrlslice";

export const projectSlice = createBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/api/project",
        method: "POST",
        body: projectData,
      }),
    }),
    getProjectsCatchall: builder.query({
         query: () => ({
        url: '/api/project',
        method: "GET",
 
      }),
    }),


    updateProject: builder.mutation({
      query: ({ projectId, cancellationNote }) => ({
        url: `/api/project/${projectId}`,
        method: "PATCH",
        body: cancellationNote,
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsCatchallQuery,
  useUpdateProjectMutation,
} = projectSlice;

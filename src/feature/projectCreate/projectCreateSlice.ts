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
      query: () => "/api/project",
    }),
    updateProject: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/project/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/api/project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsCatchallQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectSlice;

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
        url: "/api/project",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    updateProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/api/project/${projectId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Projects"],
    }),

    cancelProject: builder.mutation({
      query: ({ projectId, cancellationNote }) => ({
        url: `/api/project/${projectId}/cancel`,
        method: "PATCH",
        body: {
          cancellationNote,
          projectStatus: "cancelled",
        },
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsCatchallQuery,
  useUpdateProjectMutation,
  useCancelProjectMutation,
} = projectSlice;

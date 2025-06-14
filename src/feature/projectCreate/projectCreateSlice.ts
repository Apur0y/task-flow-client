import { createBaseApi } from "@/redux/api/basuUrlslice";

export const createProject = createBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectData) => ({
        url: "/api/project",
        method: "POST",
        body: projectData,
      }),
    }),
  }),
});

export const { useCreateProjectMutation } = createProject;

import { createBaseApi } from "@/redux/api/basuUrlslice";

export const authCreation = createBaseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreation: build.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/api/user",
        method: "GET",
      }),
    }),

    getSignleUser: build.query({
      query: (employeeId) => ({
        url: `/api/user/${employeeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUserCreationMutation,
  useGetAllUserQuery,
  useGetSignleUserQuery,
} = authCreation;

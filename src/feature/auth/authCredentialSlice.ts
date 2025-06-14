import { createBaseApi } from "@/redux/api/basuUrlslice";

export const authCreation = createBaseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreation: build.mutation({
      query: (user) => ({
        url: "api/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useUserCreationMutation } = authCreation;

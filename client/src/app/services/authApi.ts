import { User } from "../../types";
import { api } from "./api";

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
    }),
    signup: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, UserData>({
      query: (userData) => ({
        url: "/users/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;

export const {
  endpoints: { login, signup, logout },
} = authApi;

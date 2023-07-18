import { User, UserData } from "../../types";
import { api } from "./api";

type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginData, User>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    signup: builder.mutation<ResponseLoginData, User>({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    forgotPassword: builder.mutation<ResponseLoginData, UserData>({
      query: (email) => ({
        url: "/login/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<
      ResponseLoginData,
      { userData: UserData; token: string | undefined }
    >({
      query: ({ userData, token }) => ({
        url: `/resetPassword/${token}`,
        method: "PATCH",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

export const {
  endpoints: { login, signup, forgotPassword, resetPassword },
} = authApi;

import { User, UserData } from "../../types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserData[], void>({
      query: () => ({
        url: "/users/allusers",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUser: builder.query<UserData, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/users/add`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<string, UserData>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;

export const {
  endpoints: { getAllUsers, getUser, createUser, updateUser, deleteUser },
} = usersApi;

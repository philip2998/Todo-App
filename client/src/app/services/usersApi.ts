import { User } from "../../types";
import { api } from "./api";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/users/add`,
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation<string, User>({
      query: (user) => ({
        url: `/users/edit/${user._id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<string, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        body: { id },
      }),
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

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
    getAdmin: builder.query<UserData, string>({
      query: (id) => ({
        url: `/todos/main/${id}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, { user: User; adminId: string }>({
      query: ({ user, adminId }) => ({
        url: `todos/main/${adminId}`,
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
    updatePassword: builder.mutation<
      string,
      { user: UserData; password: string }
    >({
      query: ({ user, password }) => ({
        url: `/users/${user.id}`,
        method: "PATCH",
        body: password,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetAdminQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
} = usersApi;

export const {
  endpoints: {
    getAllUsers,
    getUser,
    getAdmin,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
  },
} = usersApi;

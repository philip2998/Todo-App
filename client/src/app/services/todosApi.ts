import { Todo } from "../../types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todos/alltodos",
        method: "GET",
      }),
      providesTags: ["Todos"],
      transformResponse: (response: Todo[]) => {
        return response.reverse();
      },
    }),
    getTodo: builder.query<
      Todo,
      { todoId: string; userId: string | undefined }
    >({
      query: ({ todoId, userId }) => ({
        url: `/todos/main/${userId}/${todoId}`,
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),
    getUserTodos: builder.query<Todo[], string>({
      query: (id) => ({
        url: `/todos/main/${id}`,
        method: "GET",
      }),
      providesTags: ["Todos"],
      transformResponse: (response: Todo[]) => {
        return response.reverse();
      },
    }),
    createTodo: builder.mutation<
      Todo,
      { todo: Todo; userId: string | undefined }
    >({
      query: ({ todo, userId }) => ({
        url: `/todos/main/${userId}`,
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<
      Todo,
      { todo: Todo; userId: string | undefined }
    >({
      query: ({ todo, userId }) => ({
        url: `/todos/main/${userId}/${todo._id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<
      string,
      { todoId: string; userId: string | undefined }
    >({
      query: ({ todoId, userId }) => ({
        url: `/todos/main/${userId}/${todoId}`,
        method: "DELETE",
        body: { todoId },
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoQuery,
  useGetUserTodosQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useCreateTodoMutation,
} = todosApi;

export const {
  endpoints: {
    getAllTodos,
    getTodo,
    getUserTodos,
    updateTodo,
    removeTodo,
    createTodo,
  },
} = todosApi;

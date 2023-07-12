import { Todo } from "../../types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todos/alltodos",
        method: "GET",
      }),
    }),
    getTodo: builder.query<
      Todo,
      { todoId: string; userId: string | undefined }
    >({
      query: ({ todoId, userId }) => ({
        url: `/todos/main/${userId}/${todoId}`,
        method: "GET",
      }),
    }),
    getUserTodos: builder.query<Todo[], string>({
      query: (id) => ({
        url: `/todos/main/${id}`,
        method: "GET",
      }),
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

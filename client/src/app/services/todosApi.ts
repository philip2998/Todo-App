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
    getTodo: builder.query<Todo, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "GET",
      }),
    }),
    getUserTodos: builder.query<Todo[], string>({
      query: (id) => ({
        url: `/todos/main/${id}`,
        method: "GET",
      }),
    }),
    createTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos/main/${todo._id}`,
        method: "POST",
        body: todo,
      }),
    }),
    updateTodo: builder.mutation<string, Todo>({
      query: (todo) => ({
        url: `/todos/edit/${todo._id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
    removeTodo: builder.mutation<string, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: { id },
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

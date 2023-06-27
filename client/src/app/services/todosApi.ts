import { Todo } from "../../types";
import { api } from "./api";

export const todosApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todos",
        method: "GET",
      }),
    }),
    getTodo: builder.query<Todo, void>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "GET",
      }),
    }),
    updateTodo: builder.mutation<string, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
      }),
    }),
    removeTodo: builder.mutation<string, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        boyd: { id },
      }),
    }),
    createTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos`,
        method: "POST",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoQuery,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
  useCreateTodoMutation,
} = todosApi;

export const {
  endpoints: { getAllTodos, getTodo, updateTodo, removeTodo, createTodo },
} = todosApi;

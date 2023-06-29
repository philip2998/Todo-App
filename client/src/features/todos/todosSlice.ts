import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import { todosApi } from "../../app/services/todosApi";
import { RootState } from "../../app/store";

interface InitialState {
  todos: Todo[] | null;
}

const initialState: InitialState = {
  todos: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        todosApi.endpoints.getAllTodos.matchFulfilled,
        (state, action) => {
          state.todos = action.payload;
        }
      )
      .addMatcher(
        todosApi.endpoints.getUserTodos.matchFulfilled,
        (state, action) => {
          state.todos = action.payload;
        }
      );
  },
});

export default todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos;
